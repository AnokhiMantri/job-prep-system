import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

const InterviewPrep = () => {
  const { t } = useTranslation();
  const [jobTitle, setJobTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setTranscript('');
    setLoading(true);

    try {
      const response = await api.post('/api/interview/practice', {
        job_title: jobTitle,
        experience_summary: experience,
      });
      setTranscript(response.data.transcript);
    } catch (err) {
      setError(err.response?.data?.detail || 'Unable to generate interview practice.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '840px', margin: '0 auto', textAlign: 'left' }}>
      <h2 style={{ textAlign: 'center' }}>{t('interview_prep')}</h2>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Practice with voice-enabled interview questions and get feedback to improve your answers.
      </p>
      <form onSubmit={handleSubmit} style={{ marginTop: '30px', display: 'grid', gap: '20px' }}>
        <div style={{ display: 'grid', gap: '8px' }}>
          <label>Role / Job Title</label>
          <input
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g. Software Engineer"
            required
            style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #4b5563', background: '#111827', color: '#f8fafc' }}
          />
        </div>
        <div style={{ display: 'grid', gap: '8px' }}>
          <label>Experience Summary (optional)</label>
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            rows={5}
            placeholder="Summarize your experience, skills, or recent projects."
            style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #4b5563', background: '#111827', color: '#f8fafc' }}
          />
        </div>
        {error && <div style={{ color: '#fecaca', background: '#7f1d1d1a', padding: '12px', borderRadius: '10px' }}>{error}</div>}
        <button type="submit" disabled={loading} style={{ width: '180px', padding: '14px 20px', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '12px', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Generating...' : 'Start Practice'}
        </button>
      </form>
      {transcript && (
        <div style={{ marginTop: '30px', padding: '22px', borderRadius: '14px', border: '1px solid #374151', background: '#111827', color: '#e5e7eb' }}>
          <h3>Practice Transcript</h3>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginTop: '16px', fontFamily: 'inherit' }}>{transcript}</pre>
        </div>
      )}
    </div>
  );
};

export default InterviewPrep;
