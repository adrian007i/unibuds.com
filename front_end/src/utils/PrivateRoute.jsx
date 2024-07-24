import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = ({ component: Component}) => { 
    const {isAuthenticated,tokenData} = useSelector(state => state.auth)
    return isAuthenticated ? <Component user={tokenData} /> : <Navigate to='/' />;
};
 
export default PrivateRoute;