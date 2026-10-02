from __future__ import annotations

import json
import os
from typing import Any, Literal

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "").rstrip("/")
SUPABASE_KEY = os.getenv("SUPABASE_PUBLISHABLE_KEY", "")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY", "")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-3.8-flash")
GEMINI_BASE_URL = os.getenv("GEMINI_BASE_URL", "https://generativelanguage.googleapis.com/v1beta").rstrip("/")
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

app = FastAPI(title="Neura Learn Backend", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN, "http://127.0.0.1:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Message(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str


class ChatRequest(BaseModel):
    messages: list[Message] = Field(min_length=1)


class QuizRequest(BaseModel):
    topic: str = Field(min_length=1, max_length=200)
    difficulty: Literal["Easy", "Medium", "Hard", "Exam-style"] = "Medium"
    count: int = Field(default=5, ge=1, le=15)


class SummaryRequest(BaseModel):
    noteId: str
    content: str = Field(min_length=1, max_length=20000)


class FlashcardRequest(BaseModel):
    topic: str = Field(min_length=1, max_length=200)
    count: int = Field(default=8, ge=3, le=20)


async def supabase_user(access_token: str) -> dict[str, Any]:
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise HTTPException(500, "Supabase environment is not configured in backend/.env.")
    async with httpx.AsyncClient(timeout=20) as client:
        response = await client.get(
            f"{SUPABASE_URL}/auth/v1/user",
            headers={
                "apikey": SUPABASE_KEY,
                "Authorization": f"Bearer {access_token}",
            },
        )
    if response.status_code != 200:
        raise HTTPException(401, "Unauthorized. Please log in again.")
    user = response.json()
    if not user.get("id"):
        raise HTTPException(401, "Unauthorized. Invalid user session.")
    return user


async def require_auth(authorization: str | None) -> tuple[str, dict[str, Any]]:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(401, "Authorization required.")
    token = authorization.removeprefix("Bearer ").strip()
    if not token:
        raise HTTPException(401, "Authorization required.")
    return token, await supabase_user(token)


async def call_ai(
    messages: list[dict[str, str]],
    *,
    response_format: dict[str, str] | None = None,
    temperature: float | None = None,
) -> str:
    if not GEMINI_API_KEY:
        raise HTTPException(500, "GEMINI_API_KEY is missing in backend/.env.")

    system_parts: list[dict[str, str]] = []
    contents: list[dict[str, Any]] = []
    for message in messages:
        role = message.get("role", "user")
        content = str(message.get("content", ""))
        if role == "system":
            system_parts.append({"text": content})
        else:
            contents.append({
                "role": "model" if role == "assistant" else "user",
                "parts": [{"text": content}],
            })

    body: dict[str, Any] = {"contents": contents}
    if system_parts:
        body["systemInstruction"] = {"parts": system_parts}

    generation_config: dict[str, Any] = {"maxOutputTokens": 2048}
    if temperature is not None:
        generation_config["temperature"] = temperature
    if response_format and response_format.get("type") == "json_object":
        generation_config["responseMimeType"] = "application/json"
    body["generationConfig"] = generation_config

    url = f"{GEMINI_BASE_URL}/models/{GEMINI_MODEL}:generateContent"
    async with httpx.AsyncClient(timeout=90) as client:
        response = await client.post(
            url,
            headers={
                "x-goog-api-key": GEMINI_API_KEY,
                "Content-Type": "application/json",
            },
            json=body,
        )

    if response.status_code >= 400:
        try:
            error_payload = response.json()
            error_message = error_payload.get("error", {}).get("message", response.text[:400])
        except Exception:
            error_message = response.text[:400]
        if response.status_code == 429:
            raise HTTPException(429, f"AI rate limit/quota reached: {error_message}")
        if response.status_code in (401, 403):
            raise HTTPException(response.status_code, f"Gemini API key rejected: {error_message}")
        raise HTTPException(response.status_code, f"AI request failed: {error_message}")

    payload = response.json()
    candidates = payload.get("candidates", [])
    if not candidates:
        raise HTTPException(502, "AI returned no candidates.")
    parts = candidates[0].get("content", {}).get("parts", [])
    content = "".join(part.get("text", "") for part in parts if isinstance(part, dict))
    if not content:
        raise HTTPException(502, "AI returned an empty response.")
    return content


async def supabase_request(
    method: str,
    path: str,
    access_token: str,
    *,
    json_body: Any | None = None,
    headers_extra: dict[str, str] | None = None,
) -> Any:
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise HTTPException(500, "Supabase environment is not configured in backend/.env.")
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }
    if headers_extra:
        headers.update(headers_extra)
    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.request(
            method,
            f"{SUPABASE_URL}/rest/v1/{path}",
            headers=headers,
            json=json_body,
        )
    if response.status_code >= 400:
        raise HTTPException(response.status_code, response.text[:500])
    if not response.content:
        return None
    try:
        return response.json()
    except json.JSONDecodeError:
        return response.text


