import {
    Button, Form,
    FormControl as Input,
    FormLabel as Label,
    Row, Col
} from 'react-bootstrap';

import { Link } from "react-router-dom";

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../redux/actions/auth';

const Register = ({ registerUser, history, error }) => {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });

    const { first_name, last_name, email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            first_name,
            last_name,
            email,
            password
        }; 
        registerUser(newUser, history);
    };

    return (
        <>
            <Form onSubmit={onSubmit}>
                <Row>
                    <Col>
                        <Label>First Name</Label>
                        <Input type="text" name="first_name" value={first_name} onChange={onChange}  />
                    </Col>
                    <Col>
                        <Label>Last Name</Label>
                        <Input type="text" name="last_name" value={last_name} onChange={onChange} />
                    </Col>
                </Row>

                <Label>Email</Label>
                <Input type="text" name="email" value={email} onChange={onChange}/>

                <Label>Password</Label>
                <Input type="password" name="password" value={password} onChange={onChange}/>

                <br />
                <Button variant="primary" type="submit" >
                    Register
                </Button>
            </Form>
            <br />
            <p>Already Registered? <Link to="/login"> Login</Link></p>
        </>
    );
}


const mapStateToProps = (state) => ({
    error: state.auth.error
  });
  
  export default connect(mapStateToProps, { registerUser })(Register);