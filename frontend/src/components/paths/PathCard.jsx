// PathCard.jsx
import React from 'react';
import './PathCard.css';
import { Link } from 'react-router-dom';
const PathCard = ({id, title, description, imagePath }) => {
    return (
        <div className="path-card card">
            <img src={imagePath} alt={title} className="card-img-top" />
            <div className="card-body d-flex flex-column">
                <h3 className="card-title">{`${title} Path`}</h3>
                <p className="card-text flex-grow-1">{description}</p>
                <Link to={`/paths/${id}`} className="btn btn-primary explore-button" >Explore</Link>
            </div>
        </div>
    );
};

export default PathCard;
