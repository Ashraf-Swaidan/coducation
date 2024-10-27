import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faBookOpen, faLaptopCode, faUsers, faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import './Hero.css'; // Import CSS for additional styling

const Hero = () => {
  return (
    <section className="hero">

      <div className="hero-container">

        <div className="hero-content">

          <h2>Why Choose Coducation?</h2>

          <div className="features">

            <div className="feature">
              <FontAwesomeIcon icon={faUserGraduate} className="feature-icon" />
              <h3>Personalized Learning Paths</h3>
              <p>Customize your learning journey based on your goals and preferences.</p>
            </div>
            
            <div className="feature">
              <FontAwesomeIcon icon={faBookOpen} className="feature-icon" />
              <h3>Expertly Curated Courses</h3>
              <p>Access high-quality courses crafted by industry experts to master programming skills.</p>
            </div>

            <div className="feature">
              <FontAwesomeIcon icon={faLaptopCode} className="feature-icon" />
              <h3>Interactive Class Environments</h3>
              <p>Engage in immersive learning experiences with interactive classes and projects.</p>
            </div>

            <div className="feature">
              <FontAwesomeIcon icon={faHandsHelping} className="feature-icon" />
              <h3>Mentorship Opportunities</h3>
              <p>Connect with experienced mentors who provide guidance and support throughout your journey.</p>
            </div>
            
            <div className="feature">
              <FontAwesomeIcon icon={faUsers} className="feature-icon" />
              <h3>Collaborative Community</h3>
              <p>Join a vibrant community of learners and creators, fostering collaboration and innovation.</p>
            </div>

          </div>
          
        </div>

      </div>

    </section>
  );
};

export default Hero;
