// CourseModules.jsx
import "./styles/CourseModules.css"

import React, { useState } from 'react';

const CourseModules = ({ course }) => {
    // State to track whether each module is expanded or collapsed
    const [expandedModules, setExpandedModules] = useState([]);
    const [allModulesExpanded, setAllModulesExpanded] = useState(false);

    // Function to toggle the visibility of module content
    const toggleModule = (index) => {
        const newExpandedModules = [...expandedModules];
        newExpandedModules[index] = !newExpandedModules[index];
        setExpandedModules(newExpandedModules);
    };

    const toggleAllModules = () => {
      if(allModulesExpanded){
        setExpandedModules(new Array(course.modules.length).fill(false));
      }else{
        setExpandedModules(new Array(course.modules.length).fill(true));
      }

      setAllModulesExpanded(!allModulesExpanded);
    }

    return (
        <div className="container modules-container mb-4 ">
            <h1>What's Inside</h1>
            <div className=" Num-modules d-flex flex-row justify-content-between align-items-center mb-2">
              <h4>This course contains {course.modules.length} modules</h4>
              { course.modules.length >0 && <button onClick={toggleAllModules} className="view-all-btn">View/Hide All</button>
                }
            </div>
            <div className="row">
                {course.modules.map((module, index) => (
                    <div key={index} className=" ">
                        <div className="module-container">
                            <div className="module-header">
                                <button className="module-btn" onClick={() => toggleModule(index)}>
                                    {expandedModules[index] ? '-' : '>'}
                                </button>
                                <h4 className="module-title">{index}. {module.title}</h4>
                                <span className="module-lesson-count">{module.lessons.length} lessons</span>
                            </div>
                            {/* Conditionally render lesson list based on module's expanded state */}
                            {expandedModules[index] && (
                                <div className="lesson-list mt-3">
                                    {module.lessons.map((lesson, lessonIndex) => (
                                        <div key={lessonIndex} className="lesson">
                                            {/* Lesson title */}
                                            <p className="lesson-title">{}{lessonIndex}. {lesson.title}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default CourseModules;
