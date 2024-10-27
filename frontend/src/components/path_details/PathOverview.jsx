import React from 'react';
import { BiCheckCircle } from 'react-icons/bi'; // Import Bootstrap Icons
import './pathStyles/PathOverview.css';

const PathOverview = ({ pathData }) => {
    const { objectives, pathHeader, keyFeatures, curriculum } = pathData;
    
    return (
        <div className="path-overview-container">
            <h2 className="section-title">Overview</h2>
            <div className="row">
                <div className="col-md-6">
                    <div className="overview-section">
                        <h3 className="subsection-title">Objectives</h3>
                        <ul className="overview-list">
                            {objectives.map((objective) => (
                                <li key={objective.objective_id}>
                                    <BiCheckCircle className="icon" /> {objective.objective_text}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="overview-section">
                        <h3 className="subsection-title">Key Features</h3>
                        <ul className="overview-list">
                            {keyFeatures.map((feature) => (
                                <li key={feature.feature_id}>
                                    <BiCheckCircle className="icon" /> {feature.feature_text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="overview-section">
                        <h3 className="subsection-title">Target Audience</h3>
                        <p>{pathHeader.target_audience}</p>
                    </div>
                    <div className="overview-section">
                        <h3 className="subsection-title">Curriculum</h3>
                        <ul className="overview-list">
                            {curriculum.map((course) => (
                                <li key={course.curriculum_id}>
                                    <BiCheckCircle className="icon" /> {course.curriculum_text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PathOverview;
