import React, { useState } from 'react';
import authService from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

// Assuming the images are stored in 'assets/icons'
import googleIcon from '../assets/icons/google.png';
import metaIcon from '../assets/icons/meta.png';
import appleIcon from '../assets/icons/apple.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(username, password);
      navigate('/dashboard');
    } catch (error) {
      setMessage('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2><span style={{font:'Inter',fontVariant: 'normal',fontWeight:'bold'}}>Back to your digital life</span></h2>
        <p><span style={{font:'IBM Plex Serif'}}>Choose one of the options to go</span></p>
        {message && <p className="error-message">{message}</p>}
        <div className="form-group">
          <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary">Log in</button>
        <p className="alternative-login">Or continue with</p>
        <div className="social-login" style={{background: 'white'}}>
          <button><img src={googleIcon} alt="Google" class="social-icon"/></button>
          <button><img src={metaIcon} alt="meta" class="social-icon"/></button>
          <button><img src={appleIcon} alt="apple"class="social-icon"/></button>
        </div>
        <p className="register-link">Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
