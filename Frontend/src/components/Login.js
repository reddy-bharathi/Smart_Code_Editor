// Login.js
/*import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    
        navigate("/home");
     
  };

  return (
    <div className="login-container">
      <div className="login-card shadow-lg p-4">
        <div className="row">
          <div className="col-md-6 left-section d-flex flex-column justify-content-center align-items-center text-light bg-primary">
            <h2>Login</h2>
            <p>Welcome back!</p>
            <button className="btn btn-light my-2 w-75">Email</button>
            <button className="btn btn-light my-2 w-75">Password</button>
          </div>
          <div className="col-md-6 right-section">
            <h3 className="text-center">Enter Credentials</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-4">Login</button>
            </form>
            <p className="text-center mt-3">
              Don’t have an account? <a href="/register">Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
*/

import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
   
      navigate("/home");
    
  };

  return (
    <div className="login-container">
      <div className="login-card shadow-lg p-0">
        <div className="row">
          {/* Left: Login Form */}
          <div className="col-md-6 left-section d-flex flex-column justify-content-center align-items-center text-light bg-primary">
            <h2 className="mb-3">Login</h2>
            <p>Welcome back!</p>
            <form onSubmit={handleSubmit} className="w-75">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-light w-100 mt-4">Login</button>
              <p className="text-light text-center mt-3">
                Don’t have an account? <a href="/register" className="text-warning">Register</a>
              </p>
            </form>
          </div>

          {/* Right: Image */}
          <div className="col-md-6 right-section d-flex justify-content-center align-items-center">
          <img
  src={require('../images/image1.png')}
  alt="Login Illustration"
  style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
/>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

