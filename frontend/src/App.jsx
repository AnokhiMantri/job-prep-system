import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeAnalysis from './pages/ResumeAnalysis';
import InterviewPrep from './pages/InterviewPrep';
import SkillGap from './pages/SkillGap';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/resume"
              element={
                <ProtectedRoute>
                  <ResumeAnalysis />
                </ProtectedRoute>
              }
            />

            <Route
              path="/interview"
              element={
                <ProtectedRoute>
                  <InterviewPrep />
                </ProtectedRoute>
              }
            />

            <Route
              path="/skillgap"
              element={
                <ProtectedRoute>
                  <SkillGap />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
