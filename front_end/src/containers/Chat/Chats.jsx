import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { json, NavLink } from 'react-router-dom';
import axios from 'axios';
// CUSTOM
import formatDate from '../../utils/formatDate';

import search from '../../icons/search.png';
import './chats.css';

const Chats = ({user}) => {

    const { data } = useSelector(state => state.chat); 
    return (
        <>
            {
                <div>
                    {/* {JSON.stringify} */}
                    <Button className='find_bud_btn'>
                        <img src={search} alt='' /> Find Buddies
                    </Button>
                    {data && data.map((chat, index) => {  

                        const otherUser = user._id === chat.user1._id ? chat.user2 : chat.user1; 

                        return (<NavLink key={index} className='chat' to={'/chat/' + chat._id}>
                            {/*  */}
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
            }
        </>
    );
}

export default Chats