import React, { useState } from 'react';

const EditSectionForm = ({ modules, setModules }) => {
  const [selectedModuleId, setSelectedModuleId] = useState('');
  const [selectedLessonId, setSelectedLessonId] = useState('');
  const [sectionType, setSectionType] = useState('markdown'); // Default to markdown type

  const handleModuleSelect = (e) => {
    setSelectedModuleId(e.target.value);
  };

  const handleLessonSelect = (e) => {
    setSelectedLessonId(e.target.value);
  };

  const handleSectionTypeChange = (e) => {
    setSectionType(e.target.value);
  };

  const handleAddSection = () => {
    if (selectedModuleId && selectedLessonId) {
      const moduleId = parseInt(selectedModuleId);
      const lessonId = parseInt(selectedLessonId);
      const updatedModules = modules.map(module => {
        if (module.id === moduleId) {
          return {
            ...module,
            lessons: module.lessons.map(lesson => {
              if (lesson.id === lessonId) {
                return {
                  ...lesson,
                  sections: [
                    ...lesson.sections,
                    {
                      id: lesson.sections.length + 1,
                      content: '', // Initialize content as empty
                      type: sectionType // Set the type of the section
                    }
                  ]
                };
              }
              return lesson;
            })
          };
        }
        return module;
      });
      setModules(updatedModules);
    }
  };

  return (
    <div>
      <h3>Create New Section</h3>
      <div className="mb-3">
        <label htmlFor="selectSectionModule" className="form-label">Select Module:</label>
        <select id="selectSectionModule" className="form-select" onChange={handleModuleSelect}>
          <option value="">-- Select Module --</option>
          { modules.map(module => (
            <option key={module.id} value={module.id}>{module.title}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="selectLesson" className="form-label">Select Lesson:</label>
        <select id="selectLesson" className="form-select" onChange={handleLessonSelect}>
          <option value="">-- Select Lesson --</option>
          { selectedModuleId && modules.length>0 && modules.find(module => module.id === parseInt(selectedModuleId)).lessons.map(lesson => (
            <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="selectSectionType" className="form-label">Select Section Type:</label>
        <select id="selectSectionType" className="form-select" value={sectionType} onChange={handleSectionTypeChange}>
          <option value="markdown">Markdown</option>
          <option value="video">Video</option>
        </select>
      </div>
      {/* Render video upload field if section type is video */}
      {sectionType === 'video' && (
        <div className="mb-3">
          <label htmlFor="videoUpload" className="form-label">Upload Video:</label>
          <input type="file" id="videoUpload" className="form-control" />
        </div>
      )}
      <button onClick={handleAddSection} className="btn btn-primary">Add Section</button>
    </div>
  );
};

export default EditSectionForm;
