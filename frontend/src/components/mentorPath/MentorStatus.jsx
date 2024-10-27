import React from 'react';
import './styles/MentorStatus.css';
import { FaChalkboardTeacher, FaUsers, FaStar } from 'react-icons/fa';

const MentorStatus = ({ mentorData }) => {

   

    const {averageRating, totalCourses, studentEnrollments} = mentorData;
    const totalStudents = Object.values(studentEnrollments).reduce((sum, count) => parseInt(sum) + parseInt(count), 0);
 
    console.log(studentEnrollments);

    return (
        <div className="mentor-status-container py-3" style={{ backgroundColor: '#fff' }}>
           
            <div className="mentor-stats">
                <div className="mentor-stat">
                    <FaChalkboardTeacher className="mentor-icon" />
                    <p className="mentor-number">
                        You have {totalCourses} {totalCourses==1 ? 'Course!' : 'Courses!'}
                        </p>
                </div>
                <div className="mentor-stat">
                    <FaUsers className="mentor-icon" />
                    <p className="mentor-number">You taught {totalStudents} {totalStudents === 1 ? 'student' : 'students'}</p>
                </div>
                <div className="mentor-stat">
                    <FaStar className="mentor-icon" />
                    <p className="mentor-number">Your average rating: {averageRating} </p>
                </div>
            </div>
        </div>
    );
};

export default MentorStatus;
