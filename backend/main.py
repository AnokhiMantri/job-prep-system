from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
load_dotenv()

from routers import auth, resume, interview, voice, translate, skillgap
import uvicorn

app = FastAPI(title="Job Prep System API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(resume.router, prefix="/api/resume", tags=["Resume"])
app.include_router(interview.router, prefix="/api/interview", tags=["Interview"])
app.include_router(voice.router, prefix="/api/voice", tags=["Voice"])
app.include_router(translate.router, prefix="/api/translate", tags=["Translate"])
app.include_router(skillgap.router, prefix="/api/skillgap", tags=["Skillgap"])

@app.get("/")
def read_root():
    return {"message": "Job Prep System API is running"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
