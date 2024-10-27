import React, {useState, useEffect} from 'react';
import './pathStyles/PathHeader.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
const PathHeader = ({ pathHeader, userType, userId }) => {

    const { title, image, path_id, headerDesc } = pathHeader;
    const [joined, setJoined] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [pathStats, setPathStats] = useState({ numCourses: 0, numMentors: 0, numStudents: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost/coducation_backend/fetchPathStats.php?pathId=${path_id}`);
                setPathStats(response.data);
            } catch (error) {
                console.error('Error fetching path stats:', error);
            }
        };

        fetchData();
    }, [path_id,joined]);
    

    useEffect(() => {
        const checkUserJoined = async () => {
            try {
                const response = await axios.post('http://localhost/coducation_backend/check_user_joined.php', {
                    userId: userId,
                    pathId: path_id
                });
                setJoined(response.data.joined);
            } catch (error) {
                console.error('Error checking if user joined:', error);
            }
        };

        checkUserJoined();
    }, [userId, path_id]);

    const joinPath = async () => {
        const data = {
            userId: userId,
            pathId: path_id,
            userType: userType
        };

        await axios.post('http://localhost/coducation_backend/joinPath.php', data)
            .then(response => {
                console.log(response.data);
                
                // Handle success or display a message to the user
            })
            .catch(error => {
                console.error('Error joining path:', error);
                // Handle error or display an error message to the user
            });
    };

    const handleLeavePath = async () => {
        setShowConfirmModal(true);
    };

    const confirmLeavePath = async () => {
        try {
            const response = await axios.post('http://localhost/coducation_backend/delete_relation.php', {
                userId: userId,
                pathId: path_id,
                userType: userType
            });
            if (response.data.success) {
                console.log("Left path successfully");
                setJoined(false);
                setShowConfirmModal(false);
                // Handle success or display a message to the user
            } else {
                console.error("Failed to leave path");
                // Handle failure or display an error message to the user
            }
        } catch (error) {
            console.error('Error leaving path:', error);
            // Handle error or display an error message to the user
        }
    };

    return (
        <div className="path-header-container" style={{ backgroundImage: `url('http://localhost/coducation_backend/uploads/${image}')` }}>
            <div className="overlay">
                <div className="header-content">
                    <h1 className="path-title">{title}</h1>
                    <p className="path-description">{headerDesc}</p>
                    <div className="path-stats">
                        <p>{pathStats.numCourses} Courses</p>
                        <p>{pathStats.numMentors} Mentors</p>
                        <p>{pathStats.numStudents} Students</p>
                    </div>
                    <div className="action-buttons">
                    {!joined && userType === 'student' && (
                            <NavLink to={`/paths/${path_id}/courses`}>
                                <button className="join-path-btn" onClick={joinPath}>Join Path</button>
                            </NavLink>
                        )}
                        {!joined && userType === 'mentor' && (
                            <NavLink to={`/paths/${path_id}/dashboard`}>
                                <button className="teach-path-btn" onClick={joinPath}>Teach in this Path</button>
                            </NavLink>
                        )}

                        {joined && userType === 'student' && (
                            <NavLink to={`/paths/${path_id}/courses`}>
                                <button className="join-path-btn" >Go to Path Courses</button>
                            </NavLink>
                        )}

                        {joined && userType === 'mentor' && (
                            <NavLink to={`/paths/${path_id}/dashboard`}>
                                <button className="join-path-btn" >Go to Path Dashboard</button>
                            </NavLink>
                        )}
                        {joined && (
                             <div>
                             {/* Other code... */}
                             <Button className="leave-path-btn " onClick={handleLeavePath}>Leave Path</Button>
                             <Modal centered show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                                 <Modal.Header closeButton>
                                     <Modal.Title>Confirm Leaving Path</Modal.Title>
                                 </Modal.Header >
                                 <Modal.Body>
                                     Leaving will drop you out of every course within this path, are you still sure you want to leave this path? 
                                 </Modal.Body>
                                 <Modal.Footer>
                                     <Button variant="" onClick={() => setShowConfirmModal(false)}>Cancel</Button>
                                     <Button variant="danger" onClick={confirmLeavePath}>Leave Path</Button>
                                 </Modal.Footer>
                             </Modal>
                         </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PathHeader;
