# Neura Learn — Local Full Stack

Frontend + local FastAPI backend. The frontend routes remain unchanged; AI calls are handled by the local backend using the Gemini API.

## Backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Set these values in `backend/.env` before using AI:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.8-flash
GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta
FRONTEND_ORIGIN=http://localhost:5173
```

## Frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

Check backend health at `http://127.0.0.1:8000/health`.
