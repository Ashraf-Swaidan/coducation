import React, { useEffect, useState, useContext } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserProfile from '../components/profile/UserProfile';
import EnrolledCourses from '../components/profile/EnrolledCourses';
import CoursesCreated from '../components/profile/CoursesCreated';
import axios from 'axios';


import { AuthContext } from '../AuthContext';

const ProfileLayout = () => {
    const { userInfo } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const [CreatedCourses, setCreatedCourses] = useState(null);
    useEffect(() => {
      console.log(userInfo)
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                let response;
                let EnrolledCoursesResponse;
                let CreatedCoursesResponse;
                if (userInfo.userType === 'mentor') {
                    response = await axios.get(`http://localhost/coducation_backend/fetchMentorProfile.php?userId=${userInfo.userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    CreatedCoursesResponse = await axios.get(`http://localhost/coducation_backend/fetchCreatedCourses.php?userId=${userInfo.userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    console.log(CreatedCoursesResponse);
                    setCreatedCourses(CreatedCoursesResponse.data);

                } else if (userInfo.userType === 'student') {
                    response = await axios.get(`http://localhost/coducation_backend/fetchStudentProfile.php?userId=${userInfo.userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    EnrolledCoursesResponse = await axios.get(`http://localhost/coducation_backend/fetchEnrolledCourses.php?userId=${userInfo.userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                console.log(EnrolledCoursesResponse)
                setEnrolledCourses(EnrolledCoursesResponse.data)
                }


                console.log(response.data);
                setUserData(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userInfo]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!userData) {
        return <div>No user data found</div>;
    }

    console.log(userInfo);
    console.log(enrolledCourses);

    return (
        <div id="page-container">
            <Navbar />
            <div id="content-wrap" className="py-5">
                <div className="container mb-4">
                    <div className="row ">
                      <div className="col-lg-4 col-md-6 col-sm-12">
                         {userData.mentorData ? <UserProfile userData={userData.mentorData} userInfo={userInfo} /> : <UserProfile userData={userData.studentData} userInfo={userInfo}/> } 
                      </div>

                      <div className="col-lg-8 col-md-6 col-sm-12">
                        {userInfo.userType == 'student' ?  <EnrolledCourses userData={userData} enrolledCourses={enrolledCourses} />  :
                        <CoursesCreated userInfo={userInfo} CreatedCourses={CreatedCourses} />
                        }
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

export default ProfileLayout;
