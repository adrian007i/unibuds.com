import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';
import { Button, Form, FormControl as Input, FormLabel as Label, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom"; 

const Chat = ({ errors, isPending }) => {

 

    return (
        <> 
            <Input type="search" name="email" />
            
        </>
    );
}





const mapStateToProps = state => ({
    errors: state.auth.errors,
    isAuthenticated: state.auth.isAuthenticated,
    isPending: state.auth.isPending
});

export default connect(mapStateToProps, {   })(Chat);