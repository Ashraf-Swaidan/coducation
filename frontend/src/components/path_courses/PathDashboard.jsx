import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';

const PathDashboard = ({ pathHeader, courses }) => {
    const { userInfo } = useContext(AuthContext);
    const [mentors, setMentors] = useState({});
    console.log(mentors);

    useEffect(() => {
        // Function to fetch mentor details for each course
        const fetchMentorDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const mentorIds = courses.map(course => course.mentor_id).join(',');
                const response = await axios.get(`http://localhost/coducation_backend/fetchCourseMentor.php?mentorIds=${mentorIds}`,{ headers : {
                    'Authorization' : `Bearer ${token}`
                } } );
                setMentors(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMentorDetails();
    }, [courses]);

    // Function to get mentor's full name
    const getMentorFullName = mentorId => {
        if (mentors[mentorId]) {
            return mentors[mentorId].fullName;
        }
        return '';
    };

    // Extracting featured courses from the path data
    const featuredCourses = courses.slice(0, 3);

    return (
        <div className="container mt-5">
            {/* Welcome Section */}
            <div className="jumbotron jumbotron-fluid mb-5">
                <div className="container">
                    <h1 className="display-4">{pathHeader.title} Dashboard</h1>
                    {userInfo && <p className="lead">Welcome back, {userInfo.fullName}!</p>}
                </div>
            </div>

            {/* Featured Courses */}
            <div className="row mb-5">
                <h2>Featured Courses</h2>
                {featuredCourses.map(course => (
                    <div className="col-md-4" key={course.course_id}>
                        <div className="card mb-4">
                            <img src={`http://localhost/coducation_backend/uploads/courses/${course.image_1}`} className="card-img-top" alt={course.title} />
                            <div className="card-body">
                                <h5 className="card-title">{course.title}</h5>
                                <p className="card-text">Mentor: {getMentorFullName(course.mentor_id)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PathDashboard;
