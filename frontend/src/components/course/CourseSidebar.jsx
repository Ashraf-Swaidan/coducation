import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import Sidebar from 'react-sidebar';
import './styles/CourseSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const CourseSidebar = ({ course, onModuleLessonSelect, selectedModuleIndex, selectedLessonIndex }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedLessonId, setSelectedLessonId] = useState(null);

    const handleModuleClick = (moduleIndex) => {
        onModuleLessonSelect(moduleIndex, 0);
        setSelectedLessonId(`${moduleIndex}-0`);
    };

    const handleLessonClick = (moduleIndex, lessonIndex) => {
        const lessonId = `${moduleIndex}-${lessonIndex}`;
        onModuleLessonSelect(moduleIndex, lessonIndex);
        setSelectedLessonId(lessonId);
    };

    return (
        <div>
            <button className="sidebar-toggle-button" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? (
                    <FontAwesomeIcon icon={faTimes} className="sidebar-icon" />
                ) : (
                    <FontAwesomeIcon icon={faBars} className="sidebar-icon" />
                )}
            </button>
            <div className={!sidebarOpen ? "hidden-vis" : ''}>
                <Sidebar
                    sidebar={
                        <Nav className="flex-column course-sidebar">
                            {course.map((module, moduleIndex) => (
                                <Nav.Item key={moduleIndex} className={`module-item ${selectedModuleIndex === moduleIndex ? 'active' : ''}`}>
                                    <Nav.Link onClick={() => handleModuleClick(moduleIndex)}>
                                        {module.title}
                                    </Nav.Link>
                                    <Nav className="flex-column lesson-list">
                                        {module.lessons.map((lesson, lessonIndex) => {
                                            const lessonId = `${moduleIndex}-${lessonIndex}`;
                                            return (
                                                <Nav.Item key={lessonIndex} className={`lesson-item ${selectedLessonId === lessonId ? 'active' : ''}`}>
                                                    <Nav.Link onClick={() => handleLessonClick(moduleIndex, lessonIndex)}>
                                                        {lesson.title}
                                                    </Nav.Link>
                                                </Nav.Item>
                                            );
                                        })}
                                    </Nav>
                                </Nav.Item>
                            ))}
                        </Nav>
                    }
                    open={sidebarOpen}
                    onSetOpen={setSidebarOpen}
                    pullRight
                >
                    {/* Content goes here */}
                </Sidebar>
            </div>
        </div>
    );
};

export default CourseSidebar;
