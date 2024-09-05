import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormControl as Input, FormLabel as Label, Row, Col, Container } from 'react-bootstrap';
import imageCompression from 'browser-image-compression';

import { setUserData } from './slice';
import camera from '../../icons/camera.png';
import { imgUploadConfig } from '../../utils/globals';
import UniversitySearch from '../Auth/UniversitySearch';

const User = () => {

    const dispatch = useDispatch();
    const { data, errors, setUserPending } = useSelector(state => state.user);

    // local state for form values
    const [formData, setFormData] = useState();
    const [proPicUrl, setProPicUrl] = useState('');
    const [proPicBlob, setProPicBlob] = useState(null);
    const [proPicExt, setProPicExt] = useState('');

    useEffect(() => {
        setFormData(data); 
        
        if (data) {
            setProPicUrl(import.meta.env.VITE_S3_ENDPOINT + data.profilePicture);
        }
    }, [data]);

    // tracks change of input on form
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // USER SUBMIT THE PROFILE UPDATE
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(setUserData({ formData, proPicBlob, proPicExt }));
    };

    const getUniversity = (result) => {
        setFormData({ ...formData, university: result });
    }

    const handleChangeImage = e => {

        // SET TO ORIGINAL PROFILE PICTURE
        if (e.target.files.length === 0) {
            setProPicUrl(import.meta.env.VITE_S3_ENDPOINT + data.profilePicture);
            setProPicBlob(null)
        }
        // COMPRESS THE IMAGE
        else {
            async function handleImageUpload(event) {

                try {
                    const compressedFile = await imageCompression(event.target.files[0], imgUploadConfig);
                    setProPicBlob(compressedFile)
                    setProPicUrl(URL.createObjectURL(compressedFile));
                    setProPicExt(e.target.files[0].name.split('.')[1])
                } catch { }
            }

            handleImageUpload(e)
        }
    }

    return (

        <>
            {(formData &&


                < div >
                    <Form onSubmit={onSubmit}>

                        <div className='text-center' >
                            <div className='text-center'>
                                <label
                                    className='profilePicPreview'
                                    htmlFor='proPicture'
                                    style={{ backgroundImage: `url(${proPicUrl})` }} >
                                    <Input type='file' name='profilePicture' id='proPicture' accept='image/*' onChange={handleChangeImage} />
                                    <img src={camera} />
                                </label>
                            </div>
                        </div>
                        <br />
                        <Container>
                            <Row>
                                <Col>
                                    <div className={errors.bio ? 'error' : ''} >
                                        <Form.Control name='bio' as='textarea' rows={3} value={formData.bio} onChange={onChange} placeholder='Tell us about yourself' />
                                        <span>{errors.bio} &nbsp; </span>
                                    </div>
                                </Col>
                            </Row>
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

                            <Row>
                                <Col xs={6} >
                                    <div className={errors.age ? 'error' : ''} >
                                        <Label>DOB</Label>
                                        <Input type='date' name='dob' value={formData.dob ? (formData.dob).slice(0, 10) : ''} onChange={onChange} />
                                        <span>{errors.age} &nbsp; </span>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className={errors.gender ? 'error' : ''} >
                                        <Label>Gender</Label>
                                        <Form.Select value={formData.gender} name='gender' onChange={onChange} >
                                            <option value=''>Select</option>
                                            <option value='male'>Male</option>
                                            <option value='female'>Female</option>
                                            <option value='other'>Other</option>
                                        </Form.Select>
                                        <span className='error'>{errors.gender} &nbsp;</span>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <div className={errors.major ? 'error' : ''} >
                                        <Label>Major</Label>
                                        <Input type='text' name='major' value={formData.major} onChange={onChange} />
                                        <span className='error'>{errors.major} &nbsp;</span>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <UniversitySearch error={errors.university} getUniversity={getUniversity} defaultVal = {formData.university} />
                                </Col>
                            </Row>



                            <Row>
                                <Col>
                                    <div className={errors.email ? 'error' : ''} >
                                        <Label>Email</Label>
                                        <Input type='text' name='email' value={formData.email} onChange={onChange} />
                                        <span className='error'>{errors.email} &nbsp;</span>
                                    </div>
                                </Col>
                            </Row>

                            <Button variant='primary' type='submit' disabled={setUserPending}>
                                {setUserPending && 'Saving ...'}
                                {!setUserPending && 'Update'}
                            </Button>

                        </Container>

                    </Form>
                </div >

                ||
                <div className='loader' style={{ 'textAlign': 'center' }}>
                    <br /><br /><br />
                    <div className='lds-facebook'><div></div><div></div><div></div></div>
                    <div>Loading Profile Data</div>
                </div>
            )}

        </>
    );
}



    ;

export default User;