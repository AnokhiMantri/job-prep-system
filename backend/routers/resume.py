import json
from fastapi import APIRouter, UploadFile, File, HTTPException
from services.resume_service import process_resume_file
from services.gemini_service import analyze_resume_with_gemini

router = APIRouter()

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.endswith((".pdf", ".docx")):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are allowed.")
    
    try:
        # 1. Read file bytes
        file_bytes = await file.read()
        
        # 2. Extract text using PDF/DOCX parsers
        resume_text = process_resume_file(file.filename, file_bytes)
        
        if not resume_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from the file.")
            
        # 3. Analyze text with Gemini
        ai_analysis_str = analyze_resume_with_gemini(resume_text)
        
        # Parse JSON from Gemini
        ai_analysis = json.loads(ai_analysis_str)
        
        return {
            "filename": file.filename,
            "analysis": ai_analysis
        }
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
