import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PublicRoute = ({component: Component}) => {
    const {isAuthenticated, tokenData} = useSelector(state => state.auth);
    return isAuthenticated ? <Navigate to="/chats" /> : <Component user={tokenData} />;
}; 

export default PublicRoute;