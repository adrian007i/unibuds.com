import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';
import { Button, Form, FormControl as Input, FormLabel as Label, Row, Col } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom";
import "./chats.css"
import profilepic from '../../icons/Alia.jpg';
import search from '../../icons/search.png';
import { getChats } from '../../redux/actions/chatsActions';

const Chats = ({ chats, isPending, getChats }) => {

    useEffect(() => {
        if (chats.length === 0)
            getChats();
        
    }, [chats]);




    return (
        <>
            {!isPending &&
                <div>
                    <Button className='find_bud_btn'>
                        <img src={search} alt="" /> Find Buddies
                    </Button>

                    {chats.map((element, index) => (
                       <NavLink key={index} className='chat' to="/chat/1234567890">
                            <div className='propic'><img src={profilepic} alt="" /></div>
                            <div className='name'>Alia</div>
                            <div className='msg_time'>9.55 pm</div>
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
    isPending: state.chats.isPending
});

export default connect(mapStateToProps, { getChats })(Chats);