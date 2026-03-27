import { SignIn, SignUp, useAuth } from '@clerk/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import './App.css';

function AuthLayout() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Navigate to="/simplify-text" replace />;
  }

  return (
    <div className="container">

      {/* LEFT SIDE - BRANDING */}
      <div className="left">
        <div className="content">
          <h1>🎓 BoundlessEd</h1>
          <p>
            Empowering accessible education for everyone. Learn without barriers, grow without limits.
          </p>

          <div className="features">
            <p>✨ AI-Powered Personalized Learning</p>
            <p>🎧 Real-Time Speech & Text Support</p>
            <p>🧠 Adaptive Content Delivery</p>
            <p>♿ Full Accessibility Compliance</p>
            <p>🌍 Multi-Language & Multi-Format</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - AUTH FORM */}
      <div className="right">
        <div className="auth-box">
          {isSignUp ? (
            <SignUp
              afterSignUpUrl="/simplify-text"
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'shadow-xl border border-gray-100',
                }
              }}
            />
          ) : (
            <SignIn
              afterSignInUrl="/simplify-text"
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'shadow-xl border border-gray-100',
                }
              }}
            />
          )}

          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="toggle-auth"
          >
            {isSignUp ? '← Already have an account? Sign In' : "Don't have an account? Sign Up →"}
          </button>

          <div className="trust-badge">
            <p>🔒 Secure & encrypted authentication</p>
          </div>
        </div>
      </div>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />} />
        <Route path="/dashboard" element={<Navigate to="/simplify-text" replace />} />
        <Route path="/ai-assistant" element={<Dashboard />} />
        <Route path="/text-to-speech" element={<Dashboard />} />
        <Route path="/text-to-visuals" element={<Dashboard />} />
        <Route path="/text-to-sign-language" element={<Dashboard />} />
        <Route path="/gamified-study" element={<Dashboard />} />
        <Route path="/simplify-text" element={<Dashboard />} />
        <Route path="/study-notes" element={<Dashboard />} />
        <Route path="/settings" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/simplify-text" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
