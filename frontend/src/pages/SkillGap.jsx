import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

const SkillGap = () => {
  const { t } = useTranslation();
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setAnalysis(null);
    setLoading(true);

    try {
      const response = await api.post('/api/skillgap/detect', {
        resume_text: resumeText,
        job_description: jobDescription,
      });
      setAnalysis(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Unable to detect skill gap.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '840px', margin: '0 auto', textAlign: 'left' }}>
      <h2 style={{ textAlign: 'center' }}>{t('skill_gap_detector')}</h2>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Paste a job description and compare it with your resume to identify missing skills.
      </p>
      <form onSubmit={handleSubmit} style={{ marginTop: '30px', display: 'grid', gap: '20px' }}>
        <div style={{ display: 'grid', gap: '8px' }}>
          <label>Your Resume Text</label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={6}
            placeholder="Paste your resume text here"
            required
            style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #4b5563', background: '#111827', color: '#f8fafc' }}
          />
        </div>
        <div style={{ display: 'grid', gap: '8px' }}>
          <label>Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
            placeholder="Paste the job description here"
            required
            style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #4b5563', background: '#111827', color: '#f8fafc' }}
          />
        </div>
        {error && <div style={{ color: '#fecaca', background: '#7f1d1d1a', padding: '12px', borderRadius: '10px' }}>{error}</div>}
        <button type="submit" disabled={loading} style={{ width: '190px', padding: '14px 20px', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '12px', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Analyzing...' : 'Analyze Skill Gap'}
        </button>
      </form>

      {analysis && (
        <div style={{ marginTop: '30px', padding: '24px', borderRadius: '14px', border: '1px solid #374151', background: '#111827', color: '#e5e7eb' }}>
          <h3>Skill Gap Analysis</h3>
          <p><strong>Match Score:</strong> {analysis.match_score ?? 'N/A'}</p>
          <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
            <div>
              <h4>Matched Skills</h4>
              <ul>{analysis.matched_skills.map((skill, idx) => <li key={idx}>{skill}</li>)}</ul>
            </div>
            <div>
              <h4>Missing Skills</h4>
              <ul>{analysis.missing_skills.map((skill, idx) => <li key={idx}>{skill}</li>)}</ul>
            </div>
            <div>
              <h4>Recommendations</h4>
              <ul>{analysis.recommendations.map((recommendation, idx) => <li key={idx}>{recommendation}</li>)}</ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillGap;
