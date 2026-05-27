import io
from fastapi import APIRouter, UploadFile, File, HTTPException
import speech_recognition as sr
from pydub import AudioSegment

router = APIRouter()

@router.get("/")
def get_voice_status():
    return {"status": "voice router working and ready for stream conversion"}

@router.post("/transcribe")
async def transcribe_interview_audio(file: UploadFile = File(...)):
    """
    Accepts any browser recorded audio container (webm, ogg, mp4, wav),
    converts it to standard WAV format in-memory using pydub,
    and returns a clean text transcription.
    """
    try:
        # 1. Read the raw uploaded bytes from the browser stream
        audio_bytes = await file.read()
        if not audio_bytes:
            raise HTTPException(status_code=400, detail="The uploaded audio file is empty.")

        # 2. Automatically detect format or fallback based on filename extension
        file_extension = file.filename.split(".")[-1].lower() if "." in file.filename else "webm"
        # Map webm/ogg audio recordings safely
        if file_extension == "blob":  # Common fallback when sending blobs from JavaScript
            file_extension = "webm"

        # 3. Load the audio into pydub from memory bytes
        try:
            audio_segment = AudioSegment.from_file(io.BytesIO(audio_bytes), format=file_extension)
        except Exception as conversion_err:
            # Fallback check if browser recorded webm but named it differently
            try:
                audio_segment = AudioSegment.from_file(io.BytesIO(audio_bytes), format="webm")
            except Exception:
                raise HTTPException(
                    status_code=400,
                    detail=f"Could not decode audio structure. Ensure format matches webm/wav. Error: {str(conversion_err)}"
                )

        # 4. Export the segment as a standard uncompressed WAV file into an in-memory bytes stream
        wav_buffer = io.BytesIO()
        audio_segment.export(wav_buffer, format="wav")
        wav_buffer.seek(0)

        # 5. Feed the standard WAV buffer directly into SpeechRecognition
        recognizer = sr.Recognizer()
        with sr.AudioFile(wav_buffer) as source:
            # Dynamically handle short silence pauses at the start of recordings
            recognizer.adjust_for_ambient_noise(source, duration=0.3)
            audio_data = recognizer.record(source)

        # 6. Process using Google Web Speech Wrapper
        transcript_text = recognizer.recognize_google(audio_data)

        return {
            "success": True,
            "filename": file.filename,
            "transcript": transcript_text.strip()
        }

    except sr.UnknownValueError:
        # Triggers cleanly if the microphone caught absolute silence or blurred noise
        raise HTTPException(
            status_code=400, 
            detail="Speech was unintelligible. Please speak directly and clearly into your microphone."
        )
    except sr.RequestError as e:
        raise HTTPException(
            status_code=502, 
            detail=f"Speech Recognition engine connectivity failure: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Internal Server processing error: {str(e)}"
        )