import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

// CUSTOM
import formatDate from '../../utils/formatDate';
import './userMatch.css';

const UserMatch = ( ) => {
 
    return (
        <>
            {/* {
                <div> 
                    {data && data.map((chat, index) => {  

                        const otherUser = user._id === chat.user1._id ? chat.user2 : chat.user1; 

                        return (<NavLink key={index} className='chat' to={'/chat/' + chat._id}> 
                            <div className='propic'>
                                <img src={axios.defaults.baseURL + 'uploads/' + otherUser.profilePicture} alt='' />
                            </div>
                            <div className='name'>{otherUser.firstName}
                                
                                <div style={{ 'fontSize': '8px' }}></div>

                            </div>
                            <div className='msg_time'>{formatDate(chat.lastMessage)}</div>
                        </NavLink>)
                    }
                    )}
                </div>
            } */}
            helloo
        </>
    );
}

export default UserMatch