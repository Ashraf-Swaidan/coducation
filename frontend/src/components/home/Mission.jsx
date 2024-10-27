import React from 'react';
import './Mission.css'; // Import CSS for additional styling

const Mission = () => {
  return (
    <section className="mission">
      <div className="container">
        <div className="mission-content">

          <div className="mission-image">
            <img src="Images/community.png" alt="Mission Illustration" />
          </div>
          
          <div className="mission-text">
            <h2>Our Mission and Purpose</h2>
            <p>
              At Coducation, our mission is to revolutionize the way people learn programming skills. We believe in the power of personalized guidance, curated resources, and a supportive community to help you achieve your coding goals. Whether you're a beginner or an experienced developer, Coducation is here to empower you on your coding journey.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Mission;
