import React, { useState } from 'react';
import axios from 'axios';
import './styles/UserProfile.css'; // Import the new CSS file for custom styles

const UserProfile = ({ userData, userInfo }) => {
  const { full_name: initialFullName, email: initialEmail, date_of_birth: initialDateOfBirth } = userData;
  const { userId, userType } = userInfo;

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(initialFullName);
  const [email, setEmail] = useState(initialEmail);
  const [dateOfBirth, setDateOfBirth] = useState(initialDateOfBirth);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [Error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password == confirmPassword){
      setConfirmed(true);
    }

    if(!Error){
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('password', password);
    formData.append('userType', userType);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost/coducation_backend/updateUserProfile.php', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsEditing(false); 
      setConfirmed(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  }
  };

  const handleConfirm =(e)=> {
    setConfirmPassword(e.target.value);
    if(e.target.value !== password){
      setError(true);
    }else{
      setError(false);
    }
  }


  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={userData.profile_picture ? `http://localhost/coducation_backend/uploads/pfps/${userData.profile_picture}` : '/Images/profilePlaceholder.png'} alt="Profile" className="profile-image" />
        <h2>{isEditing ? "Edit Profile" : "User Profile"}</h2>
        {!isEditing && (
          <button className="btn profile-edit-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          {isEditing ? (
            <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          ) : (
            <p>{fullName}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          {isEditing ? (
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          ) : (
            <p>{email}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          {isEditing ? (
            <input type="date" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
          ) : (
            <p>{dateOfBirth}</p>
          )}
        </div>
        {isEditing && (
          <>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group">
              {Error && <p>Passwords do not match dude!</p>}
              {Error==false &&  <p>Passwords match :D</p>}
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirm} />
            </div>
            <div className="form-group">
              <label htmlFor="profilePicture">Profile Picture</label>
              <input type="file" id="profilePicture" onChange={(e) => setProfilePicture(e.target.files[0])} />
            </div>
          </>
        )}
        {isEditing && (
          <button type="submit" className="btn save-button">Save Changes</button>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
