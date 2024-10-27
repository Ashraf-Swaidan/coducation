import React, { useState } from 'react';
import { MdDeleteSweep, MdEdit } from "react-icons/md";
import './styles/EditPrerequisitesForm.css';

const EditPrerequisitesForm = ({ prerequisites, onSubmit }) => {
  // State for editing mode and form fields
  const [editingIndex, setEditingIndex] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [addingReq, setAddingReq] = useState(false);
  const [NewReqTitle, setNewReqTitle] = useState('');
  const [NewReqDescription, setNewReqDescription] = useState('');
  const triggerNewReq = () => {
    setAddingReq(addingReq => !addingReq);
  }

  const handleNewTitleChange = (e)=> {
    setNewReqTitle(e.target.value);
  }

  const handleNewDescriptionChange = (e) => {
    setNewReqDescription(e.target.value);
  }

  const addPrerequisite = () => {
    console.log('Function called for new requisite')
  }
  // Handle form input changes
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handle adding or editing prerequisite
  const addOrEditPrerequisite = () => {
    if (title.trim() !== '' && description.trim() !== '') {
      if (editingIndex !== null) {
        // If editing, update the existing prerequisite
        const updatedPrerequisites = [...prerequisites];
        updatedPrerequisites[editingIndex] = { title, description };
        onSubmit(updatedPrerequisites);
        setEditingIndex(null);
      } else {
        // If not editing, add a new prerequisite
        onSubmit([...prerequisites, { title, description }]);
      }
      // Reset form fields
      setTitle('');
      setDescription('');
    }
  };

  // Handle editing prerequisite
  const editPrerequisite = (index) => {
    if (editingIndex === index) {
      // If already editing, collapse the accordion
      setEditingIndex(null);
    } else {
      const { title, description } = prerequisites[index];
      setTitle(title);
      setDescription(description);
      setEditingIndex(index);
    }
  };

  // Handle removing prerequisite
  const removePrerequisite = (index) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites.splice(index, 1);
    onSubmit(updatedPrerequisites);
  };

  // Handle opening new prerequisite placeholder
  const openNewPrerequisite = () => {
    setTitle('');
    setDescription('');
    setEditingIndex(prerequisites.length); // Set index to one greater than the last index
  };

  return (
    <div className="edit-prerequisites-form">
      <h2>Edit Prerequisites</h2>
      <div className="prerequisites-list">
        {/* Placeholder for adding new prerequisite */}
        <div className="prerequisite-item" onClick={openNewPrerequisite}>
          <div className="prerequisite-header" onClick={() => {triggerNewReq()}}>
            <span className="prerequisite-title">Add New Prerequisite</span>
          </div>
          { addingReq && 
          <div className="prerequisite-description">
                <input type="text" value={NewReqTitle} onChange={handleNewTitleChange} placeholder="Title" className="form-control" />
                <textarea value={NewReqDescription} onChange={handleNewDescriptionChange} placeholder="Description" className="form-control"></textarea>
                <button onClick={addPrerequisite} className="btn btn-primary">Save</button>
              </div> }


        </div>
        {/* Render existing prerequisites */}
        {prerequisites.map((prerequisite, index) => (
          <div key={index} className="prerequisite-item">
            <div className="prerequisite-header" onClick={() => editPrerequisite(index)}>
              <span className="prerequisite-title">{prerequisite.title}</span>
              <div className="prerequisite-buttons">
                <button className="edit-button"><MdEdit /></button>
                <button className="delete-button" onClick={() => removePrerequisite(index)}><MdDeleteSweep /></button>
              </div>
            </div>
            {editingIndex === index && (
              <div className="prerequisite-description">
                <input type="text" value={title} onChange={handleTitleChange} placeholder="Title" className="form-control" />
                <textarea value={description} onChange={handleDescriptionChange} placeholder="Description" className="form-control"></textarea>
                <button onClick={addOrEditPrerequisite} className="btn btn-primary">Save</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditPrerequisitesForm;
