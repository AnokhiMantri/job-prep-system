# ⚡ CareerForge AI
### Gen AI-Based Job Preparation & Resume Optimization System

A full-stack application that uses **Google Gemini AI** to help job seekers analyze resumes, detect skill gaps, prepare for interviews, and optimize their resume for specific roles.

---

## 🗂️ Project Structure

```
job-prep-system/
├── backend/                    # Node.js + Express API
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── src/
│       ├── app.js
│       ├── config/database.js
│       ├── models/             # User, Resume, Analysis
│       ├── controllers/        # auth, resume, interview, skillgap
│       ├── middleware/         # auth, upload
│       ├── routes/             # auth, resume, interview, skillgap
│       ├── services/           # genai, resume (parser), pdf (puppeteer)
│       └── utils/              # tokenBlacklist, response.helper
│
├── frontend/                   # React 19 + Vite + SASS
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── context/AuthContext.jsx
│       ├── services/api.js
│       ├── components/         # Navbar, ProtectedRoute, Loader
│       ├── pages/              # Landing, Login, Register, Dashboard,
│       │                       # ResumeAnalysis, SkillGap, InterviewPrep
│       └── styles/             # SASS variables, mixins, global
│
└── docker-compose.yml
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 📄 Resume Analysis | Upload PDF/DOCX → ATS score, keyword extraction, strengths/weaknesses |
| 🎯 Skill Gap Detector | Paste any JD → matched/missing skills, match score, course suggestions |
| 🤖 Interview Prep | Generate role-specific questions with tips & model answers |
| ✨ Resume Optimizer | AI-rewritten summary, bullet points, ATS keywords for a specific role |
| 📥 PDF Export | Download a formatted resume PDF via Puppeteer |
| 🔐 JWT Auth | Secure register/login with httpOnly cookies |

---

## ⚙️ Tech Stack

**Backend:** Node.js, Express 5, MongoDB (Mongoose), Google Gemini (`@google/genai`), Zod, JWT, Multer, pdf-parse, Puppeteer

**Frontend:** React 19, Vite 7, React Router 7, Axios, SASS

---

## 🚀 Local Setup

### Prerequisites
- Node.js 20+
- MongoDB (local or Atlas)
- Google Gemini API Key → [aistudio.google.com](https://aistudio.google.com)

### 1. Clone & install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure environment

```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```env
GOOGLE_GENAI_API_KEY=your_key_here
MONGO_URI=mongodb://localhost:27017/interview-ai
JWT_SECRET=your_secret_min_32_chars
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### 3. Run both servers

```bash
# Terminal 1 — Backend
cd backend
npm run dev       # runs on http://localhost:3000

# Terminal 2 — Frontend
cd frontend
npm run dev       # runs on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## 🐳 Docker Deployment

```bash
# Create a root .env file
echo "GOOGLE_GENAI_API_KEY=your_key" > .env
echo "JWT_SECRET=your_secret_min_32_chars" >> .env

# Build and start
docker-compose up --build -d

# App runs at http://localhost
```

---

## ☁️ Cloud Deployment

### Railway + Vercel (Recommended — Free)

1. Push to GitHub
2. **Backend → Railway**
   - Root: `backend/`, start: `npm start`
   - Add environment variables from `.env.example`
   - Add MongoDB plugin (auto-sets `MONGO_URI`)
3. **Frontend → Vercel**
   - Root: `frontend/`, build: `npm run build`, output: `dist`
   - Add `VITE_API_URL=https://your-backend.railway.app`

### Render + MongoDB Atlas

1. **MongoDB Atlas** → create free cluster → get connection string
2. **Render Web Service** → root: `backend/` → start: `npm start`
3. **Render Static Site** → root: `frontend/` → build: `npm run build` → publish: `dist`

---

## 📡 API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Register new user |
| POST | `/api/auth/login` | — | Login |
| POST | `/api/auth/logout` | ✅ | Logout (blacklists token) |
| GET  | `/api/auth/me` | ✅ | Get current user |
| POST | `/api/resume/upload` | ✅ | Upload & analyze resume |
| GET  | `/api/resume` | ✅ | List user's resumes |
| GET  | `/api/resume/:id` | ✅ | Get resume + analysis |
| DELETE | `/api/resume/:id` | ✅ | Delete resume |
| POST | `/api/resume/generate-pdf` | ✅ | Generate PDF download |
| POST | `/api/skillgap/analyze` | ✅ | Run skill gap analysis |
| POST | `/api/skillgap/optimize` | ✅ | Optimize resume for role |
| POST | `/api/interview/generate` | ✅ | Generate interview questions |
| GET  | `/api/interview/history` | ✅ | Past interview sessions |

---

## 📁 Key Files Quick Reference

```
backend/src/services/genai.service.js   ← All Gemini AI prompts & Zod schemas
backend/src/services/pdf.service.js     ← Puppeteer PDF generation
backend/src/services/resume.service.js  ← PDF/DOCX text extraction
frontend/src/services/api.js            ← All Axios API calls
frontend/src/context/AuthContext.jsx    ← Global auth state
frontend/src/pages/SkillGap.jsx         ← Skill Gap + Optimizer (2 tabs)
frontend/src/pages/InterviewPrep.jsx    ← Interview question generator
frontend/src/pages/ResumeAnalysis.jsx   ← Resume upload + AI analysis
```
