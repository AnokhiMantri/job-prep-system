from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime, timezone

# =========================================================
# USER AUTH MODELS
# =========================================================

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr


class Token(BaseModel):
    access_token: str
    token_type: str
    user: Optional[UserResponse] = None


# =========================================================
# INTERVIEW MODELS
# =========================================================

class InterviewRequest(BaseModel):
    job_title: str
    experience_summary: Optional[str] = None
    language: Optional[str] = "English"


class InterviewResponse(BaseModel):
    transcript: str


class VoiceEvaluationRequest(BaseModel):
    job_title: str
    interview_question: str
    user_transcription: str
    language: Optional[str] = "English"


# =========================================================
# INTERVIEW HISTORY
# =========================================================

class InterviewHistory(BaseModel):
    user_email: str

    job_title: str

    question: str

    answer: str

    score: int

    strengths: List[str]

    improvements: List[str]

    better_answer: str

    language: str = "English"

    created_at: datetime = datetime.now(timezone.utc)


# =========================================================
# RESUME ANALYSIS
# =========================================================

class ResumeAnalysisRequest(BaseModel):
    resume_text: str


class ResumeAnalysisResponse(BaseModel):
    ats_score: Optional[float]

    strengths: List[str]

    weaknesses: List[str]

    keywords: List[str]


# =========================================================
# RESUME HISTORY
# =========================================================

class ResumeHistory(BaseModel):
    user_email: str

    ats_score: int

    strengths: List[str]

    weaknesses: List[str]

    keywords: List[str]

    created_at: datetime = datetime.now(timezone.utc)


# =========================================================
# SKILL GAP MODELS
# =========================================================

class SkillGapRequest(BaseModel):
    resume_text: str

    job_description: str


class SkillGapResponse(BaseModel):
    match_score: Optional[float]

    matched_skills: List[str]

    missing_skills: List[str]

    recommendations: List[str]


# =========================================================
# SKILL GAP HISTORY
# =========================================================

class SkillGapHistory(BaseModel):
    user_email: str

    match_score: int

    matched_skills: List[str]

    missing_skills: List[str]

    recommendations: List[str]

    created_at: datetime = datetime.now(timezone.utc)