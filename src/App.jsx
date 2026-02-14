import React, { useState, useEffect } from 'react';
import './App.css';
import { db, auth } from './firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import { submitSurvey } from './services/surveyService';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route for routing

// Component Imports
import IssueList from './components/IssueList';
import Login from './admin/Login';
import Dashboard from './dashboard/Dashboard';
import colors from './color';

const questions = [
  { id: "issue_id_01", text: "The government should increase funding for public transportation in Pinellas County." },
  { id: "issue_id_02", text: "Local businesses should receive tax incentives to create more jobs in Florida." },
  { id: "issue_id_03", text: "The state should invest more in renewable energy sources." },
  { id: "issue_id_04", text: "Public schools should receive increased funding for technology and resources." },
  { id: "issue_id_05", text: "The minimum wage in Florida should be raised to match the cost of living." },
  { id: "issue_id_06", text: "Local law enforcement should receive more funding for community programs." },
  { id: "issue_id_07", text: "The county should prioritize affordable housing development." },
  { id: "issue_id_08", text: "Environmental regulations should be strengthened to protect Florida's coastlines." },
  { id: "issue_id_09", text: "Healthcare services should be more accessible in rural areas of the county." },
  { id: "issue_id_10", text: "The government should provide more support for small business owners." },
  { id: "issue_id_11", text: "Property taxes should be restructured to benefit long-term residents." },
  { id: "issue_id_12", text: "The county should expand mental health services and resources." },
  { id: "issue_id_13", text: "Infrastructure spending should prioritize road maintenance and repairs." },
  { id: "issue_id_14", text: "Local government should increase transparency in budget decisions." },
  { id: "issue_id_15", text: "The state should provide more resources for disaster preparedness." }
];

function App() {
  const [answers, setAnswers] = useState(() => {
    let initial = {};
    questions.forEach((q) => {
      initial[q.id] = 5;
    });
    return initial;
  });

  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [view, setView] = useState('survey'); // 'survey', 'login', or 'admin'
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setView('admin'); // Auto-switch to dashboard if already logged in
      }
    });
    return () => unsubscribe();
  }, []);

  // --- HANDLERS ---
  function handleSlider(issueId, value) {
    setAnswers(prev => ({
      ...prev,
      [issueId]: Number(value)
    }));
    setTouched(prev => ({
      ...prev,
      [issueId]: true
    }));
  }

  const allTouched = questions.every((q) => touched[q.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const docId = await submitSurvey("Pinellas", answers); 
      console.log('Success! ID:', docId); 
      setSubmitted(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Routes>
      {/* PUBLIC SURVEY ROUTE */}
      <Route path="/" element={
        submitted ? (
          <div className="app">
            <div className="container">
              <div className="thankyou">
                <h1>Thank You!</h1>
                <p>Your responses have been recorded.</p>
                <p>Thank you for participating in the Pinellas County community survey.</p>
                <button onClick={() => {
                  setSubmitted(false);
                  setTouched({});
                  let reset = {};
                  questions.forEach((q) => reset[q.id] = 5);
                  setAnswers(reset);
                }}>
                  Take Again
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="app">
            <div className="container">
              <header>
                <h1>Community Issues Survey</h1>
                <span className="badge">Pinellas County, Florida</span>
                <p>Rate your agreement with each statement from 1-10</p>
                <div className="scale-info">
                  <span>1 = Strongly Disagree</span>
                  <span>10 = Strongly Agree</span>
                </div>
              </header>

              <form onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                  <div className="question-box" key={question.id}>
                    <p><strong>{index + 1}.</strong> {question.text}</p>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={answers[question.id]}
                      onChange={(e) => handleSlider(question.id, e.target.value)}
                    />
                    <div className="value-bubble">{answers[question.id]}</div>
                  </div>
                ))}

                <button 
                  type="submit" 
                  className="submit-btn" 
                  disabled={!allTouched || loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </form>

              <footer style={{ marginTop: '50px', textAlign: 'center' }}>
                <button 
                  onClick={() => window.location.href='/login'} 
                  style={{ opacity: 0.2, fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Admin Access
                </button>
              </footer>
            </div>
          </div>
        )
      } />

      {/* ADMIN & AUTH ROUTES */}
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth" element={<Login />} />
    </Routes>
  );
}

export default App;