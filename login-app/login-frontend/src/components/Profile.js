import React, { useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('profileImage', profileImage);
    formData.append('name', name);
    formData.append('contactNumber', contactNumber);
    formData.append('email', email);
    formData.append('companyName', companyName);

    try {
      const response = await axios.post('YOUR_BACKEND_URL_HERE', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Profile saved successfully', response.data);
      // Handle success, e.g., display a success message or redirect
    } catch (error) {
      console.error('Error saving profile', error);
      // Handle error, e.g., display an error message
    }
  };

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="profileImage">Profile Image:</label>
          <input type="file" id="profileImage" onChange={handleImageUpload} />
          {profileImage && <img src={URL.createObjectURL(profileImage)} alt="Profile" className="profile-image-preview" />}
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="text"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Profile;
