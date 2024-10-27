import React from 'react';
import StudentFeedbackCard from './StudentFeedbackCard ';

const CourseFeedbacks = ({ feedbacks }) => {
    console.log(feedbacks);

    return (
        <div className="container mt-5">
            <h2>Student Feedbacks</h2>
            <div className="row">
                {feedbacks.length > 0 ? (
                    feedbacks.map((feedback) => (
                        <div className='col-4' key={feedback.id} >
                        <StudentFeedbackCard 
                            key={feedback.id} 
                            student={feedback.student} 
                            comment={feedback.comment} 
                        />
                        </div>
                    ))
                ) : (
                    <p>No feedbacks available.</p>
                )}
            </div>
        </div>
    );
};

export default CourseFeedbacks;
