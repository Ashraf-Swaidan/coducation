import React, { useState } from 'react';
import EditModuleForm from './editMLS/EditModuleForm';
import EditLessonForm from './editMLS/EditLessonForm';
import EditSectionForm from './editMLS/EditSectionForm';
import EditSectionContentForm from './editMLS/EditSectionContentForm';
import EditModulesList from './editMLS/EditModulesList';

const EditMLSForm = ({ course }) => {
  const [modules, setModules] = useState(course.modules);

  return (
    <div className="container">
      <div className="row">
        {/* EditModuleForm component */}
        <div className="col-md-4 mb-4">
          <EditModuleForm modules={modules} setModules={setModules} />
        </div>
        {/* EditLessonForm component */}
        <div className="col-md-4 mb-4">
          <EditLessonForm modules={modules} setModules={setModules} />
        </div>
        {/* EditSectionForm component */}
        <div className="col-md-4 mb-4">
          <EditSectionForm modules={modules} setModules={setModules} />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-12'>
          {/* EditSectionContentForm component */}
          <EditSectionContentForm modules={modules} setModules={setModules} />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-12'>
          {/* EditModulesList component */}
          <EditModulesList modules={modules} setModules={setModules} />
        </div>
      </div>
    </div>
  );
};

export default EditMLSForm;
