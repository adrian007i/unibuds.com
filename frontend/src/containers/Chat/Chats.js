import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';
import { Button, Form, FormControl as Input, FormLabel as Label, Row, Col } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom";
import "./chats.css"
import profilepic from '../../icons/Alia.jpg';
import search from '../../icons/search.png';
import { getChats } from '../../redux/actions/chatsActions';

const Chats = ({ chats, loading_chats, getChats }) => {

    if (!chats) getChats();

    const formatDate = (date) =>{ 
        const msg_date = new Date(date); 
        const today = new Date();
        const days_diff = parseInt((today - msg_date) / (1000 * 60 * 60 * 24), 10); 
        
        if(days_diff !== 0)
            return `${days_diff} day${days_diff > 1 ? 's' : ''} ago`;
        else
            return msg_date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })  ;     
    }

    return (
        <>
            {!loading_chats &&
                <div>
                    <Button className='find_bud_btn'>
                        <img src={search} alt="" /> Find Buddies
                    </Button>

                    {chats && chats.map((chat, index) => (
                        // 66988e952ffb3d2cac66ea1c
                        <NavLink key={index} className='chat' to={"/chat/"+chat._id}>
                            <div className='propic'><img src={profilepic} alt="" /></div>
                            <div className='name'>Alia
                            <div style={{"fontSize" : "8px"}}>{chat._id}- {chat.user1} - {chat.user2} </div>

                            </div>
                            <div className='msg_time'>{formatDate(chat.last_message)}</div>
                        </NavLink>
                    ))}
                </div>

                ||
                <div>Pending</div>

            }
        </>
    );
}





const mapStateToProps = state => ({
    chats: state.chats.chats,
    loading_chats: state.chats.loading_chats
});

export default connect(mapStateToProps, { getChats })(Chats);