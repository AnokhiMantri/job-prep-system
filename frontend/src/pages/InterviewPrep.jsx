import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

const InterviewPrep = () => {
  useTranslation();

  const [jobTitle, setJobTitle] = useState('');
  const [experience, setExperience] = useState('');

  const [generatedQuestion, setGeneratedQuestion] = useState('');
  const [transcript, setTranscript] = useState('');

  const [feedback, setFeedback] = useState(null);

  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState('');

  // 🌍 NEW
  const [selectedLanguage, setSelectedLanguage] =
    useState('en-US');

  const recognitionRef = useRef(null);

  // =====================================================
  // LANGUAGE OPTIONS
  // =====================================================

  const languages = [
    { label: 'English', value: 'en-US' },
    { label: 'Hindi', value: 'hi-IN' },
    { label: 'Marathi', value: 'mr-IN' },
    { label: 'Tamil', value: 'ta-IN' },
    { label: 'Telugu', value: 'te-IN' },
  ];

  // =====================================================
  // SPEAK AI QUESTION
  // =====================================================

  const speakText = (text) => {
    if (!window.speechSynthesis) return;

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = selectedLanguage;
    speech.rate = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  // =====================================================
  // GENERATE QUESTION
  // =====================================================

  const generateQuestion = async () => {
    try {
      setLoading(true);

      setTranscript('');
      setFeedback(null);
      setError('');

      const response = await api.post(
        '/api/interview/practice',
        {
          job_title: jobTitle,
          experience_summary: experience,
          language: selectedLanguage,
        }
      );

      const aiQuestion = response.data.transcript;

      setGeneratedQuestion(aiQuestion);

      speakText(aiQuestion);

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
        'Unable to generate interview question.'
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // START INTERVIEW
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    await generateQuestion();
  };

  // =====================================================
  // NEXT QUESTION
  // =====================================================

  const nextQuestion = async () => {
    await generateQuestion();
  };

  // =====================================================
  // START RECORDING
  // =====================================================

  const startRecording = () => {
    setTranscript('');
    setError('');

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError(
        'Speech Recognition is not supported in this browser.'
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = true;

    // 🌍 MULTILINGUAL SUPPORT
    recognition.lang = selectedLanguage;

    recognition.onstart = () => {
      setRecording(true);
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        finalTranscript +=
          event.results[i][0].transcript + ' ';
      }

      setTranscript(finalTranscript);
    };

    recognition.onerror = (event) => {
      console.error(event.error);

      if (event.error === 'not-allowed') {
        setError(
          'Microphone access denied. Please allow microphone permission in your browser.'
        );
      } else {
        setError(
          `Speech recognition error: ${event.error}`
        );
      }

      setRecording(false);
    };

    recognition.onend = () => {
      setRecording(false);
    };

    recognition.start();

    recognitionRef.current = recognition;
  };

  // =====================================================
  // STOP RECORDING
  // =====================================================

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setRecording(false);
  };

  // =====================================================
  // ANALYZE ANSWER
  // =====================================================

  const analyzeAnswer = async () => {
    try {
      setLoading(true);

      setFeedback(null);

      const response = await api.post(
        '/api/interview/evaluate-voice',
        {
          job_title: jobTitle,
          interview_question: generatedQuestion,
          user_transcription: transcript,
          language: selectedLanguage,
        }
      );

      setFeedback(response.data);

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
        'Failed to evaluate voice response.'
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(to bottom right, #0f172a, #111827)',
        padding: '40px',
        color: '#fff',
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {/* HEADER */}

        <div
          style={{
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          <h1
            style={{
              fontSize: '42px',
              fontWeight: '800',
              marginBottom: '14px',
            }}
          >
            🎯 AI Mock Interview
          </h1>

          <p
            style={{
              color: '#9ca3af',
              fontSize: '18px',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.8',
            }}
          >
            Practice realistic interviews with AI voice
            interaction, multilingual support, and
            intelligent feedback analysis.
          </p>
        </div>

        {/* MAIN CARD */}

        <div
          style={{
            background: 'rgba(17,24,39,0.9)',
            border: '1px solid #374151',
            borderRadius: '24px',
            padding: '32px',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            style={{
              display: 'grid',
              gap: '22px',
            }}
          >
            {/* LANGUAGE */}

            <div
              style={{
                display: 'grid',
                gap: '10px',
              }}
            >
              <label
                style={{
                  fontWeight: '600',
                  color: '#d1d5db',
                }}
              >
                🌍 Interview Language
              </label>

              <select
                value={selectedLanguage}
                onChange={(e) =>
                  setSelectedLanguage(e.target.value)
                }
                style={{
                  padding: '14px',
                  borderRadius: '14px',
                  border: '1px solid #374151',
                  background: '#0f172a',
                  color: '#fff',
                  fontSize: '15px',
                }}
              >
                {languages.map((lang) => (
                  <option
                    key={lang.value}
                    value={lang.value}
                  >
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* JOB TITLE */}

            <div
              style={{
                display: 'grid',
                gap: '10px',
              }}
            >
              <label
                style={{
                  fontWeight: '600',
                  color: '#d1d5db',
                }}
              >
                💼 Role / Job Title
              </label>

              <input
                value={jobTitle}
                onChange={(e) =>
                  setJobTitle(e.target.value)
                }
                placeholder="e.g. AI Engineer"
                required
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '14px',
                  border: '1px solid #374151',
                  background: '#0f172a',
                  color: '#fff',
                  fontSize: '15px',
                }}
              />
            </div>

            {/* EXPERIENCE */}

            <div
              style={{
                display: 'grid',
                gap: '10px',
              }}
            >
              <label
                style={{
                  fontWeight: '600',
                  color: '#d1d5db',
                }}
              >
                🚀 Experience Summary
              </label>

              <textarea
                value={experience}
                onChange={(e) =>
                  setExperience(e.target.value)
                }
                rows={5}
                placeholder="Mention your projects, internships, skills, achievements..."
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '14px',
                  border: '1px solid #374151',
                  background: '#0f172a',
                  color: '#fff',
                  resize: 'vertical',
                  fontSize: '15px',
                }}
              />
            </div>

            {/* ERROR */}

            {error && (
              <div
                style={{
                  background: '#7f1d1d20',
                  border: '1px solid #ef4444',
                  color: '#fecaca',
                  padding: '14px',
                  borderRadius: '14px',
                }}
              >
                {error}
              </div>
            )}

            {/* START BUTTON */}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '260px',
                padding: '16px',
                background:
                  'linear-gradient(to right, #6366f1, #8b5cf6)',
                color: '#fff',
                border: 'none',
                borderRadius: '14px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '16px',
                boxShadow:
                  '0 10px 30px rgba(99,102,241,0.3)',
              }}
            >
              {loading
                ? 'Generating...'
                : '🚀 Start AI Interview'}
            </button>
          </form>

          {/* QUESTION */}

          {generatedQuestion && (
            <div
              style={{
                marginTop: '40px',
                padding: '28px',
                borderRadius: '20px',
                background: '#0f172a',
                border: '1px solid #374151',
              }}
            >
              <h2
                style={{
                  marginBottom: '18px',
                  fontSize: '24px',
                }}
              >
                🎯 AI Interview Question
              </h2>

              <p
                style={{
                  lineHeight: '1.9',
                  color: '#d1d5db',
                  fontSize: '17px',
                }}
              >
                {generatedQuestion}
              </p>

              {/* BUTTONS */}

              <div
                style={{
                  display: 'flex',
                  gap: '14px',
                  marginTop: '28px',
                  flexWrap: 'wrap',
                }}
              >
                <button
                  onClick={startRecording}
                  disabled={recording}
                  style={{
                    padding: '14px 22px',
                    borderRadius: '14px',
                    border: 'none',
                    background: '#059669',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  🎤 Start Recording
                </button>

                <button
                  onClick={stopRecording}
                  disabled={!recording}
                  style={{
                    padding: '14px 22px',
                    borderRadius: '14px',
                    border: 'none',
                    background: '#dc2626',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  ⏹ Stop Recording
                </button>

                <button
                  onClick={analyzeAnswer}
                  disabled={!transcript || loading}
                  style={{
                    padding: '14px 22px',
                    borderRadius: '14px',
                    border: 'none',
                    background: '#4f46e5',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  {loading
                    ? 'Analyzing...'
                    : '📊 Analyze My Answer'}
                </button>

                <button
                  onClick={nextQuestion}
                  disabled={loading}
                  style={{
                    padding: '14px 22px',
                    borderRadius: '14px',
                    border: 'none',
                    background: '#7c3aed',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  ➡ Next Question
                </button>
              </div>
            </div>
          )}

          {/* TRANSCRIPT */}

          {transcript && (
            <div
              style={{
                marginTop: '30px',
                padding: '24px',
                borderRadius: '18px',
                background: '#111827',
                border: '1px solid #374151',
              }}
            >
              <h3
                style={{
                  marginBottom: '14px',
                  fontSize: '22px',
                }}
              >
                📝 Your Answer
              </h3>

              <p
                style={{
                  lineHeight: '1.9',
                  color: '#d1d5db',
                }}
              >
                {transcript}
              </p>
            </div>
          )}

          {/* FEEDBACK */}

          {feedback && (
            <div
              style={{
                marginTop: '30px',
                padding: '30px',
                borderRadius: '20px',
                background: '#0f172a',
                border: '1px solid #374151',
              }}
            >
              <h2
                style={{
                  marginBottom: '26px',
                  fontSize: '26px',
                }}
              >
                🤖 AI Feedback Report
              </h2>

              {/* SCORE */}

              <div
                style={{
                  marginBottom: '28px',
                }}
              >
                <div
                  style={{
                    fontSize: '42px',
                    fontWeight: '800',
                    color: '#818cf8',
                  }}
                >
                  {feedback.score}/100
                </div>

                <div
                  style={{
                    color: '#9ca3af',
                    marginTop: '6px',
                  }}
                >
                  Overall Interview Performance
                </div>
              </div>

              {/* STRENGTHS */}

              <div
                style={{
                  marginBottom: '30px',
                }}
              >
                <h3
                  style={{
                    marginBottom: '14px',
                    color: '#4ade80',
                  }}
                >
                  ✅ Strengths
                </h3>

                <ul
                  style={{
                    paddingLeft: '20px',
                    lineHeight: '2',
                    color: '#d1d5db',
                  }}
                >
                  {feedback.strengths?.map(
                    (item, index) => (
                      <li key={index}>
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* IMPROVEMENTS */}

              <div
                style={{
                  marginBottom: '30px',
                }}
              >
                <h3
                  style={{
                    marginBottom: '14px',
                    color: '#facc15',
                  }}
                >
                  ⚡ Areas to Improve
                </h3>

                <ul
                  style={{
                    paddingLeft: '20px',
                    lineHeight: '2',
                    color: '#d1d5db',
                  }}
                >
                  {feedback.improvements?.map(
                    (item, index) => (
                      <li key={index}>
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* BETTER ANSWER */}

              <div>
                <h3
                  style={{
                    marginBottom: '14px',
                    color: '#60a5fa',
                  }}
                >
                  💡 Suggested Better Answer
                </h3>

                <div
                  style={{
                    background: '#111827',
                    padding: '22px',
                    borderRadius: '16px',
                    lineHeight: '2',
                    color: '#d1d5db',
                    border: '1px solid #374151',
                  }}
                >
                  {feedback.better_answer}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;