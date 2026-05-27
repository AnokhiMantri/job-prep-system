import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const cardStyle = {
    padding: '24px',
    border: '1px solid #ccc',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease',
    background: '#111827',
    color: '#e5e7eb'
  };

  return (
    <div style={{ padding: '50px' }}>
      <h2>{t('dashboard')}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        <div onClick={() => navigate('/resume')} style={{ ...cardStyle, minHeight: '180px' }}>
          <h3>📄 Resume Analysis</h3>
          <p>Upload your resume for ATS scoring and keyword extraction.</p>
        </div>
        <div onClick={() => navigate('/interview')} style={{ ...cardStyle, minHeight: '180px' }}>
          <h3>🤖 Interview Prep</h3>
          <p>Practice with our voice-enabled AI interviewer.</p>
        </div>
        <div onClick={() => navigate('/skillgap')} style={{ ...cardStyle, minHeight: '180px' }}>
          <h3>🎯 Skill Gap Detector</h3>
          <p>Paste a Job Description to find missing skills.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
