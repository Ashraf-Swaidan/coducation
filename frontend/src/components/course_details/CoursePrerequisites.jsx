import React from 'react';

const CoursePrerequisites = ({ prerequisites }) => {
  
    return (
        <div className="container mt-4">
            <h1 className="mb-4">Prerequisites</h1>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {prerequisites.map((prerequisite) => (
                    <div key={prerequisite.prerequisites_id} className="col">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{prerequisite.title}</h5>
                                <p className="card-text">{prerequisite.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {prerequisites.length==0 && 
                    <div className='col'>
                         <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">No Prerequisites</h5>
                                <p className="card-text">You are ready to go!</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default CoursePrerequisites;
