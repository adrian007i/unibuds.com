import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux'; 
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

// CUSTOM
import formatDate from '../../utils/formatDate';

import profilepic from '../../icons/Alia.jpg';
import search from '../../icons/search.png';
import './chats.css';

const Chats = () => {

    const {data} = useSelector(state => state.chat); 
    const user = useSelector(state => state.user); 
    
    return (
        <>
            {
                <div>
                    {/* {JSON.stringify} */}
                    <Button className='find_bud_btn'>
                        <img src={search} alt='' /> Find Buddies
                    </Button> 
                    {data && data.map((chat, index) => (  
                        <NavLink key={index} className='chat' to={'/chat/' + index}>
                            <div className='propic'><img src={profilepic} alt='' /></div>
                            <div className='name'>Alia
                                {/* {chat._id}- {chat.user1} - {chat.user2} */}
                                <div style={{ 'fontSize': '8px' }}></div>

                            </div>
                            <div className='msg_time'>{formatDate(chat.lastMessage)}</div>
                        </NavLink>
                    ))}
                </div>
            }
        </>
    );
} 

export default Chats