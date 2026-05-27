from fastapi import APIRouter, HTTPException
from models import InterviewRequest, InterviewResponse
from services.gemini_service import practice_interview

router = APIRouter()

@router.post("/practice", response_model=InterviewResponse)
async def practice_interview_route(data: InterviewRequest):
    try:
        transcript = practice_interview(data.job_title, data.experience_summary)
        return {"transcript": transcript}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

import json
from models import VoiceAssessmentRequest
from services.gemini_service import analyze_spoken_response

@router.post("/evaluate-voice")
async def evaluate_voice_response(payload: VoiceAssessmentRequest):
    try:
        # Prompt Gemini to grade the interview response
        ai_critique_str = analyze_spoken_response(
            job_title=payload.job_title,
            question=payload.interview_question,
            transcription=payload.user_transcription
        )
        # Safely convert structured output string directly back to a json object response
        return json.loads(ai_critique_str)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Evaluator glitch: {str(e)}")