from pydantic import BaseModel, EmailStr
from typing import Optional, List

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

class InterviewRequest(BaseModel):
    job_title: str
    experience_summary: Optional[str] = None

class InterviewResponse(BaseModel):
    transcript: str

class SkillGapRequest(BaseModel):
    resume_text: str
    job_description: str

class SkillGapResponse(BaseModel):
    match_score: Optional[float]
    matched_skills: List[str]
    missing_skills: List[str]
    recommendations: List[str]
