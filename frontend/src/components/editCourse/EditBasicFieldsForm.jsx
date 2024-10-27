import React, { useState, useEffect } from 'react';

const EditBasicFieldsForm = ({ course, onSubmit }) => {
  // State for form fields
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    image: '',
    subImage: '',
  });

  // useEffect to update form data when course prop changes
  useEffect(() => {
    if (course) {
      setCourseData({
        title: course.title,
        description: course.description,
        image: course.image,
        subImage: course.subImage,
      });
    }
  }, [course]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  // Handle image file changes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setCourseData({ ...courseData, image: reader.result });
      };
    }
  };

  // Handle subImage file changes
  const handleSubImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setCourseData({ ...courseData, subImage: reader.result });
      };
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass form data to parent component for submission
    onSubmit(courseData);
  };

  return (
    <div className="col-12 mb-5">
      <h2>Edit Course Details</h2>
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
            accept="image/*"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="subImage" className="form-label">Sub Image:</label>
          <input
            type="file"
            accept="image/*"
            id="subImage"
            name="subImage"
            onChange={handleSubImageChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditBasicFieldsForm;
