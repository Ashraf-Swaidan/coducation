import React from 'react';
import './pathStyles/PopularMentors.css';

const PopularMentors = ({ mentors }) => {
  console.log(mentors);

  if (!Array.isArray(mentors) || mentors.length === 0) {
    return <div>Loading mentors...</div>; // Show a loading message or spinner
  }

  return (
    <div className="popular-mentors-container">
      <h2 className="popular-mentors-heading">Popular Mentors</h2>
      <div className="mentors-list">
        {mentors.map((mentor, index) => (
          <div className="mentor-card" key={index}>
            {mentor.profilePicture ?
            <img src={`http://localhost/coducation_backend/uploads/pfps/${mentor.profilePicture}`} alt={mentor.fullName} className="mentor-img" />
            : 
            <img src={'/Images/profilePlaceholder.png'} alt={`${mentor.fullName}'s pfp`} className="mentor-img" />
            }
            <div className="mentor-info">
              <h3 className="mentor-name">{mentor.fullName}</h3>
              <p className="mentor-details">Courses Created: {mentor.coursesCreated.join(', ')}</p>
              <p className="mentor-details">Students Taught: {mentor.studentsTaught}</p>
              <p className="mentor-details">Paths Joined: {mentor.pathsJoined.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMentors;
