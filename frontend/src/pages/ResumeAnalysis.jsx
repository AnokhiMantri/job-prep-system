import { useTranslation } from 'react-i18next';
import ResumeUpload from '../components/ResumeUpload';

const ResumeAnalysis = () => {
  const { t } = useTranslation();
  
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>{t('resume_analysis_title')}</h2>
      <p style={{ marginBottom: '30px' }}>{t('resume_analysis_desc')}</p>
      
      <ResumeUpload />
    </div>
  );
};

export default ResumeAnalysis;
