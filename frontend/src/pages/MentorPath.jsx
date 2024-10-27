import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import pathsData from '../components/paths/pathsData'; 
import PathDashboard from '../components/path_courses/PathDashboard';
import CourseList from '../components/path_courses/CourseList'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MentorStatus from '../components/mentorPath/MentorStatus';
import MentorCoursesOverview from '../components/mentorPath/MentorCoursesOverview';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const MentorPath = () => {

    const { pathId } = useParams(); // Get the path ID from URL params
    const [pathData, setPathData] = useState(null);
    const {userInfo} = useContext(AuthContext);
    const {userId} = useContext(AuthContext);
    const [mentorData, setMentorData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMentorData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost/coducation_backend/fetchMentorStats.php?pathId=${pathId}&mentorId=${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setMentorData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchMentorData();
    }, [pathId, userId]);
    

    // Fetch pathData based on the pathId
    useEffect(()=>{
        const fetchPathDetails = async () => {
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost/coducation_backend/fetchPathDetails.php?pathId=${pathId}`, {headers : {
                    'Authorization' : `Bearer ${token}`
                }
            });
            
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!mentorData) {
        return <div>No mentor data found</div>;
    }

  return (
    <div id="page-container">
            <Navbar />
        <div id="content-wrap">

        <MentorStatus mentorData={mentorData} />
        <PathDashboard pathHeader={pathData.pathHeader} courses={pathData.courses} />
        <MentorCoursesOverview mentor={userInfo} mentorCourses={mentorData.courses} pathId={pathId}/>
        <CourseList pathHeader={pathData.pathHeader} courses={pathData.courses}/>

        </div>
        <footer id="footer">
            <Footer/>
        </footer>
      </div>
  )
}

export default MentorPath