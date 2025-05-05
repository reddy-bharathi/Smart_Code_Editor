import React, { useState } from "react";
import { Container, Navbar, Nav, Button, Card, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

const Home = () => {
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.body.style.backgroundColor = darkMode ? "#fff" : "#121212";
        document.body.style.color = darkMode ? "#000" : "#fff";
    };

    const handleLogout = () => {
        // Clear localStorage/sessionStorage (based on your usage)
        localStorage.clear(); 
        // Redirect to login page
        navigate('/login');
      };

    return (
        <div className={darkMode ? "bg-dark text-white" : "bg-light text-dark"}>
            {/* Navbar */}
            <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand as={Link} to="/">Smart Code Editor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            <Nav.Link as={Link} to="/CodeEditor">Compiler</Nav.Link>
                            <Nav.Link href="#steps">How it Works</Nav.Link>
                            <Nav.Link href="#contact">Contact</Nav.Link>
                            <Nav.Link href="#feedback">Feedback</Nav.Link>
                        </Nav>
                        <Button variant="outline-secondary" onClick={toggleTheme} className="ms-3">
                            {darkMode ? <FaSun /> : <FaMoon />}
                        </Button>&nbsp;&nbsp;&nbsp;
                        <button 
          onClick={handleLogout} 
          style={{
            backgroundColor: '#ff4d4f',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '8px 16px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Hero Section */}
            <div
                style={{
                    backgroundImage: `url("/images/img9.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "100vh",
                    padding: "60px 20px",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Container className="text-center">
                    <div
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            padding: "40px",
                            borderRadius: "20px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                            

                        }}
                    >
                        <h2 className="mb-3">Welcome to the Online Code Compiler & Error Finder</h2>
                        <p className="mb-5">Upload your code or create your own. Supports multiple languages!</p>

                        <Row className="justify-content-center">
                            <Col md={4} className="mb-4">
                                <Card className={darkMode ? "bg-secondary text-white" : ""}>
                                    <Card.Body>
                                        <h5>Upload Code</h5>
                                        <p>Upload a file and check for errors.</p>
                                        <Button onClick={() => navigate("/Upload")} variant="primary">Upload</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} className="mb-4">
                                <Card className={darkMode ? "bg-secondary text-white" : ""}>
                                    <Card.Body>
                                        <h5>Create Your Own Code</h5>
                                        <p>Write, execute, and download code.</p>
                                        <Button onClick={() => navigate("/CodeEditor")} variant="primary">Start coding</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <Row className="mt-4">
                            <Col>
                                <h4>Supported Languages</h4>
                                <p>Java, Python, JavaScript, HTML, CSS</p>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>

            {/* Steps Section */}
            <div
                id="steps"
                style={{
                    backgroundImage: `url("/images/img7.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    padding: "20px",
                    color: "#fff",
                }}
            >
                <div
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        padding: "30px",
                        borderRadius: "20px",
                        maxWidth: "550px",
                        width: "100%",
                    }}
                >
                    <h2 className="text-center mb-4">How to Use the Website</h2>
                    <ol style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
                        <li>Register or login to your account.</li>
                        <li>Choose to upload code or create your own.</li>
                        <li>Write or upload code in supported languages.</li>
                        <li>Click run to check for errors or compile.</li>
                        <li>View the output and download your code if needed.</li>
                    </ol>
                </div>
            </div>

            {/* Contact Section */}
            <div
                id="contact"
                style={{
                    backgroundImage: `url("/images/img3.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: "30px 20px",
                    color: "#fff",
                }}
            >
                <div
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        padding: "40px 60px",
                        borderRadius: "40px",
                        width: "500px",
                        lineHeight: "1.6",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    }}
                >
                    <h2 className="text-center mb-4">Contact Us</h2>
                    <p style={{ marginBottom: "10px" }}>
                        <strong>Email:</strong> support@codecompiler.com <br />
                        <strong>Phone:</strong> +91 9581922705<br />
                        <strong>WhatsApp</strong> +91 9581922705

                    </p>
                    <div style={{ marginTop: "20px" }}>
                        <h4>Our Location</h4>
                        <p>123 Gandhi Nagar, RK Valley, Kadapa</p>
                    </div>
                </div>
            </div>

           {/* Feedback Section */}
<div
  id="feedback"
  style={{
    backgroundImage: `url("/images/img6.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "10px 20px",
    color: "#fff",
  }}
>
  <div
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      padding: "30px 20px",
      borderRadius: "20px",
      maxWidth: "600px",
      width: "50%",
    }}
  >
    <h2 className="text-center mb-4">We'd Love Your Feedback!</h2>
    <p className="text-center text-light">
      Help us improve your experience by sharing your thoughts below.
    </p>

    <form>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name (optional)</label>
        <input type="text" className="form-control" id="name" placeholder="Enter your name" />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
      </div>

      <div className="mb-3">
        <label htmlFor="rating" className="form-label">Rate Your Experience</label>
        <select className="form-select" id="rating" required>
          <option value="">Select rating</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="message" className="form-label">Your Feedback</label>
        <textarea className="form-control" id="message" rows="3" placeholder="Tell us more..." required></textarea>
      </div>

      

      <button type="submit" className="btn btn-primary w-100">Submit Feedback</button>
    </form>

    
    
  </div>
</div>

        </div>
    );
};

export default Home;
