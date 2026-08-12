
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://vendra-ecommerce.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data);
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        {/* Brand */}
        <div className="auth-brand">
          <h1>Vendra</h1>
          <span>Shop beautifully.</span>
        </div>

        {/* Heading */}
        <div className="auth-heading">
          <h2>Welcome back</h2>
          <p>Sign in to continue your Vendra journey.</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="auth-form">

          <div className="input-group">
            <label htmlFor="email">Email address</label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="auth-options">

            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <Link
              to="/forgot-password"
              className="forgot-link"
            >
              Forgot password?
            </Link>

          </div>

          <button
            type="submit"
            className="auth-btn"
          >
            <span>Sign In</span>
            <span className="btn-arrow">→</span>
          </button>

        </form>

        {/* Register */}
        <div className="auth-footer">
          <p>
            Don't have an account?
            <Link to="/register"> Create one</Link>
          </p>
        </div>

      </div>

    </div>
  );
};

export default Login;
