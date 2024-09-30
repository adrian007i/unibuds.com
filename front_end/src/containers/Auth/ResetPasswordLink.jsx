import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, FormControl as Input, FormLabel as Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { resetPassword } from './slice';

const ResetPasswordLink = ({ userLink, userToken }) => {

    const [password, setPassword] = useState("");
    const { resetPasswordPending, resetPasswordError, resetPasswordSuccess } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(password));
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <br /><br />
                <div className={resetPasswordError ? 'error' : ''} >
                    <Input type='text' className='text-center' name='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter New Password' />
                    <div className='error text-center '>
                        <span>{resetPasswordError}</span>
                    </div>
                </div>




                <div className='mt-3 text-center'>
                    {
                        resetPasswordPending && <Button variant='primary disabled' type='button'> Saving ...</Button>
                        || <Button variant='primary' type='submit'> Save Password </Button> 
                    }
                </div>
            </Form>
            <br />


        </>
    );

}

export default ResetPasswordLink;