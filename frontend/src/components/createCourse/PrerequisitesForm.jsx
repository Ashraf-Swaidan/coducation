import React, { useEffect, useState } from 'react';
import { MdDeleteSweep, MdEdit } from "react-icons/md";

const PrerequisitesForm = ({ prerequisites, setPrerequisites }) => {
  // State for prerequisites

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Handle form input changes
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };



  // Handle adding prerequisite
  const addPrerequisite = () => {
    if (title.trim() !== '' && description.trim() !== '') {
      if (editingIndex !== null) {
        // If editing, update the existing prerequisite
        const updatedPrerequisites = [...prerequisites];
        updatedPrerequisites[editingIndex] = { title, description };
        setPrerequisites(updatedPrerequisites);
        setEditingIndex(null);
      } else {
        // If not editing, add a new prerequisite
        setPrerequisites([...prerequisites, { title, description }]);
      }
      setTitle('');
      setDescription('');
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset form fields after submission
    setPrerequisites([]);
    setTitle('');
    setDescription('');
  };

  // Handle editing prerequisite
  const editPrerequisite = (index) => {
    const { title, description } = prerequisites[index];
    setTitle(title);
    setDescription(description);
    setEditingIndex(index);
  };

  // Handle removing prerequisite
  const removePrerequisite = (index) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites.splice(index, 1);
    setPrerequisites(updatedPrerequisites);
  };

  return (
    <div className="col-12">
      <h2>Add Prerequisites</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="prerequisiteTitle" className="form-label">Title:</label>
          <input
            type="text"
            id="prerequisiteTitle"
            value={title}
            onChange={handleTitleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="prerequisiteDescription" className="form-label">Description:</label>
          <textarea
            id="prerequisiteDescription"
            value={description}
            onChange={handleDescriptionChange}
            className="form-control"
            required
          ></textarea>
        </div>
        {editingIndex !== null ? (
          <button type="button" onClick={addPrerequisite} className="btn btn-primary me-2">Save</button>
        ) : (
          <button type="button" onClick={addPrerequisite} className="btn btn-primary me-2">Add Prerequisite</button>
        )}
        <button type="submit" className="btn btn-success mt-3">Submit Prerequisites</button>
      </form>
      <div className="mt-3">
        {prerequisites.length > 0 && (
          <div>
            <h4>Added Prerequisites:</h4>
            <ul>
              {prerequisites.map((prerequisite, index) => (
                <li key={index}>
                  <strong>{prerequisite.title}:</strong> {prerequisite.description}
                  <button className="edit-preq-btn ms-2" onClick={() => editPrerequisite(index)}><MdEdit /></button>
                  <button className="delete-preq-btn ms-2" onClick={() => removePrerequisite(index)}><MdDeleteSweep/> </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrerequisitesForm;
