import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post('http://localhost/coducation_backend/validateToken.php', { token })
        .then(response => {
          console.log(response);
          if (response.data.valid) {
            setIsAuthenticated(true);
            setUserId(localStorage.getItem('user_id'));
            // Fetch user info here and store it in userInfo state
            fetchUserData(token);
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            setIsAuthenticated(false);
          }
        })
        .catch(error => {
          console.error(error);
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
          setIsAuthenticated(false);
        });
    } else {
      setIsAuthenticated(false);
      setUserId(null);
      setUserInfo(null);
    }
  }, []);

  const fetchUserData = (token) => {
    axios.get('http://localhost/coducation_backend/get_user_info.php', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response);
        if (response.data.success) {
          setUserInfo(response.data);
        } else {
          setUserInfo(null);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setUserInfo(null);
      });
  };

  const login = (token, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user_id', userId);
    setIsAuthenticated(true);
    setUserId(userId);
    // Fetch user info when logging in
    fetchUserData(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    setIsAuthenticated(false);
    setUserId(null);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
