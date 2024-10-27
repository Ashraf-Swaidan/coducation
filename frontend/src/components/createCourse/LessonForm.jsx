import React, { useState } from 'react';

const LessonForm = ({ modules, setModules }) => {
  const [title, setTitle] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleModuleSelect = (e) => {
    setSelectedModuleId(e.target.value);
  };

  const handleAddLesson = () => {
    if (title.trim() !== '' && selectedModuleId) {
      const moduleId = parseInt(selectedModuleId);
      const updatedModules = modules.map(module => {
        if (module.module_id === moduleId) { // Use module_id
          return {
            ...module,
            lessons: [
              ...module.lessons,
              {
                lesson_id: module.lessons.length + 1, // Use lesson_id
                title: title,
                sections: [] 
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
              <option key={module.module_id} value={module.module_id}>{module.title}</option> // Use module_id
            ))}
          </select>
        </div>
      </div>
      <button onClick={handleAddLesson} className="btn btn-primary">Add Lesson</button>
    </div>
  );
};

export default LessonForm;
