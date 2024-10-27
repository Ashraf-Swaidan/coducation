import { AuthContext } from './AuthContext';

import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoute = () => {

    const { isAuthenticated } = useContext(AuthContext);

return (
    isAuthenticated ? <Outlet/> : <Navigate to='validate/login'/>
  )
}

export default PrivateRoute