import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Form, FormControl as Input, FormLabel as Label, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import axios from 'axios';

// CUSTOM
import { registerUser, resetErrors, searchUniversity } from './slice';
import camera from '../../icons/camera.png';
import { defaultPic, imgUploadConfig } from '../../utils/globals';
import debounce from '../../utils/debounce'

const Register = () => {

    const dispatch = useDispatch();
    const { errors, isPending, universities, universitiesPending } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(resetErrors());
    }, []);

    const [uniDrop, setUniDrop] = useState('hide');
    const [uniSelected, setUniSelected] = useState(null);

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

    const universitySearch = (e) => {
        dispatch(searchUniversity(e.target.value));
    }

    // server side filtering prevents request to be sent every time a key is pressed
    const debouncedSearch = debounce(universitySearch, 400);


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

    // trigger for when the user submits the form
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({ ...formData, university: uniSelected ? uniSelected[0] : '' }));
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
                        <Col style={{ paddingLeft: "0px" }}>
                            <div className={errors.firstName ? 'error' : ''} >
                                <Label>First Name</Label>
                                <Input type='text' name='firstName' value={formData.firstName} onChange={onChange} />
                                <span>{errors.firstName} &nbsp; </span>
                            </div>
                        </Col>
                        <Col style={{ paddingRight: "0px" }}>
                            <div className={errors.lastName ? 'error' : ''} >
                                <Label>Last Name</Label>
                                <Input type='text' name='lastName' value={formData.lastName} onChange={onChange} />
                                <span className='error'>{errors.lastName} &nbsp;</span>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <div className={errors.university ? 'error' : ''} >

                    <input type='hidden' value={uniSelected ? uniSelected[0] : ''} />
                    <Label>University</Label>
                    <Input type='text'
                        className='universitySearch'
                        placeholder='Search'
                        name='university'
                        onKeyUp={(e) => {
                            debouncedSearch(e);
                        }}
                        onFocus={() => setUniDrop('')}
                    />
                    <div className={'universities ' + uniDrop}>
                        {(universitiesPending && <div className='searchMessage'>Loading...</div>) ||
                            (!universities && <div className='searchMessage'></div>) ||
                            (universities.length === 0 && <div className='searchMessage'>No Matches Found</div>) ||
                            (<div>
                                {
                                    universities.map((uni, i) => {
                                        return <div key={i} onClick={() => { setUniSelected([uni._id, uni.name]); setUniDrop('hide') }} className='uni'>{uni.name}</div>
                                    })
                                }
                            </div>)
                        }
                    </div>
                    <span className='error'>{errors.university} &nbsp;</span>
                </div>

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

export default Register;