import React, { useState, useEffect } from 'react';
import './styles/CourseHeader.css';
import { FaStar, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
const CourseHeader = ({ course, pathId, courseId, mentor, userInfo }) => {
    const [enrolled, setEnrolled ]= useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    
    useEffect(() => {
        const fetchCourseEnrollement = async () => {
            try {
                const token = localStorage.getItem('token');
                
                // Fetch course details
                const enrolledResponse = await axios.get(`http://localhost/coducation_backend/checkCourseEnroll.php?courseId=${courseId}&userId=${userInfo.userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if(enrolledResponse.data){
                    setEnrolled(true);
                }else{
                    setEnrolled(false);
                }
                console.log(enrolledResponse);
                
                

                
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourseEnrollement();
    }, [userInfo, course]);

   
    const enrollCourse = async () => {
        try {
            const response = await axios.post('http://localhost/coducation_backend/enrollCourse.php', {
                courseId,
                userId: userInfo.userId
            });

            console.log(response);
            
            if (response.data.success) {
                setEnrolled(true);
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const leaveCourse = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost/coducation_backend/leaveCourse.php', {
                courseId,
                userId: userInfo.userId
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                setEnrolled(false);
                setShowConfirmModal(false);
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLeaveCourse = async () => {
        setShowConfirmModal(true);
    };

   
  console.log(enrolled);
    return (
        <div className='container-fluid bg-light'>
            <div className="container py-5">
                <div className="row align-items-center courseDetailsCont">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <img src={`http://localhost/coducation_backend/uploads/courses/${course.image_1}`} className="img-fluid rounded" alt={course.title} />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <h1 className="display-4 fw-bold">{course.title}</h1>
                        <p className="lead">{mentor.full_name}</p>
                        <div className="d-flex align-items-center ">
                            <span className="me-2 mb-1"><FaStar className="text-warning" /></span>
                            <span className="fw-bold">{course.rating}</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="me-2"><FaUsers className="text-primary" /></span>
                            <span className="fw-bold">{course.numStudents.num_students} students enrolled</span>
                        </div>
                        
                        <div className='d-flex align-items-center mt-2 '>

                        { enrolled==false && userInfo && userInfo.userType == 'student' &&
                            <Link to={`/paths/${pathId}/courses/${courseId}/class`}>
                                <button onClick={enrollCourse} className='enroll-btn'> Enroll </button>
                            </Link>
                        
                         }

                        { enrolled==true && userInfo && userInfo.userType == 'student' &&
                            <>
                           
                                    <button onClick={handleLeaveCourse} className='leave-btn'> Leave Course</button>

                                    <Modal centered show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                                 <Modal.Header closeButton>
                                     <Modal.Title>Confirm Leaving Course</Modal.Title>
                                 </Modal.Header >
                                 <Modal.Body>
                                      Are you sure you want to leave this course? 
                                 </Modal.Body>
                                 <Modal.Footer>
                                     <Button variant="" onClick={() => setShowConfirmModal(false)}>Cancel</Button>
                                     <Link to={`/paths/${pathId}/courses`}>
                                     <Button variant="danger" onClick={leaveCourse}>Leave </Button>
                                    </Link>

                                 </Modal.Footer>
                             </Modal>
                             
                              
                            <Link to={`/paths/${pathId}/courses/${courseId}/class`}>
                                    <button className='enroll-btn mx-2'> Go to Course </button>
                                </Link></>
                            }

                        { userInfo && userInfo.userType == 'mentor' && userInfo.userId == course.mentor_id && <Link to={`/paths/${pathId}/${courseId}/edit-course`}>
                                <button className='enroll-btn'> Edit Course </button>
                            </Link>
                            }
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseHeader;


