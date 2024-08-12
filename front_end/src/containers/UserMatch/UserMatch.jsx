import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink , useNavigate } from 'react-router-dom';
import axios from 'axios';

// CUSTOM 
import './userMatch.css';
import '../../loader.css'
import buddy from '../../icons/buddy.png';

import { fetchMatch, acceptMatch } from './slice';
import { addNewChat } from '../Chat/slice';

const UserMatch = () => {

    const { isPending, matchedUser, startingMatch, newChat } = useSelector(state => state.match)
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    useEffect(() =>{
        if(newChat){
            dispatch(addNewChat(newChat)) ;
            navigate('/chat/'+newChat._id)
        }
            
        
    },[newChat])

    const acceptMatchSubmit = async (user) =>{   
        dispatch(acceptMatch(user)); 
        
        
    }

    return (
        <>
            <div className='match'>
                {matchedUser === null &&
                    <div className='findBuddy'>
                        <img src={buddy} alt="" className='findABuddyIcon' />

                        {isPending &&
                            <div className="loader">
                                <div className="lds-facebook"><div></div><div></div><div></div></div>
                                <div>Finding You A Buddy</div>
                            </div>
                            ||
                            <button className='findBuddyBtn' onClick={() => dispatch(fetchMatch())}>
                                Find a Uni Buddy
                            </button>
                        }
                    </div>
                    ||
                    <div>
                        <div className='text-center'>
                            <label
                                className='profilePicPreview'
                                style={{ backgroundImage: `url(${
                                    matchedUser.profilePicture ? 
                                    axios.defaults.baseURL + 'uploads/' + matchedUser.profilePicture :
                                    '/proPicDefault.jpg'})` }} >
                            </label>
                        </div>
                        <div className='profileDetails'>
                            <h1>{matchedUser.firstName}</h1>
                            <p>
                                {matchedUser.campusLocation}
                                <span className='bullet'>&#8226;</span>
                                {matchedUser.major}
                                <span className='bullet'>&#8226;</span>
                                {matchedUser.gender}
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