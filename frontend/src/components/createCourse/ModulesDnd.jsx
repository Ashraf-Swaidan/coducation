import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Modules = [
    {
      id: 1,
      title: 'Module 1',
      lessons: [
        {
          id: 1,
          title: 'Lesson 1',
          sections: [
            { id: 1, content: 'Section 1 Content', type: 'text' },
            { id: 2, content: 'Section 2 Content', type: 'text' },
            { id: 3, content: 'Section 3 Content', type: 'text' }
          ]
        },
        {
          id: 2,
          title: 'Lesson 2',
          sections: [
            { id: 4, content: 'Section 4 Content', type: 'text' },
            { id: 5, content: 'Section 5 Content', type: 'text' },
            { id: 6, content: 'Section 6 Content', type: 'text' }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Module 2',
      lessons: [
        {
          id: 3,
          title: 'Lesson 3',
          sections: [
            { id: 7, content: 'Section 7 Content', type: 'text' },
            { id: 8, content: 'Section 8 Content', type: 'text' },
            { id: 9, content: 'Section 9 Content', type: 'text' }
          ]
        },
        {
          id: 4,
          title: 'Lesson 4',
          sections: [
            { id: 10, content: 'Section 10 Content', type: 'text' },
            { id: 11, content: 'Section 11 Content', type: 'text' },
            { id: 12, content: 'Section 12 Content', type: 'text' }
          ]
        }
      ]
    }
  ];


const ModulesDnd = () => {
  const [modules, setModules] = useState(Modules);

  

  const handleDragAndDrop = (results) => {
    const { source, destination, draggableId, type } = results;
  
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }
  
    const newModules = modules.map(module => ({ ...module, lessons: module.lessons.map(lesson => ({ ...lesson, sections: [...lesson.sections] })) }));
  
    if (type === 'module') {
      const movedModule = newModules.splice(source.index, 1)[0];
      newModules.splice(destination.index, 0, movedModule);
      setModules(newModules);
      return;
    }
  
    const sourceModuleIndex = newModules.findIndex(module => `module-${module.id}` === source.droppableId);
    const destinationModuleIndex = newModules.findIndex(module => `module-${module.id}` === destination.droppableId);
  
    const sourceModule = newModules[sourceModuleIndex];
    const destinationModule = newModules[destinationModuleIndex];
  
    if (type === 'lesson') {
      const sourceLessonIndex = sourceModule.lessons.findIndex(lesson => `lesson-${lesson.id}` === draggableId);
      const destinationLessonIndex = destinationModule.lessons.findIndex(lesson => `lesson-${lesson.id}` === destination.droppableId);
  
      const movedLesson = sourceModule.lessons[sourceLessonIndex];
      sourceModule.lessons.splice(sourceLessonIndex, 1);
      destinationModule.lessons.splice(destination.index, 0, movedLesson);
    }
  
    if (type === 'section') {
        // to do later
    }
    
    

    setModules(newModules);
  };
  
  
  

  return (
    <div className="layout__wrapper">
      <div className="card">
        <DragDropContext onDragEnd={handleDragAndDrop}>
          <div className="header">
            <h1>Modules and Lessons</h1>
          </div>
          <Droppable droppableId="root" type="module">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {modules.map((module, index) => (
                  <Draggable
                    draggableId={`module-${module.id}`}
                    index={index}
                    key={`module-${module.id}`}
                  >
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <Module {...module} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

const Module = ({ id, title, lessons }) => {
  return (
    <div>
      <h2>{title}</h2>
      <Droppable droppableId={`module-${id}`} type="lesson">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {lessons.map((lesson, index) => (
              <Draggable
                draggableId={`lesson-${lesson.id}`}
                index={index}
                key={`lesson-${lesson.id}`}
              >
                {(provided) => (
                  <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <Lesson {...lesson} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

const Lesson = ({ id, title, sections }) => {
    return (
      <div>
        <h3>{title}</h3>
        <Droppable droppableId={`lesson-${id}`} type="section">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sections && sections.map((section, index) => (
                <Draggable
                  draggableId={`section-${section.id}`}
                  index={index}
                  key={`section-${section.id}`}
                >
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <Section {...section} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  };
  

const Section = ({ type }) => {
  return (
    <div>
      <p>{type}</p>
    </div>
  );
};

export default ModulesDnd;
