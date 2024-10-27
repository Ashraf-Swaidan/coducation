import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import './pathStyles/PathChallenges.css';

const PathChallenges = ({ pathData }) => {
    const { challenges , pathHeader } = pathData;

    return (
        <div className="path-challenges-container">
            <h2 className="path-challenges-heading"> {`Challenges in ${pathHeader.title}`}</h2>
            <div className="challenges-list">
                {challenges.map((challenge) => (
                    <div className="challenge-item" key={challenge.challenge_id}>
                        <FaExclamationTriangle className="challenge-icon" />
                        <p className="challenge-text">{challenge.challenge_text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PathChallenges;
