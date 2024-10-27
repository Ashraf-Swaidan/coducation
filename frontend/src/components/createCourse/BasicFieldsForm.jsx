import React, { useState } from 'react';

const BasicFieldsForm = ({ courseData,setCourseData }) => {
  // State for form fields
  // const [courseData, setCourseData] = useState({
  //   title: '',
  //   description: '',
  //   image: null,
  //   subImage: null,
  // });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setCourseData({ ...courseData, image: file });
  };

  // Handle sub-image upload
  const handleSubImageUpload = (e) => {
    const file = e.target.files[0];
    setCourseData({ ...courseData, subImage: file });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset form fields after submission
    setCourseData({
      title: '',
      description: '',
      image: null,
      subImage: null,
    });
  };

  return (
    <div className="col-12 mb-5">
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Course Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Course Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="subImage" className="form-label">Sub Image:</label>
          <input
            type="file"
            id="subImage"
            name="subImage"
            accept="image/*"
            onChange={handleSubImageUpload}
            className="form-control"
          />
        </div>
        
      </form>
    </div>
  );
};

export default BasicFieldsForm;
