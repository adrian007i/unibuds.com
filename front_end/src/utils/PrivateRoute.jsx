import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = ({ component: Component, ws}) => { 
    const {isAuthenticated,tokenData} = useSelector(state => state.auth)
    return isAuthenticated ? <Component user={tokenData} ws={ws} /> : <Navigate to='/' />;
};
 
export default PrivateRoute;