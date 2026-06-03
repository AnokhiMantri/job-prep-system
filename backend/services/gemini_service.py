import os
import random
from time import time
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

import json

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
            model="gemini-2.5-flash-lite",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0.2,
            ),
        )

        raw_text = response.text.strip()

        parsed = json.loads(raw_text)

        return json.dumps(parsed)

    except Exception as e:

        print("Resume Analysis Error:", e)

        return {
            "ats_score": 0,
            "strengths": [
                "AI service temporarily unavailable"
            ],
            "weaknesses": [
                "Please try again later"
            ],
            "keywords": []
        }


# =========================================================
# AI INTERVIEW QUESTION
# =========================================================
def practice_interview(
    job_title: str,
    experience_summary: str = None
):
    client = get_gemini_client()

    topics = [
        "Data Structures",
        "Algorithms",
        "DBMS",
        "SQL",
        "Operating Systems",
        "Computer Networks",
        "Object Oriented Programming",
        "Python",
        "Java",
        "JavaScript",
        "React",
        "MongoDB",
        "FastAPI",
        "REST APIs",
        "System Design",
        "Projects",
        "Problem Solving",
        "Behavioral Questions",
        "Leadership",
        "Teamwork"
    ]

    random_topic = random.choice(topics)

    prompt = f"""
    You are a professional technical interviewer conducting a live mock interview.

    Candidate Role:
    {job_title}

    Candidate Background:
    {experience_summary or 'No experience summary provided.'}

    Focus Topic:
    {random_topic}

    Instructions:

    - Ask ONLY ONE interview question.
    - Ask a different question every time.
    - Focus on the selected topic.
    - Keep it conversational and realistic.
    - Do NOT provide hints.
    - Do NOT provide explanations.
    - Do NOT generate multiple questions.
    - Keep the question concise.
    - Sound natural like a real interviewer.
    - Avoid repeating common questions.

    Return ONLY the interview question text.
    """

    for attempt in range(3):

        try:

            response = client.models.generate_content(
                model="gemini-2.5-flash-lite",
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="text/plain",
                    temperature=1.0,
                ),
            )

            return response.text.strip()

        except Exception as e:

            print(
                f"Interview Question Error "
                f"(Attempt {attempt + 1}/3):",
                e
            )

            time.sleep(2)

    return (
        "Tell me about a challenging project you worked on "
        "and explain your contribution to it."
    )


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
            model="gemini-2.5-flash-lite",
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
            model="gemini-2.5-flash-lite",
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