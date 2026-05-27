from fastapi import APIRouter, HTTPException
from models import SkillGapRequest, SkillGapResponse
from services.gemini_service import detect_skill_gap
import json

router = APIRouter()

@router.post("/detect", response_model=SkillGapResponse)
async def detect_skill_gap_route(data: SkillGapRequest):
    try:
        analysis_json = detect_skill_gap(data.resume_text, data.job_description)
        analysis = json.loads(analysis_json)
        return {
            "match_score": analysis.get("match_score"),
            "matched_skills": analysis.get("matched_skills", []),
            "missing_skills": analysis.get("missing_skills", []),
            "recommendations": analysis.get("recommendations", []),
        }
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Could not parse skill gap response from Gemini.")
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
