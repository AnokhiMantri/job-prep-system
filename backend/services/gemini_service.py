import os
from google import genai
from google.genai import types

def get_gemini_client():
    api_key = os.getenv("GOOGLE_GENAI_API_KEY")
    if not api_key or api_key == "your_gemini_api_key_here":
        raise ValueError("Google Gemini API Key is missing or invalid in .env")
    return genai.Client(api_key=api_key)

def analyze_resume_with_gemini(resume_text: str):
    client = get_gemini_client()
    prompt = f"""
    Analyze the following resume and provide:
    1. ATS Score (0-100)
    2. Key Strengths (list)
    3. Weaknesses/Areas for Improvement (list)
    4. Top 5 Keywords found
    
    Resume Text:
    {resume_text}
    
    Respond strictly in JSON format matching these keys: ats_score, strengths, weaknesses, keywords.
    """
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.2,
        ),
    )
    return response.text

def practice_interview(job_title: str, experience_summary: str = None):
    client = get_gemini_client()
    prompt = f"""
    Act as a professional interviewer for a candidate applying to a {job_title} role.
    Ask 4 concise interview questions one by one, followed by a short hint or improvement note after each question.
    Include the candidate background if available:
    {experience_summary or 'No experience summary provided.'}
    
    Respond with a clear transcript that includes both the questions and hints.
    """
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="text/plain",
            temperature=0.2,
        ),
    )
    return response.text

def detect_skill_gap(resume_text: str, job_description: str):
    client = get_gemini_client()
    prompt = f"""
    Compare this resume to the job description and output:
    1. match_score (0-100)
    2. matched_skills (list)
    3. missing_skills (list)
    4. recommendations (list of strings for courses/actions)
    
    Job Description:
    {job_description}
    
    Resume Text:
    {resume_text}
    
    Respond strictly in JSON format.
    """
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.2,
        ),
    )
    return response.text

def analyze_spoken_response(job_title: str, question: str, transcription: str) -> str:
    """
    Evaluates the user's spoken text transcription against the interview question
    and outputs granular performance metrics.
    """
    client = get_gemini_client()
    
    prompt = f"""
    You are an expert technical interviewer assessing a candidate applying for a {job_title} position.
    
    The question asked to the candidate:
    "{question}"
    
    The candidate's transcribed spoken answer:
    "{transcription}"
    
    Analyze their answer deeply and return a strict JSON output evaluating:
    1. clarity_score: An integer score out of 100 representing completeness and articulation.
    2. structural_feedback: Direct guidance on what was handled well and what structural parts were missed.
    3. missing_key_concepts: A list of specific technical terms, keywords, or methodologies they failed to articulate for this role.
    4. optimized_answer: A beautiful, concise model answer showing how a top-tier engineer would answer.

    Respond ONLY with raw JSON. Do not write any explanations or wrap the code blocks in markdown fences. Match these keys exactly: "clarity_score", "structural_feedback", "missing_key_concepts", "optimized_answer".
    """
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.3,
        ),
    )
    return response.text