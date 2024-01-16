import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';


const PrivateRoute = ({ component: Component, isAuthenticated, user}) => { 
    return isAuthenticated ? <Component user={user} /> : <Navigate to="/" />;
};

// Map state to props
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps)(PrivateRoute);