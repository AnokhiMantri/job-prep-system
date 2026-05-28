import json
from fastapi import APIRouter, UploadFile, File, HTTPException
from services.resume_service import process_resume_file
from services.gemini_service import analyze_resume_with_gemini

router = APIRouter()


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    if not file.filename.endswith((".pdf", ".docx")):
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are allowed."
        )

    try:
        # =========================================
        # READ FILE
        # =========================================

        file_bytes = await file.read()

        # =========================================
        # EXTRACT TEXT
        # =========================================

        resume_text = process_resume_file(
            file.filename,
            file_bytes
        )

        if not resume_text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from the file."
            )

        # =========================================
        # GEMINI ANALYSIS
        # =========================================

        ai_analysis = analyze_resume_with_gemini(
            resume_text
        )

        # =========================================
        # HANDLE ERROR RESPONSE
        # =========================================

        if isinstance(ai_analysis, dict):
            return {
                "filename": file.filename,
                "analysis": ai_analysis
            }

        # =========================================
        # PARSE JSON STRING
        # =========================================

        parsed_analysis = json.loads(ai_analysis)

        return {
            "filename": file.filename,
            "analysis": parsed_analysis
        }

    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500,
            detail="AI returned invalid JSON response."
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except Exception as e:
        print("Resume Upload Error:", str(e))

        raise HTTPException(
            status_code=500,
            detail=f"Internal Server Error: {str(e)}"
        )