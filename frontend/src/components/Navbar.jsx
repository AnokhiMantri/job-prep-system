import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken, isAuthenticated } from '../services/auth';
import './Navbar.scss';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const loggedIn = isAuthenticated();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">CareerForge AI</Link>
      </div>

      <div className="navbar-links">
        <Link to="/dashboard">{t('dashboard')}</Link>

        {loggedIn ? (
          <button
            onClick={() => {
              clearToken();
              navigate('/login');
            }}
            className="logout-button"
          >
            {t('logout')}
          </button>
        ) : (
          <>
            <Link to="/login">{t('login')}</Link>
            <Link to="/register">{t('register')}</Link>
          </>
        )}

        <select
          onChange={changeLanguage}
          defaultValue={i18n.language}
          className="lang-select"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी (Hindi)</option>
          <option value="mr">मराठी (Marathi)</option>
          <option value="gu">ગુજરાતી (Gujarati)</option>
          <option value="bn">বাংলা (Bengali)</option>
          <option value="ta">தமிழ் (Tamil)</option>
          <option value="te">తెలుగు (Telugu)</option>
          <option value="kn">ಕನ್ನಡ (Kannada)</option>
          <option value="ml">മലയാളം (Malayalam)</option>
          <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;