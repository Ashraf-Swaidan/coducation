import React, { useState } from 'react';

const ModuleForm = ({ modules, setModules }) => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddModule = () => {
    if (title.trim() !== '') {
      const newModule = {
        module_id: modules.length + 1, // Use module_id
        title: title,
        lessons: [], 
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

export default ModuleForm;
