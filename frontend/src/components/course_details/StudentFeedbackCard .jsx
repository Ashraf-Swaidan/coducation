import React from 'react';
import './styles/StudentFeedbackCard.css';

const StudentFeedbackCard = ({ student, comment }) => {
    console.log(student, comment);
    return (
        <div className="card mb-3 quote-card">
            <div className="card-body d-flex align-items-center">
                <div className="profile-img">
                    
                    <img 
                        src={student.profile_picture ? `http://localhost/coducation_backend/uploads/pfps/${student.profile_picture}`: '/Images/profilePlaceholder.png'} 
                        alt={student.full_name} 
                        className="rounded-circle" 
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                    /> 
                </div>
                <div className="quote-content">
                    <div className="quote-icon">
                        <i className="fas fa-quote-left"></i>
                    </div>
                    <p className="quote-text">{comment}</p>
                    <p className="quote-author">{student.full_name}</p>
                </div>
            </div>
        </div>
    );
};

export default StudentFeedbackCard;
