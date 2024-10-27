import React, { useState, useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BasicFieldsForm from '../components/createCourse/BasicFieldsForm';
import PrerequisitesForm from '../components/createCourse/PrerequisitesForm';
import MLSForm from '../components/createCourse/MLSForm';
import axios from 'axios';
import '../components/createCourse/styles/CreateCourse.css';
import { AuthContext } from '../AuthContext';

const CreateCourse = () => {

  const { pathId } = useParams();
  const { userInfo, userId } = useContext(AuthContext);
  const [prerequisites, setPrerequisites] = useState([]);
  const [modules, setModules] = useState([]);
  const [drafts, setDrafts] = useState([]); 
  const [selectedDraft, setSelectedDraft] = useState(null); 
  

  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    image: null,
    subImage: null,
    userId: '',
    pathId: ''
  });

  useEffect(() => {
    if (userInfo) {
      setCourseData(prevData => ({
        ...prevData,
        userId: userInfo.userId,
        pathId: pathId
      }));
    }
  }, [userInfo, pathId]);

 
  console.log(courseData)
  console.log(selectedDraft);
  console.log(courseData);
  console.log(prerequisites);
  console.log(modules)
  
  // Function to create a new draft
  const createNewDraft = async () => {
    const formData = new FormData();
    formData.append('image', courseData.image);
    formData.append('subImage', courseData.subImage);
    formData.append('courseData', JSON.stringify(courseData));
    formData.append('prerequisites', JSON.stringify(prerequisites));
    formData.append('totalMods', JSON.stringify(modules));
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.post('http://localhost/coducation_backend/createDraft.php', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response);
    } catch (error) {
      console.error('Error creating draft:', error);
      alert('Error creating draft');
    }
  };

  
 useEffect(() => {
    const fetchDrafts = async () => {
      if (userInfo) {
        const token = localStorage.getItem('token');
        
        try {
          const response = await axios.get(`http://localhost/coducation_backend/fetchDrafts.php?userId=${userInfo.userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log(response);
          setDrafts(response.data);
        } catch (error) {
          console.error('Error fetching drafts:', error);
          alert('Error fetching drafts');
        }
      }
    };
    
    fetchDrafts();
}, [userInfo]);
  

  // Function to handle deleting an existing draft
  const deleteDraft = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(`http://localhost/coducation_backend/deleteDraft.php?draft_id=${selectedDraft.draft.draft_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response);

    
  } catch (error) {
    console.error('Error deleting draft:', error);
    alert('Error deleting draft');
  }
};

  

  // Function to handle selecting an existing draft
const selectDraft = async (draftId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost/coducation_backend/getDraft.php?draftId=${draftId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response);
    // Assuming the response.data contains the draft details
    const selectedDraftData = response.data;

    // Prefill the form fields with the selected draft data
    setCourseData({
      ...courseData,
      title: selectedDraftData.draft.title,
      description: selectedDraftData.draft.description,
      // Continue prefilling other fields as needed
    });
    setPrerequisites(selectedDraftData.prerequisites);
    setModules(selectedDraftData.modules);

    // Set the selected draft ID
    setSelectedDraft(response.data);
  } catch (error) {
    console.error('Error selecting draft:', error);
    alert('Error selecting draft');
  }
};

  // Function to handle editing an existing draft
const editDraft = async () => {
      if (!selectedDraft) {
        alert('Please select a draft to edit');
        return;
      }

      // Delete the selected draft
      await deleteDraft();

      // Create a new draft with the same data
      await createNewDraft();
    };



    const uploadCourse = async () => {
      const formData = new FormData();
      formData.append('image', courseData.image);
      formData.append('subImage', courseData.subImage);
      formData.append('courseData', JSON.stringify(courseData));
      formData.append('prerequisites', JSON.stringify(prerequisites));
      formData.append('totalMods', JSON.stringify(modules));
      const token = localStorage.getItem('token');
    
      try {
        const response = await axios.post('http://localhost/coducation_backend/uploadCourse.php', formData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response);
      } catch (error) {
        console.error('Error creating draft:', error);
        alert('Error creating draft');
      }
  };
  
  
  
  return (
    <div id="page-container">
      <Navbar />
      <div className='form-cont'>
        <div id="content-wrap" className="container">

            <div className="row py-2 draft-buttons">
              <div className="col">
              <button onClick={createNewDraft}>Create New Draft</button>
              </div>

              <div className="col">
                <select className='my-2 draft-select' onChange={(e) => selectDraft(e.target.value)}>
            <option value="">Select Draft</option>
            {drafts.map((draft) => (
                <option key={draft.draft_id} value={draft.draft_id}>{draft.title}</option>
            ))}
        </select>
              </div>

              <div className="col">
                 <button onClick={editDraft}>Edit Draft</button>
              </div>

              <div className="col">
                <button onClick={deleteDraft}>Delete Draft</button>
              </div>
        
        
       
        
        <button onClick={uploadCourse}>Upload Course</button>
    </div>


            
          <div className="row py-3">
            <div className="col-12 col-sm-6 ">
              <BasicFieldsForm setCourseData={setCourseData} courseData={courseData} />
            </div>
            <div className="col-12 col-sm-6">
              <PrerequisitesForm prerequisites={prerequisites} setPrerequisites={setPrerequisites} />
            </div>
            <div className='row mt-3'>
              <MLSForm modules={modules} setModules={setModules} />
            </div>
          </div>
          
        </div>
      </div>
      <footer id="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default CreateCourse;
