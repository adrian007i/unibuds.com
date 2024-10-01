import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, FormControl as Input, FormLabel as Label } from 'react-bootstrap';

import { sendResetUrl } from './slice';

const ForgetPassword = () => {

    const { resetLinkError, resetLinkPending, resetLinkSent } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(sendResetUrl(email));
    }

    return (
        <>

            <div>
                <br />
                <div>
                    <p className='text-center'>
                        If you have an account with Unibuds<br />
                        You will recieve a password reset link shortly.
                    </p>
                </div>

                <br />

                {/* 
                
                NEED TO DO BACKEND FUNCTION TO VERIFY USER AND TOKEN
                AND INTEGRATE WITH FRONT END
                FIND EMAIL BROKER TO SEND OUT THE RESET LINK
                
                */}

                <Form onSubmit={onSubmit}>

                    <div className={resetLinkError ? 'error' : ''} > 
                        <Input type='text' className='text-center' name='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter Email Address' />
                        <div className='error text-center '>
                            <span>{resetLinkError}</span> 
                        </div>
                    </div>
                    <div className='mt-3 text-center'>
                        {
                            resetLinkSent && <div>Reset Link Sent <button className='buttonLikeLink' type='submit'> Send Again </button></div>
                            || !resetLinkPending && <Button variant='primary' type='submit'> Send Link </Button>
                            || <Button variant='primary disabled' type='button'> Sending ...</Button>
                        }
                    </div>
                </Form>
            </div>


        </>
    );

}

export default ForgetPassword;