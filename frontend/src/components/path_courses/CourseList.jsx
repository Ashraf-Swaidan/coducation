import React, { useState, useEffect } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';
import './courseStyles/CourseList.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CourseList = ({ pathHeader, courses }) => {
    const { path_id } = pathHeader;
    const [searchQuery, setSearchQuery] = useState('');
    const [mentors, setMentors] = useState({});
    const [numStudents, setNumStudents] = useState({});

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
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };

        // Function to fetch number of students enrolled in each course
        const fetchNumStudents = async () => {
            try {
                const courseIds = courses.map(course => course.course_id).join(',');
                const response = await axios.get(`http://localhost/coducation_backend/fetchNumStudents.php?courseIds=${courseIds}`);
                setNumStudents(response.data);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMentorDetails();
        fetchNumStudents();
    }, [courses]);

    // Function to get mentor's full name
    const getMentorFullName = mentorId => {
        if (mentors[mentorId]) {
            return mentors[mentorId].fullName;
        }
        return '';
    };

    // Function to get number of students enrolled in a course
    const getNumStudentsEnrolled = courseId => {
        if (numStudents[courseId]) {
            return numStudents[courseId];
        }
        return 0;
    };

    // Filter the courses based on the search query
    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            <h2>Available Courses</h2>
            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control " 
                    placeholder="Search courses..." 
                    aria-label="Search courses" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-outline-secondary clear " type="button" onClick={() => setSearchQuery('')}>Clear</button>
            </div>
            <div className="row">
                {filteredCourses.map(course => (
                    <div className="col-lg-4 col-md-4 mb-4 col-sm-6" key={course.course_id}>
                        <div className="card position-relative">
                            <img src={`http://localhost/coducation_backend/uploads/courses/${course.image_1}`} className="card-img-top" alt={course.title} />
                            <div className="card-body course-body">
                                <h5 className="card-title overflow-hidden">{course.title}</h5>
                                <p className="text-muted">{getMentorFullName(course.mentor_id)}</p>
                                <span>
                                    <BsPeople className="text-muted me-1 mb-1" /> {getNumStudentsEnrolled(course.course_id)} students enrolled
                                </span>
                                <div className="d-flex justify-content-between align-items-center">   
                                    <span>
                                        <FaStar className="text-warning me-1 mb-1" /> {course.rating}
                                    </span>
                                    <Link to={`/paths/${path_id}/courses/${course.course_id}`}> 
                                    <button className="btn btn-outline-secondary rounded-circle">
                                        <FiArrowUpRight className='arrow'/>
                                    </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseList;
