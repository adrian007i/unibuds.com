import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';


const PublicRoute = ({ component: Component, isAuthenticated, user }) => {
    return isAuthenticated ? <Navigate to="/chats" /> : <Component user={user} />;
};

// Map state to props
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps)(PublicRoute);