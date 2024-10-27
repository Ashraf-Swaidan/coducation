import React, { useState, useEffect, useContext } from 'react';
import PathCard from './PathCard'; 
import './Paths_list.css'; 
import axios from 'axios';
import { AuthContext } from '../../AuthContext';

const PathsList = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [paths, setPaths] = useState([]);

    useEffect(() => {
        const fetchPaths = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost/coducation_backend/fetchPaths.php', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });


                console.log(response);
                setPaths(response.data);
               
            } catch (error) {
                console.error(error);
            }
        };

        fetchPaths();
    }, [isAuthenticated]);

    return (
        <div className="paths-list">
            <h2 className="section-title">Explore Paths</h2>
            <div className="path-cards">
                {paths.map(path => (
                    <PathCard
                        key={path.path_id}
                        id={path.path_id}
                        title={path.title}
                        description={path.description}
                        imagePath={`http://localhost/coducation_backend/uploads/${path.image}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default PathsList;
