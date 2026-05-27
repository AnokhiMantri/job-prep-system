from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_translate_status():
    return {"status": "translate router working"}
