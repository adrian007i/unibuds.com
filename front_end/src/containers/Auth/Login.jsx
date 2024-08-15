import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, FormControl as Input, FormLabel as Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';  

import { loginUser } from './slice';

const Login = () => {
    
    const dispatch = useDispatch(); 
    const {errors, isPending} = useSelector((state) => state.auth);  

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
        dispatch(loginUser(formData));

    };
    return (
        <>
            <Form onSubmit={onSubmit}>
                <div className={errors.email ? 'error' : ''} >
                    <Label>Email</Label>
                    <Input type='text' name='email' value={formData.email} onChange={onChange} />
                    <span className='error'>{errors.email} &nbsp;</span>
                </div>

                <div className={errors.password ? 'error' : ''} >
                    <Label>Password</Label>
                    <Input type='password' name='password' value={formData.password} onChange={onChange} />
                    <span className='error'>{errors.password} &nbsp;</span>
                </div>

                <Button variant='primary' type='submit' disabled={isPending}>
                    {isPending && 'Verifying ...'}
                    {!isPending && 'Login'}
                </Button>
                <div className={errors.message ? 'error' : ''} >
                    <span className='error'>{errors.message} &nbsp;</span>
                </div>
            </Form>
            <br />
            <p>Don&#39;t have an account? <Link to='/register'> Sign up</Link></p>

        </>
    );

}

export default Login;