import json
from fastapi import APIRouter, HTTPException
# 🔥 FIX: Importing the correct model name matching your backend/models.py
from models import InterviewRequest, InterviewResponse, VoiceEvaluationRequest 
from services.gemini_service import practice_interview, analyze_spoken_response

router = APIRouter()

@router.post("/practice", response_model=InterviewResponse)
async def practice_interview_route(data: InterviewRequest):
    try:
        transcript = practice_interview(data.job_title, data.experience_summary)
        return {"transcript": transcript}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

@router.post("/evaluate-voice")
async def evaluate_voice_response(payload: VoiceEvaluationRequest):  # 🔥 FIX: Changed type to VoiceEvaluationRequest
    try:
        # Prompt Gemini to grade the interview response
        ai_critique_str = analyze_spoken_response(
            job_title=payload.job_title,
            question=payload.interview_question,
            transcription=payload.user_transcription
        )
        
        # Safely clean markdown code block wrap if Gemini adds it accidentally
        cleaned_json_str = ai_critique_str.strip()
        if cleaned_json_str.startswith("```"):
            cleaned_json_str = cleaned_json_str.split("\n", 1)[1]
            if cleaned_json_str.endswith("```"):
                cleaned_json_str = cleaned_json_str.rsplit("```", 1)[0]
            cleaned_json_str = cleaned_json_str.strip()

        # Convert structured output string directly back to a json object response
        return json.loads(cleaned_json_str)
        
    except json.JSONDecodeError:
        raise HTTPException(status_code=502, detail="AI response format invalid. Failed to parse structured JSON.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Evaluator glitch: {str(e)}")