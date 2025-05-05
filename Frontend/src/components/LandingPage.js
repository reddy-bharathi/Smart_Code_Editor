/*import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';


function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login'); // Redirects to login page
  };

  const handleSignUp = () => {
    navigate('/register'); // Redirects to registration page
  };

  const pageStyle = {
    backgroundImage: `url('/images/landing.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
    

  return (
    <div style={pageStyle}>
    
   
    <div className="landing-container">
      <div className="content">
        <h1>Welcome to Our Service</h1>
        <p>Track your bus easily.</p>
        <button className="btn btn-primary get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
        <p className="mt-3">
          New here? <button className="btn btn-link" onClick={handleSignUp}>Sign Up</button>
        </p>
      </div>
    </div>
    </div>
    
  );

}

export default LandingPage;
*/
// src/components/LandingPage.js
// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import bgImage from '../images/img2.png'; // Correct image import

function LandingPage() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/register');
  };

  return (
    <div
      className="landing-container"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="overlay-content">
        <h2>Welcome to the coding World!</h2>
        <p>
          Create your own Code
          and Practise and test your coding skills.
        </p>
        <button className="start-button" onClick={handleStartClick}>
          Start Here
        </button>
      </div>
    </div>
  );
}

export default LandingPage;