@app.get("/health")
async def health() -> dict[str, str | bool]:
    return {
        "status": "ok",
        "supabase_configured": bool(SUPABASE_URL and SUPABASE_KEY),
        "ai_configured": bool(GEMINI_API_KEY),
    }


@app.post("/api/chat")
async def chat(request: ChatRequest, authorization: str | None = Header(default=None)) -> dict[str, str]:
    _, user = await require_auth(authorization)
    _ = user
    system = {
        "role": "system",
        "content": (
            "You are Neura Learn, a warm, expert AI tutor. Explain clearly, use short paragraphs and bullet points, "
            "and offer a follow-up practice question when helpful. Use markdown formatting."
        ),
    }
    content = await call_ai([system, *[m.model_dump() for m in request.messages]])
    return {"content": content}


@app.post("/api/quiz")
async def quiz(request: QuizRequest, authorization: str | None = Header(default=None)) -> dict[str, Any]:
    token, user = await require_auth(authorization)
    prompt = (
        f'Create {request.count} multiple-choice questions about "{request.topic}" at {request.difficulty} difficulty.\n'
        'Return ONLY valid JSON with this exact shape:\n'
        '{"questions":[{"q":"question text","opts":["a","b","c","d"],"correct":0}]}\n'
        '"correct" is the 0-based index of the right option. Exactly 4 options each. No prose outside JSON.'
    )
    raw = await call_ai(
        [{"role": "user", "content": prompt}],
        response_format={"type": "json_object"},
        temperature=0.7,
    )
    try:
        parsed = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise HTTPException(502, "AI returned invalid quiz format. Try again.") from exc

    questions = parsed.get("questions")
    if not isinstance(questions, list):
        raise HTTPException(502, "AI returned invalid quiz format. Try again.")

    rows = await supabase_request(
        "POST",
        "quizzes",
        token,
        json_body={
            "user_id": user["id"],
            "topic": request.topic,
            "difficulty": request.difficulty,
            "questions": questions,
        },
        headers_extra={"Prefer": "return=representation"},
    )
    row = rows[0] if isinstance(rows, list) and rows else None
    if not row:
        raise HTTPException(502, "Quiz could not be saved.")
    return {"id": row["id"], "topic": row["topic"], "questions": questions}


@app.post("/api/notes/summarize")
async def summarize_note(request: SummaryRequest, authorization: str | None = Header(default=None)) -> dict[str, str]:
    token, user = await require_auth(authorization)
    summary = await call_ai(
        [
            {"role": "system", "content": "Summarize the note in 4-6 crisp bullet points. Use markdown."},
            {"role": "user", "content": request.content},
        ],
        temperature=0.4,
    )
    await supabase_request(
        "PATCH",
        f"notes?id=eq.{request.noteId}&user_id=eq.{user['id']}",
        token,
        json_body={"summary": summary},
        headers_extra={"Prefer": "return=minimal"},
    )
    return {"summary": summary}


@app.post("/api/flashcards")
async def flashcards(request: FlashcardRequest, authorization: str | None = Header(default=None)) -> dict[str, Any]:
    token, user = await require_auth(authorization)
    raw = await call_ai(
        [
            {
                "role": "user",
                "content": f'Create {request.count} study flashcards about "{request.topic}". Return ONLY JSON: {{"cards":[{{"front":"...","back":"..."}}]}}',
            }
        ],
        response_format={"type": "json_object"},
        temperature=0.6,
    )
    try:
        parsed = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise HTTPException(502, "AI returned invalid flashcard format.") from exc

    cards = parsed.get("cards")
    if not isinstance(cards, list):
        raise HTTPException(502, "AI returned invalid flashcard format.")

    deck_rows = await supabase_request(
        "POST",
        "decks",
        token,
        json_body={"user_id": user["id"], "name": request.topic},
        headers_extra={"Prefer": "return=representation"},
    )
    deck = deck_rows[0] if isinstance(deck_rows, list) and deck_rows else None
    if not deck:
        raise HTTPException(502, "Flashcard deck could not be saved.")

    rows = [
        {
            "user_id": user["id"],
            "deck_id": deck["id"],
            "front": item.get("front", ""),
            "back": item.get("back", ""),
        }
        for item in cards
        if isinstance(item, dict)
    ]
    if rows:
        await supabase_request(
            "POST",
            "flashcards",
            token,
            json_body=rows,
            headers_extra={"Prefer": "return=minimal"},
        )
    return {"deckId": deck["id"], "count": len(rows)}
