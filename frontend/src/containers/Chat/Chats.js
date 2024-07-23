import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';
import { Button, Form, FormControl as Input, FormLabel as Label, Row, Col } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom";
import "./chats.css"
import profilepic from '../../icons/Alia.jpg';
import search from '../../icons/search.png';
import { getChats } from '../../redux/actions/chatsActions';

import formatDate from '../../utils/formatDate';
const Chats = ({ chats }) => {

    return (
        <>
            {
                <div>
                    <Button className='find_bud_btn'>
                        <img src={search} alt="" /> Find Buddies
                    </Button>

                    {chats.map((chat, index) => ( 
                        <NavLink key={index} className='chat' to={"/chat/" + index}>
                            <div className='propic'><img src={profilepic} alt="" /></div>
                            <div className='name'>Alia
                                <div style={{ "fontSize": "8px" }}>{chat._id}- {chat.user1} - {chat.user2} </div>

                            </div>
                            <div className='msg_time'>{formatDate(chat.last_message)}</div>
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