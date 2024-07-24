import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormControl as Input, FormLabel as Label, Row, Col } from 'react-bootstrap';
import { getUserData, setUserData } from './slice';

// PRO PIC
import profilepic from '../../icons/profile.png';

const User = () => {

    const dispatch = useDispatch();
    const { data, errors, setUserPending, getUserPending } = useSelector(state => state.user);

    // local state for form values
    const [formData, setFormData] = useState({
        bio: '',
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        major: '',
        campusLocation: '',
        email: ''
    });

    useEffect(() => {
        !data ? dispatch(getUserData()) : setFormData(data);
    }, [data]);

    // tracks change of input on form
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // trigger for when the user submits the form
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(setUserData(formData));
    };

    return (

        <>
            {(!getUserPending && data &&

                <div>
                    <Form onSubmit={onSubmit}>
                        <br />

                        <div>
                            <img src={profilepic} alt="" style={{ display: "block", width: "100px", height: "100px", border: "1px dashed white", borderRadius: "50%", margin: "auto" }} />
                        </div>
                        <br />
                        <Row>
                            <Col>
                                <div className={errors.bio ? 'error' : ''} >
                                    <Form.Control name="bio" as="textarea" rows={3} value={!formData || formData.bio} onChange={onChange} placeholder='Tell us about yourself' />
                                    <span>{errors.bio} &nbsp; </span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className={errors.firstName ? 'error' : ''} >
                                    <Label>First Name</Label>
                                    <Input type="text" name="firstName" value={!formData || formData.firstName} onChange={onChange} />
                                    <span>{errors.firstName} &nbsp; </span>
                                </div>
                            </Col>
                            <Col>
                                <div className={errors.lastName ? 'error' : ''} >
                                    <Label>Last Name</Label>
                                    <Input type="text" name="last_name" value={!formData || formData.lastName} onChange={onChange} />
                                    <span className='error'>{errors.lastName} &nbsp;</span>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <div className={errors.age ? 'error' : ''} >
                                    <Label>DOB</Label>
                                    <Input type="date" name="dob" value={formData && formData.dob ? (formData.dob).slice(0, 10) : ""} onChange={onChange} />
                                    <span>{errors.age} &nbsp; </span>
                                </div>
                            </Col>
                            <Col>
                                <div className={errors.gender ? 'error' : ''} >
                                    <Label>Gender</Label>
                                    <Form.Select value={!formData || formData.gender} name="gender" onChange={onChange} >
                                        <option value="">Select</option>
                                        <option value="male">male</option>
                                        <option value="female">female</option>
                                        <option value="other">other</option>
                                    </Form.Select>
                                    <span className='error'>{errors.gender} &nbsp;</span>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <div className={errors.major ? 'error' : ''} >
                                    <Label>Major</Label>
                                    <Input type="text" name="major" value={!formData || formData.major} onChange={onChange} />
                                    <span className='error'>{errors.major} &nbsp;</span>
                                </div>
                            </Col>
                            <Col>
                                <div className={errors.campusLocation ? 'error' : ''} >
                                    <Label>Campus Location</Label>
                                    <Form.Select value={!formData || formData.campusLocation} name="campusLocation" onChange={onChange} >
                                        <option value="">Select</option>
                                        <option value="ccc">I gotta add these</option>
                                    </Form.Select>
                                    <span className='error'>{errors.campusLocation} &nbsp;</span>
                                </div>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className={errors.email ? 'error' : ''} >
                                    <Label>Email</Label>
                                    <Input type="text" name="email" value={!formData || formData.email} onChange={onChange} />
                                    <span className='error'>{errors.email} &nbsp;</span>
                                </div>
                            </Col>
                        </Row>

                        {/* <Row>
                        <div className={errors.password ? 'error' : ''} >
                            <Label>Password</Label>
                            <Input type="password" name="password" value={formData.password} onChange={onChange} />
                            <span className='error'>{errors.password} &nbsp;</span>
                        </div>
                    </Row> */}

                        <Button variant="primary" type="submit" disabled={setUserPending}>
                            {setUserPending && "Saving ..."}
                            {!setUserPending && "Update"}
                        </Button>
                    </Form>
                </div>

                ||
                <div>loading</div>
            )}

        </>
    );
}



    ;

export default User;