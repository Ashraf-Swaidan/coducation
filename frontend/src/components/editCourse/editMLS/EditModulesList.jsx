import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import './styles/ModulesList.css';


const EditModulesList = ({ modules, setModules }) => {
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
    const moduleToEdit = modules.find(module => module.id === moduleId);
    setNewModuleTitle(moduleToEdit.title);
  };

  const handleEditLesson = (moduleId, lessonId) => {
    setLessonEditingModuleId(moduleId);
    setEditingLessonId(lessonId);
    setEditingSectionId(null); // Reset section editing
    const lessonToEdit = modules
      .find(module => module.id === moduleId)
      .lessons.find(lesson => lesson.id === lessonId);
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
      if (module.id === moduleId) {
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
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: module.lessons.map(lesson => {
            if (lesson.id === lessonId) {
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
    const updatedModules = modules.filter(module => module.id !== moduleId);
  
    // Filter out all lessons associated with the deleted module
    const updatedModulesWithDeletedLessons = updatedModules.map(module => ({
      ...module,
      lessons: module.lessons ? module.lessons.filter(lesson => lesson.moduleId !== moduleId) : []
    }));
  
    // Filter out all sections associated with the deleted lessons
    const updatedModulesWithDeletedSections = updatedModulesWithDeletedLessons.map(module => ({
      ...module,
      lessons: module.lessons.map(lesson => ({
        ...lesson,
        sections: lesson.sections ? lesson.sections.filter(section => section.moduleId !== moduleId) : []
      }))
    }));
  
    // Update the state with the updated modules
    setModules(updatedModulesWithDeletedSections);
  };
  
  const handleDeleteLesson = (moduleId, lessonId) => {
    const updatedModules = modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: module.lessons.filter(lesson => lesson.id !== lessonId),
          // Filter out sections associated with the deleted lesson
          sections: module.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              // Return an empty array to delete all sections of this lesson
              return {
                ...lesson,
                sections: null
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
  
  const handleDeleteSection = (moduleId, lessonId, sectionId) => {
    const updatedModules = modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: module.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return {
                ...lesson,
                sections: lesson.sections.filter(section => section.id !== sectionId)
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
    console.log(result);
    const { destination, source, draggableId } = result;

  // If there's no destination or the drag didn't change position, return
  if (!destination || destination.index === source.index) {
    return;
  }

  // Reorder the modules in the state based on the drag and drop result
  const reorderedModules = Array.from(modules);
  const [removedModule] = reorderedModules.splice(source.index, 1);
  reorderedModules.splice(destination.index, 0, removedModule);

  // Update the state with the reordered modules
  setModules(reorderedModules);
  }
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
                  <Draggable key={module.id} draggableId={module.id.toString()} index={index} >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="list-group-item .module-i-item border"
                      >
                        {editingModuleId === module.id ? (
              <div>
                <input type="text" value={newModuleTitle} onChange={(e) => setNewModuleTitle(e.target.value)} />
                <button className='save-preq-btn ms-2' onClick={() => handleUpdateModule(module.id)}><IoIosCheckmarkCircleOutline /></button>
              </div>
            ) : (
              <div>
                <strong>{module.title}</strong>

                <button className='edit-preq-btn ms-2'  onClick={() => handleEditModule(module.id)}><CiEdit /></button>

                <button className='delete-preq-btn ms-2' onClick={() => handleDeleteModule(module.id)}><MdDeleteForever/></button>
              </div>
            )}
            
            <ul className="list-group">
              {module.lessons.map(lesson => (
                <li key={lesson.id} className="list-group-item">
                  <hr/>
                  {LessonEditingModuleId === module.id && editingLessonId === lesson.id ? (
                    <div>
                      <input type="text" value={newLessonTitle} onChange={(e) => setNewLessonTitle(e.target.value)} />
                      <button className='save-preq-btn ms-2' onClick={() => handleUpdateLesson(module.id, lesson.id)}><IoIosCheckmarkCircleOutline />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <strong className='mx-2'>{lesson.title}</strong>

                      <button className='edit-preq-btn ms-2'  onClick={() => handleEditLesson(module.id, lesson.id)}><CiEdit/></button>

                      <button className='delete-preq-btn ms-2' onClick={() => handleDeleteLesson(module.id, lesson.id)}><MdDeleteForever/></button>
                    </div>
                  )}
                  <ul className="list-group mx-2">
                    {lesson.sections.map(section => (
                      <li key={section.id} className="list-group-item">
                        <strong>Section {section.id}</strong>

                        <button className='edit-preq-btn ms-2' onClick={() => handleEditSection(module.id, lesson.id, section.id)}><CiEdit/></button>

                        <button className='delete-preq-btn ms-2' onClick={() => handleDeleteSection(module.id, lesson.id, section.id)}> <MdDeleteForever /> </button>
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
          <div> No Modules yet </div>
        )}
      </div>
    </DragDropContext>
    </div>
  );
};

export default EditModulesList;