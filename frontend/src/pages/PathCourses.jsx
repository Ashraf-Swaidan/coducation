import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import pathsData from '../components/paths/pathsData';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PathDashboard from '../components/path_courses/PathDashboard';
import CourseList from '../components/path_courses/CourseList';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const PathCourses = () => {
    const { pathId } = useParams();
    const [pathData, setPathData] = useState(null);

    const {userInfo} = useContext(AuthContext);
    const {userId} = useContext(AuthContext);
    console.log(userInfo);
    useEffect(()=>{
        const fetchPathDetails = async () => {
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost/coducation_backend/fetchPathDetails.php?pathId=${pathId}`, {headers : {
                    'Authorization' : `Bearer ${token}`
                }
            });
            console.log(response);
            setPathData(response.data);
            
            } catch (error){
             console.log(error);   
            }
        };

        fetchPathDetails();
    },[pathId]);

    if (!pathData) {
        return <div>Loading Path Courses..</div>;
    }
    console.log(pathData);

  return (
    <div id="page-container">
        <Navbar />
        <div id="content-wrap">
            <PathDashboard pathHeader={pathData.pathHeader} courses={pathData.courses} />
            <CourseList pathHeader={pathData.pathHeader} courses={pathData.courses}/>
        </div>
        <footer id="footer">
            <Footer/>
        </footer>
      </div>
  )
}

export default PathCourses