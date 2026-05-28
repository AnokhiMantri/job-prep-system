import { Link } from 'react-router-dom';
import {
  FaMicrophone,
  FaFileAlt,
  FaChartLine,
  FaArrowRight,
} from 'react-icons/fa';

const Home = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left, #312e81 0%, transparent 30%), radial-gradient(circle at bottom right, #0f172a 0%, transparent 30%), #020617',
        color: 'white',
        padding: '40px',
      }}
    >

      {/* HERO SECTION */}

      <div
        style={{
          maxWidth: '850px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '10px 18px',
            borderRadius: '999px',
            background:
              'rgba(99,102,241,0.15)',
            border:
              '1px solid rgba(255,255,255,0.08)',
            marginBottom: '28px',
            color: '#c7d2fe',
            fontSize: '14px',
          }}
        >
          AI-Powered Career Preparation Platform
        </div>

        <h1
          style={{
            fontSize: '64px',
            lineHeight: '1.1',
            marginBottom: '24px',
            fontWeight: '800',
          }}
        >
          Ace Your Interviews
          <br />
          with AI Assistance
        </h1>

        <p
          style={{
            fontSize: '20px',
            color: '#94a3b8',
            lineHeight: '1.8',
            marginBottom: '40px',
          }}
        >
          Practice mock interviews, analyze resumes,
          identify skill gaps, and receive real-time
          AI-powered feedback to accelerate your
          career growth.
        </p>

        {/* CTA BUTTONS */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <Link
            to="/interview"
            style={primaryButton}
          >
            Start Interview
            <FaArrowRight />
          </Link>

          <Link
            to="/resume"
            style={secondaryButton}
          >
            Analyze Resume
          </Link>
        </div>
      </div>

      {/* FEATURE CARDS */}

      <div
        style={{
          marginTop: '100px',
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '28px',
          maxWidth: '1200px',
          marginInline: 'auto',
        }}
      >
        {/* CARD 1 */}

        <div style={cardStyle}>
          <div style={iconWrapper}>
            <FaMicrophone size={26} />
          </div>

          <h3 style={cardTitle}>
            AI Interview Prep
          </h3>

          <p style={cardText}>
            Practice realistic AI-generated interview
            questions with voice interaction and
            intelligent feedback.
          </p>
        </div>

        {/* CARD 2 */}

        <div style={cardStyle}>
          <div style={iconWrapper}>
            <FaFileAlt size={26} />
          </div>

          <h3 style={cardTitle}>
            Resume Analyzer
          </h3>

          <p style={cardText}>
            Optimize your resume for ATS systems and
            receive personalized improvement
            suggestions.
          </p>
        </div>

        {/* CARD 3 */}

        <div style={cardStyle}>
          <div style={iconWrapper}>
            <FaChartLine size={26} />
          </div>

          <h3 style={cardTitle}>
            Skill Gap Detection
          </h3>

          <p style={cardText}>
            Compare your resume against job
            descriptions and discover missing skills
            instantly.
          </p>
        </div>
      </div>

      {/* FOOTER */}

      <footer
        style={{
          marginTop: '120px',
          textAlign: 'center',
          color: '#64748b',
          fontSize: '15px',
        }}
      >
        © 2026 CareerForge AI • Built with React,
        FastAPI & Gemini AI
      </footer>
    </div>
  );
};

/* ========================================= */
/* STYLES */
/* ========================================= */


const primaryButton = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  textDecoration: 'none',
  padding: '16px 28px',
  borderRadius: '14px',
  background:
    'linear-gradient(135deg, #6366f1, #8b5cf6)',
  color: 'white',
  fontWeight: '600',
  boxShadow:
    '0 10px 30px rgba(99,102,241,0.4)',
};

const secondaryButton = {
  textDecoration: 'none',
  padding: '16px 28px',
  borderRadius: '14px',
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.03)',
  color: 'white',
  fontWeight: '600',
  backdropFilter: 'blur(12px)',
};

const cardStyle = {
  background: 'rgba(17, 24, 39, 0.7)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '24px',
  padding: '32px',
  boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
};

const iconWrapper = {
  width: '60px',
  height: '60px',
  borderRadius: '16px',
  background:
    'linear-gradient(135deg, #6366f1, #8b5cf6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '22px',
};

const cardTitle = {
  fontSize: '22px',
  marginBottom: '14px',
};

const cardText = {
  color: '#94a3b8',
  lineHeight: '1.8',
};

export default Home;