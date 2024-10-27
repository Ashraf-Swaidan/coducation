import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import './styles/CoursePreview.css';


const CoursePreview = ({ mentor }) => {

    

    return (
        <div className="container">
            <h1>Meet Your Mentor</h1>
            <div className="row align-items-center">
                <div className="col-md-4">
                    <div className="mentor-profile mb-3">
                        <img src={
                            mentor.profile_picture ?
                            `http://localhost/coducation_backend/uploads/pfps/${mentor.profile_picture}`
                        :
                            '/Images/profilePlaceholder.png'
                        } alt={mentor.full_name} className="img-fluid" />
                    </div>
                </div>
                <div className="col-md-8">
                    <h1>{mentor.full_name}</h1>
                    <p className="mentor-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis architecto a praesentium, illum necessitatibus possimus ducimus voluptate perspiciatis maxime vel.</p>
                    <div className="mentor-social-icons">
                        <a href={''} target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                        <a href={''} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                        <a href={''} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePreview;
