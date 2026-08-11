
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(
          'Registration Successful! Please check your email for the Welcome OTP.'
        );

        navigate("/verify-email", {
        state: {
          email: email,
        },
      });
        
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
          <h2>Create your account</h2>
          <p>Join Vendra and start shopping beautifully.</p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="auth-form">

          <div className="input-group">
            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">
              Email address
            </label>

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
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-btn"
          >
            <span>Create Account</span>
            <span className="btn-arrow">→</span>
          </button>

        </form>

        {/* Login */}
        <div className="auth-footer">
          <p>
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>
        </div>

      </div>

    </div>
  );
};

export default Register;

