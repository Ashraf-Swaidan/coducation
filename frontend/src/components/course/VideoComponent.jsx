import React from 'react';

const VideoComponent = ({ url }) => {
    return (
        <div className="video-container">
            <video controls>
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoComponent;
