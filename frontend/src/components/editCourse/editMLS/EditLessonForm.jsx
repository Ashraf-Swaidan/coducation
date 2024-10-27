import React, { useState } from 'react';

const EditLessonForm = ({ modules, setModules }) => {
  // State for lesson title and selected module
  const [title, setTitle] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState('');

  // Handle lesson title change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handle module selection
  const handleModuleSelect = (e) => {
    setSelectedModuleId(e.target.value);
  };

  // Handle adding a new lesson
  const handleAddLesson = () => {
    if (title.trim() !== '' && selectedModuleId) {
      const moduleId = parseInt(selectedModuleId);
      const updatedModules = modules.map(module => {
        if (module.id === moduleId) {
          return {
            ...module,
            lessons: [
              ...module.lessons,
              {
                id: module.lessons.length + 1,
                title: title,
                sections: [] // Initialize sections array for the lesson
              }
            ]
          };
        }
        return module;
      });
      setModules(updatedModules);
      setTitle('');
    }
  };

  return (
    <div>
      <h3>Create New Lesson</h3>
      <div className="mb-3">
        <label htmlFor="lessonTitle" className="form-label">Lesson Title:</label>
        <input
          type="text"
          id="lessonTitle"
          value={title}
          onChange={handleTitleChange}
          className="form-control"
          required
        />
        <div className="mb-3">
          <label htmlFor="selectModule" className="form-label">Select Module:</label>
          <select id="selectModule" className="form-select" onChange={handleModuleSelect}>
            <option value="">-- Select Module --</option>
            { modules.map(module => (
              <option key={module.id} value={module.id}>{module.title}</option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={handleAddLesson} className="btn btn-primary">Add Lesson</button>
    </div>
  );
};

export default EditLessonForm;
