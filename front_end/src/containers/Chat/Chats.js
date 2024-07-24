import React from 'react';
import { connect } from 'react-redux'; 
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

// CUSTOM
import { getChats } from '../../redux/actions/chatsActions';
import formatDate from '../../utils/formatDate';

import profilepic from '../../icons/Alia.jpg';
import search from '../../icons/search.png';
import './chats.css'

const Chats = ({ chats }) => {

    return (
        <>
            {
                <div>
                    <Button className='find_bud_btn'>
                        <img src={search} alt='' /> Find Buddies
                    </Button>

                    {chats.map((chat, index) => ( 
                        <NavLink key={index} className='chat' to={'/chat/' + index}>
                            <div className='propic'><img src={profilepic} alt='' /></div>
                            <div className='name'>Alia
                                <div style={{ 'fontSize': '8px' }}>{chat._id}- {chat.user1} - {chat.user2} </div>

                            </div>
                            <div className='msg_time'>{formatDate(chat.lastMessage)}</div>
                        </NavLink>
                    ))}
                </div>
            }
        </>
    );
}





const mapStateToProps = state => ({
    chats: state.chats.chats
});

export default connect(mapStateToProps, { getChats })(Chats);