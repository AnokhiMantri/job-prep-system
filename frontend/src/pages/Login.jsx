import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await loginUser({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.detail || 'Login failed');
    }
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title">{t('login')}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-field">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="auth-field">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <div className="auth-error">{error}</div>}
        <button type="submit" className="auth-button">
          {t('login')}
        </button>
      </form>
    </div>
  );
};

export default Login;
