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
        padding: '0',
        overflowX: 'hidden',
      }}
    >

      {/* HERO SECTION */}

      <div
        style={{
          width: '100%',
          padding: '120px 8% 80px',
          textAlign: 'center',
          boxSizing: 'border-box',
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
            fontSize: '72px',
            lineHeight: '1.05',
            marginBottom: '28px',
            fontWeight: '800',
            maxWidth: '1100px',
            marginInline: 'auto',
          }}
        >
          Ace Your Interviews
          <br />
          with AI Assistance
        </h1>

        <p
          style={{
            fontSize: '21px',
            color: '#94a3b8',
            lineHeight: '1.9',
            marginBottom: '45px',
            maxWidth: '850px',
            marginInline: 'auto',
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
          width: '100%',
          padding: '0 8%',
          boxSizing: 'border-box',
          marginTop: '40px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
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
      </div>

      {/* FOOTER */}

      <footer
        style={{
          marginTop: '120px',
          paddingBottom: '40px',
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
  padding: '16px 30px',
  borderRadius: '16px',
  background:
    'linear-gradient(135deg, #6366f1, #8b5cf6)',
  color: 'white',
  fontWeight: '600',
  fontSize: '16px',
  boxShadow:
    '0 10px 30px rgba(99,102,241,0.4)',
  transition: '0.3s ease',
};

const secondaryButton = {
  textDecoration: 'none',
  padding: '16px 30px',
  borderRadius: '16px',
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.03)',
  color: 'white',
  fontWeight: '600',
  fontSize: '16px',
  backdropFilter: 'blur(12px)',
  transition: '0.3s ease',
};

const cardStyle = {
  background: 'rgba(17, 24, 39, 0.72)',
  backdropFilter: 'blur(14px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '28px',
  padding: '36px',
  boxShadow: '0 10px 40px rgba(0,0,0,0.28)',
  transition: '0.3s ease',
};

const iconWrapper = {
  width: '68px',
  height: '68px',
  borderRadius: '18px',
  background:
    'linear-gradient(135deg, #6366f1, #8b5cf6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '24px',
};

const cardTitle = {
  fontSize: '24px',
  marginBottom: '14px',
};

const cardText = {
  color: '#94a3b8',
  lineHeight: '1.9',
  fontSize: '16px',
};

export default Home;