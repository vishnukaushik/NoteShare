// src/components/Login/LoginPage.jsx
import React, { useState } from 'react';
import { Mail, Lock, Loader2 } from 'lucide-react';
import Logo from '../shared/Logo';
import axios from "axios";
import '../styles/LoginPage.css';
import {BACKEND_BASE_URL} from '../App'
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

const LoginPage = ({signup = false}) => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  console.log("signup value: ", signup)

  const ENDPOINT = `${BACKEND_BASE_URL}/auth/` + (signup?'signup':'signin');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    

    axios
        .post(ENDPOINT, { 'username':formData.email, 'password':formData.password })
        .then((result) => {
        const token = result.data.token;
        if(!token)
            throw new Error("Token is NULL")
        localStorage.setItem("token", token);
        navigate("/notes");
        console.log("signed in successfully")
        }).catch(error => {
            setLoginError('Invalid email or password. Please try again.');
            console.log("Error: ", error)
        }).finally(()=> setIsLoading(false));
    
    console.log('Login attempted with:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <GoogleOAuthProvider clientId="244058698901-4ju2lolce48a2gbbieh98lnb2gcfd5nc.apps.googleusercontent.com">
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <Logo className="login-logo" />
          <h1 className="login-title">NoteShare</h1>
          <p className="login-subtitle">Share your thoughts, seamlessly.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {loginError && (
            <div className="error-message">{loginError}</div>
          )}

          <div className="form-group">
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          {!signup && <div className="form-footer">
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>}

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="spinner" size={20} />
                <span>Signing in...</span>
              </>
            ) : (
              signup?'Sign up to NoteShare':'Sign in to NoteShare'
            )}
          </button>
        </form>

        <div className="social-divider">
          <span>or continue with</span>
        </div>

        <div className="social-buttons">
          <button type="button" className="social-button">
            <img src="https://www.google.com/favicon.ico" alt="Google" width="20" height="20" />
            <span>Google</span>
          </button>
          <button type="button" className="social-button">
            <img src="https://github.com/favicon.ico" alt="GitHub" width="20" height="20" />
            <span>GitHub</span>
          </button>
        </div>

        {
            !signup?
            (
                <p className="signup-prompt">
                New to NoteShare?{' '}
                <a href="/signup" className="signup-link">
                  Create an account
                </a>
              </p>
            ):
            (
                <p className="signup-prompt">
                Already existing user?{' '}
                <a href="/signin" className="signup-link">
                  Sign in
                </a>
              </p>
            )
        }
      </div>
    </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;