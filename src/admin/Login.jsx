import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin'); // Redirect to dashboard on success
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", err.code);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Admin Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <input 
          type="email" 
          placeholder="Admin Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        
        <button type="submit">Enter Dashboard</button>
      </form>
    </div>
  );
}

export default Login;