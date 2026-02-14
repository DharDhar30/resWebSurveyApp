import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { fetchAllResults } from '../services/surveyService';

function Dashboard() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    //Monitor Authentication State
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // If no one is logged in, redirect to the login page
        navigate('/login');
      } else {
        setUser(currentUser);
        loadData();
      }
    });

    const loadData = async () => {
      try {
        const data = await fetchAllResults();
        setResults(data);
      } catch (error) {
        alert("Access Denied: You do not have permission to view this data.");
      } finally {
        setLoading(false);
      }
    };

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  if (loading) return <div className="loading-screen"><p>Verifying Admin Access...</p></div>;

  return (
    <div className="admin-dashboard">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Pinellas County Survey Results</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <div className="stats-bar">
        <p>Logged in as: <strong>{user?.email}</strong></p>
        <p>Total Submissions: <strong>{results.length}</strong></p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>County</th>
            <th>Responses (Issue ID: Score)</th>
          </tr>
        </thead>
        <tbody>
          {results.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.submittedAt?.toDate().toLocaleDateString()}</td>
              <td>{entry.county}</td>
              <td>
                {Object.entries(entry.responses).map(([id, score]) => (
                  <span key={id} style={{ marginRight: '10px', display: 'inline-block' }}>
                    {id.replace(/_/g, ' ')}: <strong>{score}</strong>
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;