import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserData, setUserData } from '../redux/actions/userActions';
import { Text, Button, Form, FormControl as Input, FormLabel as Label, Row, Col } from 'react-bootstrap';
import profilepic from '../icons/profile.png';

const User = ({ getUserData, setUserData, user, user_id, errors, get_user_pending, set_user_pending }) => {


    // local state for form values
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            if (user === null)
                await getUserData(user_id);
            else
                setFormData(user);
        };

        fetchData();
    }, [user]);

    // tracks change of input on form
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // trigger for when the user submits the form
    const onSubmit = (e) => {
        e.preventDefault();
        setUserData(formData)

    };

    return (

        <>
            {(!get_user_pending && user != null &&

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
                                    <Form.Control name="bio" as="textarea" rows={3} value={formData.bio} onChange={onChange} placeholder='Tell us about yourself' />
                                    <span>{errors.bio} &nbsp; </span>
                                </div>
                            </Col>
                        </Row>
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

                        <Row>
                            <Col>
                                <div className={errors.age ? 'error' : ''} >
                                    <Label>DOB</Label>
                                    <Input type="date" name="dob" value={formData.dob ? (formData.dob).slice(0,10) : ""}  onChange={onChange} />
                                    <span>{errors.age} &nbsp; </span>
                                </div>
                            </Col>
                            <Col>
                                <div className={errors.gender ? 'error' : ''} >
                                    <Label>Gender</Label>
                                    <Form.Select value={formData.gender} name="gender" onChange={onChange} >
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
                                    <Input type="text" name="major" value={formData.major} onChange={onChange} />
                                    <span className='error'>{errors.major} &nbsp;</span>
                                </div>
                            </Col>
                            <Col>
                                <div className={errors.campus_location ? 'error' : ''} >
                                    <Label>Campus Location</Label>
                                    <Form.Select value={formData.campus_location} name="campus_location" onChange={onChange} >
                                        <option value="">Select</option>
                                        <option value="ccc">I gotta add these</option>
                                    </Form.Select>
                                    <span className='error'>{errors.campus_location} &nbsp;</span>
                                </div>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className={errors.email ? 'error' : ''} >
                                    <Label>Email</Label>
                                    <Input type="text" name="email" value={formData.email} onChange={onChange} />
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

                        <Button variant="primary" type="submit" disabled={set_user_pending}>
                            {set_user_pending && "Saving ..."}
                            {!set_user_pending && "Update"}
                        </Button>
                    </Form>
                </div>

                ||
                <div>loading</div>
            )}

        </>
    );
}



const mapStateToProps = state => ({
    user: state.user.data,
    user_id: state.auth.token_data._id,
    errors: state.user.errors,
    get_user_pending: state.user.get_user_pending,
    set_user_pending: state.user.set_user_pending
});

export default connect(mapStateToProps, { getUserData, setUserData })(User);