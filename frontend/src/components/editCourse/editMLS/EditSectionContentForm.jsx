import React, { useState, useEffect } from 'react';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
// import './styles/markdown-editor.css';

const EditSectionContentForm = ({ modules, setModules }) => {
  const [selectedModuleId, setSelectedModuleId] = useState('');
  const [selectedLessonId, setSelectedLessonId] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [sectionContent, setSectionContent] = useState('');
  const [markdownSections, setMarkdownSections] = useState([]);

  const mdParser = new MarkdownIt(/* Markdown-it options */);

  const handleModuleSelect = (e) => {
    setSelectedModuleId(e.target.value);
  };

  const handleLessonSelect = (e) => {
    setSelectedLessonId(e.target.value);
  };

  const handleSectionSelect = (e) => {
    setSelectedSectionId(e.target.value);
    const moduleId = parseInt(selectedModuleId);
    const lessonId = parseInt(selectedLessonId);
    const sectionId = parseInt(e.target.value);
    const selectedSection = modules.find(module => module.id === moduleId)
      .lessons.find(lesson => lesson.id === lessonId)
      .sections.find(section => section.id === sectionId);
    setSectionContent(selectedSection.content);
  };

  const handleContentChange = ({ text }) => {
    // Update the content in the state
    setSectionContent(text);
    
    // Update the content in the modules state
    const moduleId = parseInt(selectedModuleId);
    const lessonId = parseInt(selectedLessonId);
    const sectionId = parseInt(selectedSectionId);
    const updatedModules = modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: module.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return {
                ...lesson,
                sections: lesson.sections.map(section => {
                  if (section.id === sectionId) {
                    return {
                      ...section,
                      content: text
                    };
                  }
                  return section;
                })
              };
            }
            return lesson;
          })
        };
      }
      return module;
    });
    setModules(updatedModules);
  };

  useEffect(() => {
    // Filter sections based on the selected module and lesson
    if (selectedModuleId && selectedLessonId) {
      const moduleId = parseInt(selectedModuleId);
      const lessonId = parseInt(selectedLessonId);
      const selectedSections = modules
        .find(module => module.id === moduleId)
        .lessons.find(lesson => lesson.id === lessonId)
        .sections.filter(section => section.type === 'markdown');
      setMarkdownSections(selectedSections);
    } else {
      setMarkdownSections([]);
    }
  }, [selectedModuleId, selectedLessonId, modules]);
  

  return (
    <div>
      <h3>Section Content Form</h3>
      <div className="mb-3"  id='markdown-editor'>
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
          { selectedModuleId && modules.find(module => module.id === parseInt(selectedModuleId)).lessons.map(lesson => (
            <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="selectSection" className="form-label">Select Section:</label>
        <select id="selectSection" className="form-select" onChange={handleSectionSelect}>
          <option value="">-- Select Section --</option>
          { markdownSections.map(section => (
            <option key={section.id} value={section.id}>{section.id}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <MarkdownEditor
          className='custom-markdown-editor'
          value={sectionContent}
          onChange={handleContentChange}
          style={{height:'500px'}}
          renderHTML={sectionContent => mdParser.render(sectionContent)}
        />
      </div>
    </div>
  );
};

export default EditSectionContentForm;
