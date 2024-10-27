import React, { useState } from 'react';

const EditModuleForm = ({ modules, setModules }) => {
  // State for module title
  const [title, setTitle] = useState('');

  // Handle module title change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handle adding a new module
  const handleAddModule = () => {
    if (title.trim() !== '') {
      const newModule = {
        id: modules.length + 1,
        title: title,
        lessons: [], // Initialize lessons array for the module
      };
      setModules([...modules, newModule]);
      setTitle('');
    }
  };

  return (
    <div>
      <h3>Create New Module</h3>
      <div className="mb-3">
        <label htmlFor="moduleTitle" className="form-label">Module Title:</label>
        <input
          type="text"
          id="moduleTitle"
          value={title}
          onChange={handleTitleChange}
          className="form-control"
          required
        />
      </div>
      <button onClick={handleAddModule} className="btn btn-primary">Add Module</button>
    </div>
  );
};

export default EditModuleForm;
