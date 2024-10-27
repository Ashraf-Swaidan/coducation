import React from 'react';

const ProfileHeader = ({ student }) => {
  return (
    <div className="profile-header">
      <img src={student.profilePicture} alt={student.fullName} className="profile-picture" />
      <h2 className="full-name">{student.fullName}</h2>
    </div>
  );
};

export default ProfileHeader;
