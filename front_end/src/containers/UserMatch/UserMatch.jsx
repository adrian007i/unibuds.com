import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

// CUSTOM 
import './userMatch.css';
import '../../loader.css'
import buddy from '../../icons/buddy.png';

import { fetchMatch, acceptMatch, clearNewChat } from './slice';
import { addNewChat } from '../Chat/slice';

const UserMatch = () => {

    const { isPending, matchedUser, newChat } = useSelector(state => state.match)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (newChat) {
            dispatch(addNewChat(newChat));
            navigate('/chat/' + newChat._id);
            dispatch(clearNewChat());
        }
    }, [newChat])

    const acceptMatchSubmit = async (user) => {
        dispatch(acceptMatch(user));


    }

    return (
        <>
            <div className='match'>
                {(matchedUser === null || matchedUser.error ) &&
                    <div className='findBuddy'>
                        <img src={buddy} alt="" className='findABuddyIcon' />

                        {isPending &&
                            <div className="loader">
                                <div className="lds-facebook"><div></div><div></div><div></div></div>
                                <div>Finding You A Buddy</div>
                            </div>
                            ||
                            <div>
                                <button className='findBuddyBtn' onClick={() => dispatch(fetchMatch())}>
                                    Find a Uni Buddy
                                </button> 
                                <div className='text-danger'>{matchedUser && matchedUser.error ? matchedUser.error : ''}</div>
                            </div>
                        }
                    </div>
                    ||
                    <div>
                        <div className='text-center'>
                            <label
                                className='profilePicPreview'
                                style={{
                                    backgroundImage: `url(${matchedUser.profilePicture ?
                                        import.meta.env.VITE_S3_ENDPOINT + matchedUser.profilePicture :
                                        '/proPicDefault.jpg'})`
                                }} >
                            </label>
                        </div>
                        <div className='profileDetails'>
                            <h1>{matchedUser.firstName}</h1>
                            <p> 
                                {matchedUser.major}
                            </p>
                            <p className='bio'>
                                {matchedUser.bio}
                            </p>

                            <button className='startChatBtn' onClick={() => acceptMatchSubmit(matchedUser)}>
                                Start Chat
                            </button>

                            <button className='skipChatBtn' onClick={() => dispatch(fetchMatch())}>
                                Skip
                            </button>
                        </div>


                    </div>
                }
            </div>
        </>
    );
}

export default UserMatch