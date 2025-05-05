

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // import Routes correctly
import './App.css';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Upload from './components/Upload';
import Home from './components/Home';
import CodeEditor from './components/CodeEditor';


function App() {
  return (
    
    <Router>
      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Upload" element={<Upload />} />
        <Route path="/CodeEditor" element={<CodeEditor />} />
        
      </Routes>
    </Router>
    
  );
}

export default App;



