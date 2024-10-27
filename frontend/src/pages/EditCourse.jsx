import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import BasicFieldsForm from '../components/createCourse/BasicFieldsForm';
import PrerequisitesForm from '../components/createCourse/PrerequisitesForm';
import MLSForm from '../components/createCourse/MLSForm';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import '../components/editCourse/styles/EditCourse.css';

const EditCourse = () => {
  const { pathId, courseId } = useParams();
  const { userId } = useContext(AuthContext);
  const [prerequisites, setPrerequisites] = useState([]);
  const [modules, setModules] = useState([]);
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    image: null,
    subImage: null,
    userId: '',
    pathId: ''
  });

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch course details
        const courseResponse = await axios.get(`http://localhost/coducation_backend/fetchCourseDetails.php?courseId=${courseId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(courseResponse.data);

        setCourseData(prevData => ({
          ...prevData,
          title: courseResponse.data.title,
          description: courseResponse.data.description,
          image: courseResponse.data.image_1,
          subImage: courseResponse.data.image_2,
          userId: userId,
          pathId: pathId
        }));

        setModules(courseResponse.data.modules);

        // Fetch prerequisites
        const prerequisitesResponse = await axios.get(`http://localhost/coducation_backend/basic/fetchCoursePrerequisites.php?courseId=${courseId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setPrerequisites(prerequisitesResponse.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchCourseDetails();
  }, [courseId, userId, pathId]);

  const handleSaveCourse = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('courseId', courseId);
      formData.append('title', courseData.title);
      formData.append('description', courseData.description);
      formData.append('image_1', courseData.image);
      formData.append('image_2', courseData.subImage);
      formData.append('userId', userId);
      formData.append('pathId', pathId);
      formData.append('modules', JSON.stringify(modules));
      formData.append('prerequisites', JSON.stringify(prerequisites));

      const response = await axios.post('http://localhost/coducation_backend/editCourse.php', formData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log(response);
    } catch (error) {
      console.error(error);
      alert('Failed to update the course');
    }
  };


  console.log(prerequisites)
  return (
    <div id="page-container">
      <Navbar />
      <div className='form-cont'>
        <div id="content-wrap" className="container">
          <div className="row py-3">
            <div className="col-12 col-sm-6">
              <BasicFieldsForm setCourseData={setCourseData} courseData={courseData} />
            </div>
            <div className="col-12 col-sm-6">
              <PrerequisitesForm prerequisites={prerequisites} setPrerequisites={setPrerequisites} />
            </div>
            <div className='row mt-3'>
              <MLSForm modules={modules} setModules={setModules} />
            </div>
          </div>
          <div className="row mt-3">
            <button className="btn btn-primary" onClick={handleSaveCourse}>Save Course</button>
          </div>
        </div>
      </div>
      <footer id="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default EditCourse;
