import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormControl as Input, FormLabel as Label, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// CUSTOM
import { registerUser } from '../../redux/actions/authActions';
import camera from '../../icons/camera.png';

const Register = ({ registerUser, errors, isPending }) => {


    // local state for form values
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        profilePicture: '/proPicDefault.jpg'
    });

    // tracks change of input on form
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleChangeImage = e => {
        if (e.target.files.length === 0)
            setFormData({ ...formData, profilePicture: '/proPicDefault.jpg' });
        else
            setFormData({ ...formData, profilePicture: URL.createObjectURL(e.target.files[0]) });
    }


    // trigger for when the user submits the form
    const onSubmit = (e) => {
        e.preventDefault();
        registerUser(formData); 
    };

    return (
        <>
            <Form onSubmit={onSubmit}>

                <div className={errors.profilePicture ? 'text-center error' : 'text-center'} >
                    <div className='text-center'>
                        <label className='profilePicPreview' htmlFor='proPicture' style={{ backgroundImage: `url(${formData.profilePicture})` }} >
                            <Input type='file' name='profilePicture' id='proPicture' onChange={handleChangeImage} />
                            <img src={camera} />
                        </label>
                    </div>
                    <span className='error'>{errors.profilePicture}</span>
                </div>
                <br />


                <Row>
                    <Col>
                        <div className={errors.firstName ? 'error' : ''} >
                            <Label>First Name</Label>
                            <Input type='text' name='firstName' value={formData.firstName} onChange={onChange} />
                            <span>{errors.firstName} &nbsp; </span>
                        </div>
                    </Col>
                    <Col>
                        <div className={errors.lastName ? 'error' : ''} >
                            <Label>Last Name</Label>
                            <Input type='text' name='lastName' value={formData.lastName} onChange={onChange} />
                            <span className='error'>{errors.lastName} &nbsp;</span>
                        </div>
                    </Col>
                </Row>

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

                <br />


                <Button variant='primary' type='submit' disabled={isPending}>
                    {isPending && 'Saving ...'}
                    {!isPending && 'Register'}
                </Button>
            </Form>
            <br />
            <p>Already Registered? <Link to='/login'> Login</Link></p>

        </>
    );
}





const mapStateToProps = state => ({
    errors: state.auth.errors,
    isPending: state.auth.isPending
});

export default connect(mapStateToProps, { registerUser })(Register);