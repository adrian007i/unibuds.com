import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';
import { Button, Form, FormControl as Input, FormLabel as Label, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom"; 
import "./chat.css"
import profilepic from '../../icons/Alia.jpg';
import  search from '../../icons/search.png';

const Chats = ({ errors, isPending }) => {

 

    return (
        <>  
            <Button className='find_bud_btn'>
                <img src={search} alt="" /> Find Buddies 
            </Button>

             <Link className='chat' to="chat/1234567890">
                <div className='propic'><img src={profilepic} alt="" /></div> 
                <div className='name'>Alia</div> 
                <div className='msg_time'>9.55 pm</div>
             </Link>
             <Link className='chat' to="chat/1234567890">
                <div className='propic'><img src={profilepic} alt="" /></div> 
                <div className='name'>Alia</div> 
                <div className='msg_time'>9.55 pm</div>
             </Link>
             <Link className='chat' to="chat/1234567890">
                <div className='propic'><img src={profilepic} alt="" /></div> 
                <div className='name'>Alia</div> 
                <div className='msg_time'>9.55 pm</div>
             </Link>
             <Link className='chat' to="chat/1234567890">
                <div className='propic'><img src={profilepic} alt="" /></div> 
                <div className='name'>Alia</div> 
                <div className='msg_time'>9.55 pm</div>
             </Link>
             
            
        </>
    );
}





const mapStateToProps = state => ({
    errors: state.auth.errors,
    isAuthenticated: state.auth.isAuthenticated,
    isPending: state.auth.isPending
});

export default connect(mapStateToProps, {   })(Chats);