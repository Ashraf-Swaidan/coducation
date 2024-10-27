//Header.jsx
import React from 'react';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-text">
          <h1>Empower Your Journey with <span className="highlight">Coducation</span></h1>
          <p>Unlock Your Potential in the World of Programming</p>
          <p>Learn from Industry Experts, Collaborate with Peers, and Build Your Dream Projects</p>
          <button className="cta-button">Get Started</button>
        </div>
        <div className="header-image">
          {/* Animated illustration or video */}
          <img src="Images/header-img.gif" alt="Header Animation" />
        </div>
      </div>
    </header>
  );
};

export default Header;
