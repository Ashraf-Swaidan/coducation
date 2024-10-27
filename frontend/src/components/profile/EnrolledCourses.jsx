import React from 'react';
import { BsPeople } from 'react-icons/bs'; 
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import './styles/EnrolledCourses.css'; // Import the new CSS file for custom styles

const EnrolledCourses = ({ enrolledCourses }) => {
  return (
    <div className="courses-container">
      <h2 className="courses-header">Enrolled Courses</h2>
      <div className="courses-grid">
        {enrolledCourses && enrolledCourses.map(course => (
          <div className="course-card" key={course.course_id}>
            <div className="course-image-wrapper">
              <img src={`http://localhost/coducation_backend/uploads/courses/${course.courseImg}`} className="course-image" alt={course.title} />
            </div>
            <div className="course-content">
              <h5 className="course-title">{course.title}</h5>
              <p className="course-author">{course.author}</p>
              <div className="course-stats">
                <span className="course-students">
                  <BsPeople className="icon" /> {course.num_students} students
                </span>
                <span className="course-rating">
                  <FaStar className="icon star" /> {course.rating}
                </span>
              </div>
              <Link to={`/paths/${course.path_id}/courses/${course.course_id}`} className="course-link">
                <button className="course-button">
                  <FiArrowUpRight className='arrow' />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EnrolledCourses;
