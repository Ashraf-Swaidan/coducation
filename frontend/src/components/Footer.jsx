import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <h3>About Coducation</h3>
                    <p>Coducation is an innovative online learning platform dedicated to empowering individuals in their coding journey. Our mission is to provide personalized learning experiences and foster a supportive community for aspiring programmers.</p>
                </div>
                <div className="footer-column">
                    <h3>Contact Us</h3>
                    <ul className="contact-info">
                        <li><FontAwesomeIcon icon={faEnvelope} /> info@coducation.com</li>
                        <li><FontAwesomeIcon icon={faPhone} /> +961 76 350 373</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Follow Us</h3>
                    <div className="footer-social-icons">
                        <a href="https://www.facebook.com/coducation" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
                        <a href="https://twitter.com/coducation" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
                        <a href="https://www.instagram.com/coducation" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href="https://www.linkedin.com/company/coducation" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Coducation. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
