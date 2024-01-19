import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/authActions';
import { Button, Form, FormControl as Input, FormLabel as Label } from 'react-bootstrap';
import { Link } from "react-router-dom"; 

const Login = ({ loginUser, errors, isPending }) => {


    // local state for form values
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // tracks change of input on form
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // trigger for when the user submits the form
    const onSubmit = (e) => {
        e.preventDefault();
        loginUser(formData);

    };
    return (
        <>
            <Form onSubmit={onSubmit}>
                <div className={errors.email ? 'error' : ''} >
                    <Label>Email</Label>
                    <Input type="text" name="email" value={formData.email} onChange={onChange} />
                    <span className='error'>{errors.email} &nbsp;</span>
                </div>

                <div className={errors.password ? 'error' : ''} >
                    <Label>Password</Label>
                    <Input type="password" name="password" value={formData.password} onChange={onChange} />
                    <span className='error'>{errors.password} &nbsp;</span>
                </div>

                <Button variant="primary" type="submit" disabled={isPending}>
                    {isPending && "Saving ..."}
                    {!isPending && "Login"}
                </Button>
                <div className={errors.message ? 'error' : ''} >
                    <span className='error'>{errors.message} &nbsp;</span>
                </div>
            </Form>
            <br />
            <p>Don&#39;t have an account? <Link to="/register"> Sign up</Link></p>

        </>
    );

}


const mapStateToProps = state => ({
    errors: state.auth.errors,  
    isPending: state.auth.isPending
});

export default connect(mapStateToProps, { loginUser })(Login);