import os
from google import genai
from google.genai import types


def get_gemini_client():
    api_key = os.getenv("GOOGLE_GENAI_API_KEY")

    if not api_key or api_key == "your_gemini_api_key_here":
        raise ValueError(
            "Google Gemini API Key is missing or invalid in .env"
        )

    return genai.Client(api_key=api_key)


# =========================================================
# RESUME ANALYSIS
# =========================================================
def analyze_resume_with_gemini(resume_text: str):
    client = get_gemini_client()

    prompt = f"""
    Analyze the following resume and provide:

    1. ATS Score (0-100)
    2. Key Strengths (list)
    3. Weaknesses / Areas for Improvement (list)
    4. Top 5 Important Keywords

    Resume:
    {resume_text}

    Return ONLY valid JSON using this structure:

    {{
        "ats_score": number,
        "strengths": ["string"],
        "weaknesses": ["string"],
        "keywords": ["string"]
    }}

    Do not include markdown formatting.
    """

    try:
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0.2,
            ),
        )

        return response.text

    except Exception:
        return """
        {
            "error": "AI service is currently busy. Please try again in a few seconds."
        }
        """


# =========================================================
# AI INTERVIEW QUESTION
# =========================================================
def practice_interview(
    job_title: str,
    experience_summary: str = None
):
    client = get_gemini_client()

    prompt = f"""
    You are a professional technical interviewer conducting a live mock interview.

    Candidate Role:
    {job_title}

    Candidate Background:
    {experience_summary or 'No experience summary provided.'}

    Instructions:
    - Ask ONLY ONE interview question.
    - Keep it conversational and realistic.
    - Do NOT provide hints.
    - Do NOT provide explanations.
    - Do NOT generate multiple questions.
    - Keep the question concise.
    - Sound natural like a real interviewer.

    Return ONLY the interview question text.
    """

    try:
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="text/plain",
                temperature=0.5,
            ),
        )

        return response.text.strip()

    except Exception:
        return "AI service is currently busy. Please try again in a few seconds."


# =========================================================
# SKILL GAP ANALYSIS
# =========================================================
def detect_skill_gap(
    resume_text: str,
    job_description: str
):
    client = get_gemini_client()

    prompt = f"""
    Compare this resume against the job description.

    Job Description:
    {job_description}

    Resume:
    {resume_text}

    Return ONLY valid JSON using this structure:

    {{
        "match_score": number,
        "matched_skills": ["string"],
        "missing_skills": ["string"],
        "recommendations": ["string"]
    }}

    Keep recommendations practical and concise.
    """

    try:
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0.2,
            ),
        )

        return response.text

    except Exception:
        return """
        {
            "error": "AI service is currently busy. Please try again in a few seconds."
        }
        """


# =========================================================
# VOICE INTERVIEW EVALUATION
# =========================================================
def analyze_spoken_response(
    job_title: str,
    question: str,
    transcription: str
) -> str:

    client = get_gemini_client()

    prompt = f"""
    You are an expert technical interviewer evaluating a candidate for a {job_title} role.

    Interview Question:
    {question}

    Candidate Answer:
    {transcription}

    Evaluate the answer professionally.

    Return ONLY valid JSON using this EXACT structure:

    {{
      "score": number,
      "strengths": [
        "string"
      ],
      "improvements": [
        "string"
      ],
      "better_answer": "string"
    }}

    Rules:
    - score should be out of 100
    - strengths should be concise
    - improvements should be short and practical
    - better_answer should be professional but concise
    - avoid long paragraphs
    - avoid unnecessary technical jargon
    - return ONLY raw JSON
    """

    try:
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0.3,
            ),
        )

        return response.text

    except Exception:
        return """
        {
            "error": "AI service is currently busy. Please try again in a few seconds."
        }
        """