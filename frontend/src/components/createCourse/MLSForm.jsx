import React, { useEffect, useState } from 'react';
import ModuleForm from './ModuleForm';
import LessonForm from './LessonForm';
import SectionForm from './SectionForm';
import ModulesList from './ModulesList';
import SectionContentForm from './SectionContentForm';

const MLSForm = ({modules, setModules}) => {
  // State for modules
  


  console.log(modules);
  return (
    <div className="container">
      <div className="row">
        {/* ModuleForm component */}
        <div className="col-md-4 mb-4">
          <ModuleForm modules={modules} setModules={setModules} />
        </div>
        {/* LessonForm component */}
        <div className="col-md-4 mb-4">
          <LessonForm modules={modules} setModules={setModules} />
        </div>
        {/* SectionForm component */}
        <div className="col-md-4 mb-4">
          <SectionForm modules={modules} setModules={setModules} />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-12'>
          <SectionContentForm 
            modules={modules} 
            setModules={setModules}
            />
            
        </div>
      </div>

      <div className='row'>
        <div className='col-md-12'>
          <ModulesList
           modules={modules} 
           setModules={setModules}
          />
        </div>
      </div>
    </div>
  );
};

export default MLSForm;
