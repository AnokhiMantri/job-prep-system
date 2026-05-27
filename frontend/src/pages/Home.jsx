import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>{t('welcome')}</h1>
      <p>Your AI-powered interview preparation and resume optimization tool.</p>
    </div>
  );
};

export default Home;
