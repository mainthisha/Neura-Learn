````markdown
# 🧠 Neura Learn

### Where Learning Finds Its Way.

Neura Learn is an AI-powered personalised learning companion designed to make digital learning more adaptive, interactive, and learner-focused.

Instead of giving every learner the same content and learning path, Neura Learn uses AI to understand learning goals, performance, knowledge gaps, and progress — then provides personalised support throughout the learning journey.

---

## 🌟 What We Do

Neura Learn brings tutoring, practice, revision, and progress tracking together in one AI-powered learning platform.

### 🧠 AI-Powered Learning Experience

- 💬 AI tutoring for personalised explanations and doubt clarification
- 🎯 Personalised learning based on learner goals and context
- 🧩 Knowledge-gap focused learning support
- 📝 AI-powered note summarisation
- 📝 AI-generated quizzes with multiple difficulty levels
- 🃏 AI-generated flashcards for revision
- 📊 Progress and mastery tracking
- 🔄 Adaptive learning support

Instead of using AI only as a chatbot, Neura Learn uses AI as a continuous learning companion.

### 🔐 Secure Learning Environment

Neura Learn uses Supabase-powered authentication and data storage to provide a secure and personalised learning environment.

- User authentication
- Personal learner accounts
- Persistent learning data
- Quiz storage
- Notes and summaries
- Flashcard decks
- User-specific learning information

### 🎨 Modern Learning Experience

Neura Learn is designed as a modern AI education platform rather than a traditional academic dashboard.

- ✨ Premium modern UI
- 🧠 AI-first learning experience
- 🎯 Clear learning workflows
- 📱 Responsive layouts
- 💫 Smooth interactions
- 📊 Visual progress representation
- 🧩 Clean and organised learning screens
- ⚡ Fast and interactive experience

---

## 🧠 How It Works

```text
Learner
   ↓
Goals + Performance + Knowledge
   ↓
AI Understanding
   ↓
Personalised Support
   ↓
Practice + Revision
   ↓
Progress Tracking
   ↓
Adaptive Learning
````

Neura Learn moves beyond one-size-fits-all learning by continuously using learner context to provide more personalised support.

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Component-based UI

### Backend

* Python
* FastAPI
* Pydantic
* Uvicorn
* HTTPX

### AI

* Google Gemini API
* Gemini Flash Models
* AI-powered tutoring
* AI-generated quizzes
* AI summarisation
* AI-generated flashcards

### Database & Authentication

* Supabase
* Supabase Authentication
* Supabase PostgreSQL

### Deployment

* Vercel — Frontend
* Render — Backend
* GitHub — Source Control

---

## ⚙️ Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/mainthisha/Neura-Learn.git
cd Neura-Learn
```

### 2. Setup Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file inside the `backend` folder:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.8-flash
FRONTEND_ORIGIN=http://localhost:5173
```

Start the backend:

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

### 3. Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Start the frontend:

```bash
npm run dev
```

Then open the local URL displayed in the terminal.

---

## 🔌 API Capabilities

| Endpoint                    | Purpose                                      |
| --------------------------- | -------------------------------------------- |
| `POST /api/chat`            | AI tutoring and personalised explanations    |
| `POST /api/quiz`            | AI-generated topic-based quizzes             |
| `POST /api/notes/summarize` | AI-powered note summarisation                |
| `POST /api/flashcards`      | AI-generated flashcard decks                 |
| `GET /health`               | Backend, Supabase and AI configuration check |

---

## 🌐 Live Application

🚀 **Neura Learn**

[https://neura-learn-l9t6.vercel.app/](https://neura-learn-l9t6.vercel.app/)

### Backend API

[https://neura-learn.onrender.com/](https://neura-learn.onrender.com/)

### Health Check

[https://neura-learn.onrender.com/health](https://neura-learn.onrender.com/health)

---

## 💡 What Makes Neura Learn Different?

Traditional learning platforms often follow a fixed approach:

```text
Same Content
     ↓
Same Learning Path
     ↓
Same Practice
```

Neura Learn focuses on a personalised approach:

```text
Learner Context
     ↓
AI Understanding
     ↓
Personalised Learning
     ↓
Practice + Revision
     ↓
Progress Analysis
     ↓
Adaptive Support
```

The core idea is simple:

> Don't make the learner adapt to the system. Make the learning experience adapt to the learner.

---

## 🚀 Future Scope

Neura Learn can be extended with:

* 🎙️ Voice-based AI tutoring
* 📄 AI analysis of uploaded study materials
* 🧠 Advanced learner knowledge graphs
* 📈 Deeper mastery prediction
* 🎯 Goal-based learning recommendations
* 🗣️ Multilingual learning support
* 📱 Mobile learning application
* 🏆 Gamified learning and achievement systems
* 📚 AI-generated personalised study plans
* 🔔 Smart revision reminders

---

## 🏆 Project Highlights

✔ Personalised AI Tutor
✔ Knowledge-gap focused learning
✔ AI-generated quizzes
✔ Multiple quiz difficulty levels
✔ AI-powered note summarisation
✔ AI-generated flashcards
✔ Personalised revision support
✔ Progress and mastery tracking
✔ Secure user authentication
✔ Persistent learner data
✔ Modern responsive interface
✔ FastAPI backend
✔ Gemini AI integration
✔ Supabase database and authentication
✔ Vercel + Render deployment

---

## 🎓 Problem We Are Solving

Learners have different goals, strengths, weaknesses, knowledge levels, and learning speeds. However, many digital learning platforms still provide a similar learning experience to everyone.

Neura Learn addresses this gap by creating an AI-powered learning environment that understands learner context and provides personalised support throughout the learning journey.

---

## 🌱 Our Vision

We envision a future where technology does more than simply deliver educational content.

It understands the learner.

It identifies what they know.

It recognises where they struggle.

It adapts what comes next.

And it helps them learn at their own pace.

---

# 🧠 Neura Learn

### Where Learning Finds Its Way.

```
```
