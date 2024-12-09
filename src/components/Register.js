import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(''); // Clear error message on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    axios.post('/register', formData)
      .then(response => {
        console.log(response.data);
        setSuccessMessage('Registration successful! Redirecting...');
        setTimeout(() => {
          navigate('/verify');
        }, 2000);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setErrorMessage('Registration failed. Please check your details or try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css?family=Roboto:400,700');

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Roboto', sans-serif;
          }

          body {
            background-color: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }

          .screen {
            position: relative;
            background: #1a1a1a;
            width: 400px;
            padding: 50px;
            border-radius: 15px;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.6), 0 0 50px rgba(0, 255, 255, 0.3);
            overflow: hidden;
          }

          .screen::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            box-shadow: 0 0 50px rgba(0, 255, 255, 0.3), 0 0 100px rgba(0, 255, 255, 0.2);
            pointer-events: none;
          }

          .screen__content {
            position: relative;
            z-index: 1;
          }

          .login {
            width: 100%;
          }

          .login__field {
            position: relative;
            margin-bottom: 20px;
          }

          .login__icon {
            position: absolute;
            top: 50%;
            left: 10px;
            transform: translateY(-50%);
            color: rgba(0, 255, 255, 0.8);
            font-size: 20px;
          }

          .login__input {
            width: 100%;
            padding: 12px 40px;
            background-color: #1c1c1c;
            border: none;
            border-radius: 5px;
            color: #fff;
            font-size: 1em;
            box-shadow: inset 0 0 10px rgba(0, 255, 255, 0.3);
            transition: 0.3s;
          }

          .login__input:focus {
            outline: none;
            background-color: #111;
            box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.6), 0 0 10px rgba(0, 255, 255, 0.3);
          }

          .login__submit {
            width: 100%;
            padding: 10px;
            background: linear-gradient(90deg, #00f5ff, #00c3ff);
            color: #fff;
            font-weight: bold;
            text-transform: uppercase;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 255, 255, 0.6);
            transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
          }

          .login__submit:hover {
            background: linear-gradient(90deg, #00c3ff, #00f5ff);
            transform: scale(1.05);
            box-shadow: 0 8px 25px rgba(0, 255, 255, 0.8);
          }

          .error-message {
            color: red;
            margin: 10px 0;
          }

          .success-message {
            color: green;
            margin: 10px 0;
          }

          .screen__background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 0;
          }

          .screen__background__shape {
            transform: rotate(45deg);
            position: absolute;
          }

          .screen__background__shape1 {
            height: 520px;
            width: 520px;
            background: #fff;
            top: -50px;
            right: 120px;
            border-radius: 0 72px 0 0;
          }

          .screen__background__shape2 {
            height: 220px;
            width: 220px;
            background: #6C63AC;
            top: -172px;
            right: 0;
            border-radius: 32px;
          }

          .screen__background__shape3 {
            height: 540px;
            width: 190px;
            background: linear-gradient(270deg, #00f5ff, #00c3ff);
            top: -24px;
            right: 0;
            border-radius: 32px;
          }

          .screen__background__shape4 {
            height: 400px;
            width: 200px;
            background: #7E7BB9;
            top: 420px;
            right: 50px;
            border-radius: 60px;
          }
        `}
      </style>
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={handleSubmit}>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className="login__field">
              <FaUser className="login__icon" />
              <input
                type="text"
                name="name"
                className="login__input"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login__field">
              <FaEnvelope className="login__icon" />
              <input
                type="email"
                name="email"
                className="login__input"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login__field">
              <FaLock className="login__icon" />
              <input
                type="password"
                name="password"
                className="login__input"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button className="login__submit" type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Register;
