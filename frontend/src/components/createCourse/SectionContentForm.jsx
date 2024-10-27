import React, { useState, useEffect } from 'react';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import './styles/markdown-editor.css';

const SectionContentForm = ({ modules, setModules }) => {
  const [selectedModuleId, setSelectedModuleId] = useState('');
  const [selectedLessonId, setSelectedLessonId] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [sectionContent, setSectionContent] = useState('');
  const [markdownSections, setMarkdownSections] = useState([]);

  const mdParser = new MarkdownIt(/* Markdown-it options */);

  const handleModuleSelect = (e) => {
    setSelectedModuleId(e.target.value);
    setSelectedLessonId('');
    setSelectedSectionId('');
    setSectionContent('');
  };

  const handleLessonSelect = (e) => {
    setSelectedLessonId(e.target.value);
    setSelectedSectionId('');
    setSectionContent('');
  };

  const handleSectionSelect = (e) => {
    setSelectedSectionId(e.target.value);
    const moduleId = parseInt(selectedModuleId);
    const lessonId = parseInt(selectedLessonId);
    const sectionId = parseInt(e.target.value);

    const selectedModule = modules.find(module => module.module_id === moduleId);
    if (selectedModule) {
      const selectedLesson = selectedModule.lessons.find(lesson => lesson.lesson_id === lessonId);
      if (selectedLesson) {
        const selectedSection = selectedLesson.sections.find(section => section.section_id === sectionId);
        if (selectedSection) {
          setSectionContent(selectedSection.content);
        } else {
          setSectionContent('');
        }
      } else {
        setSectionContent('');
      }
    } else {
      setSectionContent('');
    }
  };

  const handleContentChange = ({ text }) => {
    // Update the content in the state
    setSectionContent(text);

    // Update the content in the modules state
    const moduleId = parseInt(selectedModuleId);
    const lessonId = parseInt(selectedLessonId);
    const sectionId = parseInt(selectedSectionId);

    const updatedModules = modules.map(module => {
      if (module.module_id === moduleId) {
        return {
          ...module,
          lessons: module.lessons.map(lesson => {
            if (lesson.lesson_id === lessonId) {
              return {
                ...lesson,
                sections: lesson.sections.map(section => {
                  if (section.section_id === sectionId) {
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

      const selectedModule = modules.find(module => module.module_id === moduleId);
      if (selectedModule) {
        const selectedLesson = selectedModule.lessons.find(lesson => lesson.lesson_id === lessonId);
        if (selectedLesson) {
          const selectedSections = selectedLesson.sections.filter(section => section.type === 'markdown');
          setMarkdownSections(selectedSections);
        } else {
          setMarkdownSections([]);
        }
      } else {
        setMarkdownSections([]);
      }
    } else {
      setMarkdownSections([]);
    }
  }, [selectedModuleId, selectedLessonId, modules]);

  return (
    <div>
      <h3>Section Content Form</h3>
      <div className="mb-3" id='markdown-editor'>
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
          {selectedModuleId && modules &&
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
        <label htmlFor="selectSection" className="form-label">Select Section:</label>
        <select id="selectSection" className="form-select" onChange={handleSectionSelect}>
          <option value="">-- Select Section --</option>
          {markdownSections.map(section => (
            <option key={section.section_id} value={section.section_id}>{section.title}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <MarkdownEditor
          className='custom-markdown-editor'
          value={sectionContent}
          onChange={handleContentChange}
          style={{ height: '500px' }}
          renderHTML={sectionContent => mdParser.render(sectionContent)}
        />
      </div>
    </div>
  );
};

export default SectionContentForm;
