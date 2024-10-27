import React from "react";

import "./Action.css";
import { NavLink , Link } from "react-router-dom";

const Action = () => {
  return (
    <section className="action-section">
      <div className="container">
        <div className="row">
          {/* Student Section */}

          <div className="col-md-6">
            <div className="action-card">
              <img src="../Images/student.png" alt="Student" className="action-image" />
              <div className="action-content">
                <h2>Students</h2>
                <p>
                  Welcome, future programmers! Ready to embark on your learning journey? Head over to the Paths page to explore various programming paths and access courses tailored to your goals.
                </p>
                <NavLink to='/paths' >
                <button className="btn btn-primary ">Explore Paths</button>
                </NavLink>

              </div>
            </div>
          </div>
          
          {/* Mentor Section */}
          <div className="col-md-6">
            <div className="action-card">
              <img src="../Images/mentor.png" alt="Mentor" className="action-image" />
              <div className="action-content">
                <h2>Mentors</h2>
                <p>
                  Calling all mentors! Want to share your expertise and contribute to our community? Navigate to the Paths page to choose a path where you can create and manage courses for aspiring programmers.
                </p>

                <NavLink to='/paths' >
                <button className="btn btn-secondary ">Choose a Path</button>
                </NavLink>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Action;
