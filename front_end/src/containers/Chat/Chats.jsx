import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

// CUSTOM
import formatDate from '../../utils/formatDate';
import './chats.css';

const Chats = ({ user }) => {

    const { data, loadingChats } = useSelector(state => state.chat);

    return (
        <>
            {
                <div>
                    {(loadingChats || data === null) &&
                        <div className="loader" style={{ 'textAlign': 'center' }}>
                            <br /><br /><br />
                            <div className="lds-facebook"><div></div><div></div><div></div></div>
                            <div>Loading Messages</div>
                        </div>

                        || (data.length === 0) &&
                        <div className='noChats'>
                            You dont have any messages.
                            <br />
                            <NavLink className='find_a_buddy' to={'/find_a_buddy'} >
                                Click here to get started
                            </NavLink>
                        </div>
                        || data.map((chat, index) => {

                            const otherUser = user._id === chat.user1._id ? chat.user2 : chat.user1;
                            const newMessage = (user._id === chat.user1._id && chat.userA_Unread) || (user._id === chat.user2._id && chat.userB_Unread)

                            return (<NavLink key={index} className='chat' to={'/chat/' + chat._id}>
                                {/*  */}
                                <div className='propic'>
                                    <img src={import.meta.env.VITE_S3_ENDPOINT + otherUser.profilePicture} alt='' />
                                </div>
                                <div className='name'>
                                    {otherUser.firstName}
                                    <span className='newMsg'> 
                                            
                                    </span> 
                                    <div>

                                    </div>
                                    <div className={newMessage ? 'last_message new_message' : 'last_message'}>
                                        {chat.messages.length > 0 && chat.messages.at(-1).msg}
                                    </div>

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