import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PathHeader from '../components/path_details/PathHeader';
import PathOverview from '../components/path_details/PathOverview';
import PathBenefits from '../components/path_details/PathBenefits';
import PopularCourses from '../components/path_details/PopularCourses';
import PopularMentors from '../components/path_details/PopularMentors';
import PathChallenges from '../components/path_details/PathChallenges';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const PathDetailsPage = () => {
    const { pathId } = useParams(); // Get the path ID from URL params
    const [pathData, setPathData] = useState(null);
    const [popularMentors, setPopularMentors] = useState([]);

    const { userInfo } = useContext(AuthContext);
    const { userId } = useContext(AuthContext);

    useEffect(() => {
        const fetchPathDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost/coducation_backend/fetchPathDetails.php?pathId=${pathId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setPathData(response.data);

                const courses = response.data.courses;
                const topCourses = courses.sort((a, b) => b.rating - a.rating).slice(0, 4);
                console.log(topCourses);
                const mentorIds = topCourses.map(course => course.mentor_id).join(',');
                console.log(mentorIds);


                const mentorResponse = await axios.get(`http://localhost/coducation_backend/fetchMentorDetails.php?mentorIds=${mentorIds}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                setPopularMentors(Object.values(mentorResponse.data));
            } catch (error) {
                console.log(error);
            }
        };

        fetchPathDetails();
    }, [pathId]);

    if (!pathData) {
        return <div>Loading Path Details..</div>;
    }

    console.log(popularMentors);

    return (
        <div id="page-container">
            <Navbar />
            <div id="content-wrap">
                {userInfo &&
                    <PathHeader pathHeader={pathData.pathHeader} userType={userInfo.userType} userId={userId} />
                }
                <PathOverview pathData={pathData} />
                
                <PopularMentors mentors={popularMentors} />
                <PopularCourses pathData={pathData} />
                {pathData.benefits ?  
                    <PathBenefits pathData={pathData} />
                : ''}
                
                <PathChallenges pathData={pathData} />
            </div>
            <footer id="footer">
                <Footer />
            </footer>
        </div>
    );
};

export default PathDetailsPage;
