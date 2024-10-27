import React, { useState, useEffect } from 'react';
import { BsPeople, BsStarFill } from 'react-icons/bs';
import './pathStyles/PopularCourses.css';
import axios from 'axios';

const PopularCourses = ({ pathData }) => {
    const { courses } = pathData;

    const [mentors, setMentors] = useState({});
    const [numStudents, setNumStudents] = useState({});
    const [feedbacks, setFeedbacks] = useState({}); // Changed to an object

    useEffect(() => {
        const fetchMentorDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const mentorIds = courses.map(course => course.mentor_id).join(',');
                const response = await axios.get(`http://localhost/coducation_backend/fetchCourseMentor.php?mentorIds=${mentorIds}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setMentors(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchCourseFeedbacks = async () => {
            try {
                const courseIds = courses.map(course => course.course_id).join(',');
                const response = await axios.get(`http://localhost/coducation_backend/fetchCourseFeedbacks.php?courseIds=${courseIds}`);
                setFeedbacks(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchNumStudents = async () => {
            try {
                const courseIds = courses.map(course => course.course_id).join(',');
                const response = await axios.get(`http://localhost/coducation_backend/fetchNumStudents.php?courseIds=${courseIds}`);
                setNumStudents(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCourseFeedbacks();
        fetchMentorDetails();
        fetchNumStudents();
    }, [courses]);

    const getMentorFullName = mentorId => mentors[mentorId]?.fullName || '';

    const getNumStudentsEnrolled = courseId => numStudents[courseId] || 0;

    const getCourseFeedbacks = courseId => feedbacks[courseId] || [];

    return (
        <div className="popular-courses-container">
            <h2 className="popular-courses-heading">Popular Courses</h2>
            <div className="row">
                {courses && courses.map((course) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={course.course_id}>
                        <div className="card h-100 shadow-sm">
                            <img src={`http://localhost/coducation_backend/uploads/courses/${course.image_1}`} className="card-img-top" alt={course.title} />
                            <div className="card-body">
                                <h5 className="card-title">{course.title}</h5>
                                <p className="card-text text-muted mb-2"><BsPeople /> {getMentorFullName(course.mentor_id)}</p>
                                <p className="card-text text-muted mb-2"><BsPeople /> {getNumStudentsEnrolled(course.course_id)} {getNumStudentsEnrolled(course.course_id) === 1 ? 'Student' : 'Students'} Enrolled</p>
                                <p className="card-text text-muted mb-2"><BsStarFill /> Rating: {course.rating}</p>
                                
                                {getCourseFeedbacks(course.course_id).length > 0 && (
                                    <>
                                        <h6 className="card-subtitle mb-2 text-muted">Feedbacks:</h6>
                                        <ul className="list-group list-group-flush">
                                            {getCourseFeedbacks(course.course_id).map((feedback) => (
                                                <li key={feedback.id} className="list-group-item border-0">{feedback.comment}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularCourses;
