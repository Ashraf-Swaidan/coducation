import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseSidebar from '../components/course/CourseSidebar';
import LessonContent from '../components/course/LessonContent';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../components/course/styles/CourseClass.css';

const CourseClass = () => {
    const { pathId, courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
    const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState(null);

    

    useEffect(() => {
        const fetchCourseContent = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost/coducation_backend/fetchCourseContent.php?courseId=${courseId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                console.log(response);
                setCourse(response.data);
            } catch (error) {
                console.error('Error fetching course content:', error);
            }
        };

        fetchCourseContent();
    }, [courseId]);

    useEffect(() => {
        if (course && course[selectedModuleIndex]) {
            setSelectedModule(course[selectedModuleIndex]);
            setSelectedLesson(course[selectedModuleIndex].lessons[selectedLessonIndex]);
        }
    }, [selectedModuleIndex, selectedLessonIndex, course]);

    const handleModuleLessonSelection = (moduleIndex, lessonIndex) => {
        setSelectedModuleIndex(moduleIndex);
        setSelectedLessonIndex(lessonIndex);
    };

    if (!course) {
        return <div>Loading...</div>;
    }
    console.log(course)
    return (
        <div id="page-container">
            <Navbar />
            <div id="content-wrap">
                <CourseSidebar
                    course={course}
                    onModuleLessonSelect={handleModuleLessonSelection}
                    selectedModuleIndex={selectedModuleIndex}
                    selectedLessonIndex={selectedLessonIndex}
                />
                {selectedLesson && <LessonContent module={selectedModule} lesson={selectedLesson} />}
            </div>
            <footer id="footer">
                <Footer />
            </footer>
        </div>
    );
};

export default CourseClass;
