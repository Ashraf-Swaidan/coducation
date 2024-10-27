import React, { useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi'; // Import the arrow icon
import { FaStar } from 'react-icons/fa'; // Import the star icon
import { BsPeople } from 'react-icons/bs'; // Import the people icon
import { Link } from 'react-router-dom';

const MentorCoursesOverview = ({ mentor, mentorCourses, pathId }) => {
    const dummyCourse = {
        id: -1, // Negative ID to differentiate it from actual courses
        title: 'Create New Course',
        mentor: 'You',
        image: '/Images/courses/create-course.webp', // Placeholder image
        numStudents: 0,
        rating: '-',
    };

    return (
        <div className="container">
            <h1>Your Popular Courses</h1>
            <h3>Keep up the good work!</h3>
            <div className="row">
                {mentorCourses.map(course => (
                    <div className="col-lg-4 col-md-4 mb-4 col-sm-6" key={course.course_id}>
                        <div className="card position-relative">
                            <img src={`http://localhost/coducation_backend/uploads/courses/${course.image_1}`} className="card-img-top" alt={course.title} />
                            <div className="card-body course-body">
                                <h5 className="card-title overflow-hidden">{course.title}</h5>
                                <p className="text-muted">You</p>
                                <span>
                                    <BsPeople className="text-muted me-1 mb-1" /> {course.numStudents} students enrolled
                                </span>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>
                                        <FaStar className="text-warning me-1 mb-1" /> {course.rating}
                                    </span>
                                    <div> 
                                    <Link to={`/paths/${pathId}/courses/${course.course_id}`}>
                                        <button className="btn btn-outline-secondary rounded-circle">
                                            <FiArrowUpRight className='arrow' />
                                        </button>
                                        </Link>
                                        <Link to={`/paths/${pathId}/${course.course_id}/edit-course`}>
                                        <button className='btn btn-outline-secondary mx-2'>
                                            Edit
                                        </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {/* Dummy card for creating a new course */}
                <div className="col-lg-4 col-md-4 mb-4 col-sm-6">
                    <div className="card position-relative">
                        <img src={`/../${dummyCourse.image}`} className="card-img-top" alt={dummyCourse.title} />
                        <div className="card-body course-body">
                            <h5 className="card-title overflow-hidden">{dummyCourse.title}</h5>
                            <p className="text-muted">{dummyCourse.mentor}</p>
                            <span>
                                <BsPeople className="text-muted me-1 mb-1" /> {dummyCourse.numStudents} students enrolled
                            </span>
                            <div className="d-flex justify-content-between align-items-center">
                                <span>
                                    <FaStar className="text-warning me-1 mb-1" /> {dummyCourse.rating}
                                </span>

                                <Link to={`/paths/${pathId}/create-course`}>
                                  <button className='btn btn-outline-secondary mx-2'>
                                    Create
                                </button>
                                </Link>
                              

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentorCoursesOverview;
