import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseHeader from '../components/course_details/CourseHeader';
import CourseDescription from '../components/course_details/CourseDescription';
import CourseFeedbacks from '../components/course_details/CourseFeedbacks';
import CoursePreview from '../components/course_details/CoursePreview';
import CoursePrerequisites from '../components/course_details/CoursePrerequisites';
import CourseModules from '../components/course_details/CourseModules';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const CourseDetails = () => {
    const { pathId, courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [mentor, setMentor] = useState(null);
    const [prerequisites, setPrerequisites] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const {userInfo} = useContext(AuthContext);
    const {userId} = useContext(AuthContext);
    

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                
                // Fetch course details
                const courseResponse = await axios.get(`http://localhost/coducation_backend/fetchCourseDetails.php?courseId=${courseId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setCourse(courseResponse.data);
                

                // Fetch mentor details
                const mentorId = courseResponse.data.mentor_id;
                const mentorResponse = await axios.get(`http://localhost/coducation_backend/basic/fetchMentorDetails.php?mentorId=${mentorId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setMentor(mentorResponse.data);

                // Fetch prerequisites
                const prerequisitesResponse = await axios.get(`http://localhost/coducation_backend/basic/fetchCoursePrerequisites.php?courseId=${courseId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setPrerequisites(prerequisitesResponse.data);

                // Fetch feedbacks
                const feedbacksResponse = await axios.get(`http://localhost/coducation_backend/basic/fetchCourseFeedbacks.php?courseId=${courseId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setFeedbacks(feedbacksResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    if (!course || !mentor) {
        return <div>Loading...</div>;
    }

    console.log(course);
    console.log(mentor);
    console.log(prerequisites);
    console.log(feedbacks);
    console.log(userInfo)

    return (
        <div id="page-container">
            <Navbar />
            <div id="content-wrap">
                <CourseHeader course={course} pathId={pathId} courseId={courseId} mentor={mentor} userInfo={userInfo} />
                <CourseDescription course={course} mentor={mentor}  />
                <CourseModules course={course} />
                <CoursePreview  mentor={mentor} />
                <CoursePrerequisites prerequisites={prerequisites} />
                
                <CourseFeedbacks feedbacks={feedbacks} />
            </div>
            <footer id="footer">
                <Footer/>
            </footer>
        </div>
    );
};

export default CourseDetails;
