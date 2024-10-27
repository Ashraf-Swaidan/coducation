import React from 'react';

const CourseDescription = ({ course, mentor }) => {
    return (
        <div className="container py-4">
            <div className="row">
                <div className="col-md-6">
                    <figure>
                      <blockquote className='blockquote'>
                        <h1>"{course.description}"</h1>
                      </blockquote>
                      <figcaption className='blockquote-footer'>
                          {mentor.full_name}
                      </figcaption>
                    </figure>
                    
                </div>
                <div className="col-md-6">
                    {course.image_2 && (
                        <img src={`http://localhost/coducation_backend/uploads/courses/${course.image_2}`} className="img-fluid" alt={`${course.title} Sub-Image`} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseDescription;
