import { useState } from 'react';
import api from '../services/api';
import { useTranslation } from 'react-i18next';

const ResumeUpload = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/api/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data.analysis);
    } catch (err) {
      setError(err.response?.data?.detail || "An error occurred during upload.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>{t('upload_resume_title')}</h3>
      <input type="file" accept=".pdf,.docx" onChange={handleFileChange} style={{ marginBottom: '15px', display: 'block' }} />
      
      <button 
        onClick={handleUpload} 
        disabled={!file || loading}
        style={{ padding: '10px 20px', backgroundColor: file && !loading ? '#646cff' : '#555', color: 'white', border: 'none', borderRadius: '4px', cursor: file && !loading ? 'pointer' : 'not-allowed' }}
      >
        {loading ? t('analyzing_btn') : t('upload_btn')}
      </button>

      {error && <p style={{ color: 'red', marginTop: '15px' }}>{t('error_upload')} ({error})</p>}

      {result && (
        <div style={{ marginTop: '20px', textAlign: 'left', background: '#222', padding: '15px', borderRadius: '6px' }}>
          <h4>Analysis Results</h4>
          <p><strong>ATS Score:</strong> {result.ats_score}/100</p>
          <p><strong>Strengths:</strong></p>
          <ul>
            {result.strengths?.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
          <p><strong>Weaknesses:</strong></p>
          <ul>
            {result.weaknesses?.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
          <p><strong>Keywords Detected:</strong> {result.keywords?.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
