import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './styles/ModulesList.css';

const ModulesList = ({ modules, setModules }) => {
  const [editingModuleId, setEditingModuleId] = useState(null);
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [editingSectionId, setEditingSectionId] = useState(null);

  const [LessonEditingModuleId, setLessonEditingModuleId] = useState(null);
  const [SectionEditingModuleId, setSectionEditingModuleId] = useState(null);
  const [SectionEditingLessonId, setSectionEditingLessonId] = useState(null);

  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newLessonTitle, setNewLessonTitle] = useState('');

  const handleEditModule = (moduleId) => {
    setEditingModuleId(moduleId);
    setEditingLessonId(null); // Reset lesson editing
    setEditingSectionId(null); // Reset section editing
    const moduleToEdit = modules.find(module => module.module_id === moduleId);
    setNewModuleTitle(moduleToEdit.title);
  };

  const handleEditLesson = (moduleId, lessonId) => {
    setLessonEditingModuleId(moduleId);
    setEditingLessonId(lessonId);
    setEditingSectionId(null); // Reset section editing
    const lessonToEdit = modules
      .find(module => module.module_id === moduleId)
      .lessons.find(lesson => lesson.lesson_id === lessonId);
    setNewLessonTitle(lessonToEdit.title);
  };

  const handleEditSection = (moduleId, lessonId, sectionId) => {
    setSectionEditingModuleId(moduleId);
    setSectionEditingLessonId(lessonId);
    setEditingSectionId(sectionId);
    // Scroll to Markdown editor
    document.getElementById('markdown-editor').scrollIntoView({ behavior: 'smooth' });
  };

  const handleUpdateModule = (moduleId) => {
    const updatedModules = modules.map(module => {
      if (module.module_id === moduleId) {
        return {
          ...module,
          title: newModuleTitle
        };
      }
      return module;
    });
    setModules(updatedModules);
    setEditingModuleId(null);
  };

  const handleUpdateLesson = (moduleId, lessonId) => {
    const updatedModules = modules.map(module => {
      if (module.module_id === moduleId) {
        return {
          ...module,
          lessons: module.lessons.map(lesson => {
            if (lesson.lesson_id === lessonId) {
              return {
                ...lesson,
                title: newLessonTitle
              };
            }
            return lesson;
          })
        };
      }
      return module;
    });
    setModules(updatedModules);
    setEditingLessonId(null);
  };

  const handleDeleteModule = (moduleId) => {
    // Filter out the module to be deleted
    const updatedModules = modules.filter(module => module.module_id !== moduleId);
    // Update the state with the updated modules
    setModules(updatedModules);
  };

  const handleDeleteLesson = (moduleId, lessonId) => {
    const updatedModules = modules.map(module => {
      if (module.module_id === moduleId) {
        return {
          ...module,
          lessons: module.lessons.filter(lesson => lesson.lesson_id !== lessonId)
        };
      }
      return module;
    });
    setModules(updatedModules);
  };

  const handleDeleteSection = (moduleId, lessonId, sectionId) => {
    const updatedModules = modules.map(module => {
      if (module.module_id === moduleId) {
        return {
          ...module,
          lessons: module.lessons.map(lesson => {
            if (lesson.lesson_id === lessonId) {
              return {
                ...lesson,
                sections: lesson.sections.filter(section => section.section_id !== sectionId)
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

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.index === source.index) {
      return;
    }

    const reorderedModules = Array.from(modules);
    const [removedModule] = reorderedModules.splice(source.index, 1);
    reorderedModules.splice(destination.index, 0, removedModule);

    setModules(reorderedModules);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div>
          <h3>Modules Map List</h3>
          {modules.length > 0 ? (
            <Droppable droppableId="modules-list" direction="vertical">
              {(provided) => (
                <ul
                  className="list-group"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {modules.map((module, index) => (
                    <Draggable key={module.module_id} draggableId={module.module_id.toString()} index={index} >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="list-group-item .module-i-item border"
                        >
                          {editingModuleId === module.module_id ? (
                            <div>
                              <input type="text" value={newModuleTitle} onChange={(e) => setNewModuleTitle(e.target.value)} />
                              <button className='save-preq-btn ms-2' onClick={() => handleUpdateModule(module.module_id)}><IoIosCheckmarkCircleOutline /></button>
                            </div>
                          ) : (
                            <div>
                              <strong>{module.title}</strong>
                              <button className='edit-preq-btn ms-2' onClick={() => handleEditModule(module.module_id)}><CiEdit /></button>
                              <button className='delete-preq-btn ms-2' onClick={() => handleDeleteModule(module.module_id)}><MdDeleteForever /></button>
                            </div>
                          )}

                          <ul className="list-group">
                            {module.lessons.map(lesson => (
                              <li key={lesson.lesson_id} className="list-group-item">
                                <hr />
                                {LessonEditingModuleId === module.module_id && editingLessonId === lesson.lesson_id ? (
                                  <div>
                                    <input type="text" value={newLessonTitle} onChange={(e) => setNewLessonTitle(e.target.value)} />
                                    <button className='save-preq-btn ms-2' onClick={() => handleUpdateLesson(module.module_id, lesson.lesson_id)}><IoIosCheckmarkCircleOutline />
                                    </button>
                                  </div>
                                ) : (
                                  <div>
                                    <strong className='mx-2'>{lesson.title}</strong>
                                    <button className='edit-preq-btn ms-2' onClick={() => handleEditLesson(module.module_id, lesson.lesson_id)}><CiEdit /></button>
                                    <button className='delete-preq-btn ms-2' onClick={() => handleDeleteLesson(module.module_id, lesson.lesson_id)}><MdDeleteForever /></button>
                                  </div>
                                )}
                                <ul className="list-group mx-2">
                                  {lesson.sections.map(section => (
                                    <li key={section.section_id} className="list-group-item">
                                      <strong>{section.title}</strong>
                                      <button className='edit-preq-btn ms-2' onClick={() => handleEditSection(module.module_id, lesson.lesson_id, section.section_id)}><CiEdit /></button>
                                      <button className='delete-preq-btn ms-2' onClick={() => handleDeleteSection(module.module_id, lesson.lesson_id, section.section_id)}><MdDeleteForever /></button>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          ) : (
            <div>No Modules yet</div>
          )}
        </div>
      </DragDropContext>
    </div>
  );
};

export default ModulesList;
