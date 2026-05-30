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
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await loginUser({ email, password });

      setSuccess('✅ Login successful! Redirecting to dashboard...');

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (err) {
      setError(
        err?.response?.data?.detail || 'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title">{t('login')}</h2>

      <form onSubmit={handleSubmit} className="auth-form">

        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />
        </div>

        <div className="auth-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />
        </div>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              background: '#052e16',
              border: '1px solid #22c55e',
              color: '#bbf7d0',
              padding: '12px',
              borderRadius: '10px',
              textAlign: 'center',
            }}
          >
            {success}
          </div>
        )}

        <button
          type="submit"
          className="auth-button"
          disabled={loading}
        >
          {loading
            ? 'Logging in...'
            : t('login')}
        </button>

      </form>
    </div>
  );
};

export default Login;