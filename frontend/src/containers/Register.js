import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../redux/actions/auth';
import { Button, Form, FormControl as Input, FormLabel as Label, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = ({ registerUser, history, errors, user, isAuthenticated, isPending }) => {

    const navigate = useNavigate();
    useEffect(() => {
        if(isAuthenticated)
            navigate("/profile")
        
    }, [isAuthenticated]);


    // local state for form values
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
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
        registerUser(formData, history);

    };


    return (
        <>
            <Form onSubmit={onSubmit}>
                <Row>
                    <Col>
                        <div className={errors.first_name ? 'error' : ''} >
                            <Label>First Name</Label>
                            <Input type="text" name="first_name" value={formData.first_name} onChange={onChange} />
                            <span>{errors.first_name} &nbsp; </span>
                        </div>
                    </Col>
                    <Col>
                        <div className={errors.last_name ? 'error' : ''} >
                            <Label>Last Name</Label>
                            <Input type="text" name="last_name" value={formData.last_name} onChange={onChange} />
                            <span className='error'>{errors.last_name} &nbsp;</span>
                        </div>
                    </Col>
                </Row>

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

                <br />


                <Button variant="primary" type="submit" disabled={isPending}>
                    {isPending && "Saving ..."}
                    {!isPending && "Register"}
                </Button>
            </Form>
            <br />
            <p>Already Registered? <Link to="/login"> Login</Link></p>

        </>
    );
}


const mapStateToProps = state => ({
    errors: state.auth.errors,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    isPending: state.auth.isPending
});

export default connect(mapStateToProps, { registerUser })(Register);