import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Form, FormControl as Input, FormLabel as Label, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

// CUSTOM
import { registerUser, resetErrors } from './slice';
import camera from '../../icons/camera.png';
import { defaultPic, imgUploadConfig } from '../../utils/globals';
import UniversitySearch from './UniversitySearch';

const Register = () => {

    const dispatch = useDispatch();
    const { errors, isPending } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(resetErrors());
    }, []);

    // local state for form values
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        university: '',
        profilePicture: defaultPic,   // blob or default image
        pictureExt: '',               // jpg png
        profilePictureUrl: ''          // url for the blob
    });


    // tracks change of input on form
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleChangeImage = e => {

        // image removed
        if (e.target.files.length === 0)
            setFormData({ ...formData, profilePicture: defaultPic });

        // once the uesr uploads a image, we compress it
        else {
            async function handleImageUpload(event) {

                try {
                    const compressedFile = await imageCompression(event.target.files[0], imgUploadConfig);

                    setFormData(
                        {
                            ...formData,
                            profilePicture: compressedFile,
                            pictureExt: e.target.files[0].name.split('.')[1],
                            profilePictureUrl: URL.createObjectURL(compressedFile)
                        });
                } catch { }

            }

            handleImageUpload(e)

        }
    }

    const getUniversity = (result) => {
        setFormData({ ...formData, university: result });
    }

    // trigger for when the user submits the form
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({ ...formData }));
    };

    return (
        <>
            <Form onSubmit={onSubmit}>

                <div className={errors.profilePicture ? 'text-center error' : 'text-center'} >
                    <div className='text-center'>
                        <label className='profilePicPreview' htmlFor='proPicture' style={{ backgroundImage: `url(${formData.profilePicture === defaultPic ? defaultPic : formData.profilePictureUrl})` }} >
                            <Input type='file' name='profilePicture' id='proPicture' accept='image/*' onChange={handleChangeImage} />
                            <img src={camera} />
                        </label>
                    </div>
                    <span className='error'>{errors.profilePicture}</span>
                </div>
                <br />

                <Container>

                    <Row>
                        <Col style={{ paddingLeft: '0px' }}>
                            <div className={errors.firstName ? 'error' : ''} >
                                <Label>First Name</Label>
                                <Input type='text' name='firstName' value={formData.firstName} onChange={onChange} />
                                <span>{errors.firstName} &nbsp; </span>
                            </div>
                        </Col>
                        <Col style={{ paddingRight: '0px' }}>
                            <div className={errors.lastName ? 'error' : ''} >
                                <Label>Last Name</Label>
                                <Input type='text' name='lastName' value={formData.lastName} onChange={onChange} />
                                <span className='error'>{errors.lastName} &nbsp;</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <UniversitySearch error={errors.university} getUniversity={getUniversity} />

                <div className={errors.email ? 'error' : ''} >
                    <Label>Email</Label>
                    <Input type='text' name='email' value={formData.email} onChange={onChange} />
                    <span className='error'> 
                        {errors.email !== 'This email exist already' &&
                            <span>{errors.email}</span> ||
                            <span>{errors.email} <Link to='/login' className='text-danger'>login here</Link></span>
                        }
                        &nbsp;
                    </span>
                </div>

                <div className={errors.password ? 'error' : ''} >
                    <Label>Password</Label>
                    <Input type='password' name='password' value={formData.password} onChange={onChange} />

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

export default Register;