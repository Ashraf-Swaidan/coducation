import React, { useState } from 'react';

const SectionForm = ({ modules, setModules }) => {
  const [selectedModuleId, setSelectedModuleId] = useState('');
  const [selectedLessonId, setSelectedLessonId] = useState('');
  const [sectionType, setSectionType] = useState('markdown');
  const [sectionTitle, setSectionTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  const handleModuleSelect = (e) => {
    setSelectedModuleId(e.target.value);
    setSelectedLessonId('');
  };

  const handleLessonSelect = (e) => {
    setSelectedLessonId(e.target.value);
  };

  const handleSectionTypeChange = (e) => {
    setSectionType(e.target.value);
  };

  const handleSectionTitleChange = (e) => {
    setSectionTitle(e.target.value);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const handleAddSection = () => {
    if (selectedModuleId && selectedLessonId) {
      const moduleId = parseInt(selectedModuleId);
      const lessonId = parseInt(selectedLessonId);

      const updatedModules = modules.map(module => {
        if (module.module_id === moduleId) {
          return {
            ...module,
            lessons: module.lessons.map(lesson => {
              if (lesson.lesson_id === lessonId) {
                return {
                  ...lesson,
                  sections: [
                    ...lesson.sections,
                    {
                      section_id: lesson.sections.length + 1,
                      content: sectionType === 'markdown' ? '' : null,
                      type: sectionType,
                      title: sectionTitle,
                      videoFile: sectionType === 'video' ? videoFile : null,
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
      // Reset form fields
      setSectionTitle('');
      setSectionType('markdown');
      setVideoFile(null);
    }
  };

  return (
    <div>
      <h3>Create New Section</h3>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">Section Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={sectionTitle}
          onChange={handleSectionTitleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="selectSectionModule" className="form-label">Select Module:</label>
        <select id="selectSectionModule" className="form-select" onChange={handleModuleSelect}>
          <option value="">-- Select Module --</option>
          {modules && modules.map(module => (
            <option key={module.module_id} value={module.module_id}>{module.title}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="selectLesson" className="form-label">Select Lesson:</label>
        <select id="selectLesson" className="form-select" onChange={handleLessonSelect}>
          <option value="">-- Select Lesson --</option>
          {selectedModuleId && modules.length > 0 &&
            (() => {
              const selectedModule = modules.find(module => module.module_id === parseInt(selectedModuleId));
              return selectedModule && Array.isArray(selectedModule.lessons) ? (
                selectedModule.lessons.map(lesson => (
                  <option key={lesson.lesson_id} value={lesson.lesson_id}>{lesson.title}</option>
                ))
              ) : (
                <option disabled>No lessons available</option>
              );
            })()
          }
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="selectSectionType" className="form-label">Select Section Type:</label>
        <select id="selectSectionType" className="form-select" value={sectionType} onChange={handleSectionTypeChange}>
          <option value="markdown">Markdown</option>
          <option value="video">Video</option>
        </select>
      </div>
      {sectionType === 'video' && (
        <div className="mb-3">
          <label htmlFor="videoUpload" className="form-label">Upload Video:</label>
          <input onChange={handleVideoUpload} type="file" id="videoUpload" className="form-control" />
        </div>
      )}
      <button onClick={handleAddSection} className="btn btn-primary">Add Section</button>
    </div>
  );
};

export default SectionForm;
