import React, { useState, useEffect, useSearchParams } from 'react';
import { connect } from 'react-redux'; 
import { Button, Form, FormControl as Input, FormLabel as Label, Row, Col } from 'react-bootstrap';
import { Link, NavLink, useParams } from "react-router-dom";
import "./chats.css"
import "./chat.css";
import profilepic from '../../icons/Alia.jpg'; 
import {sendMessage , getChats} from '../../redux/actions/chatsActions'; 

const Chat = ({ sendMessage, getChats, chats }) => { 

    const { chat_id } = useParams(); 
    if (!chats) getChats();   
    
    const [new_msg, set_new_msg] = useState("");

    const onSubmit = (e) => {
        e.preventDefault(); 

        // document.getElementsByClassName("messages")[0].append(`<div className='msg recieve'>${new_msg}</div>`);
        sendMessage({ 
            "message": new_msg,
            "user1": "",
            "user2": "",
            "chat_id":chat_id 
        });   
        set_new_msg("")
    };

     
    return ( 
        <>
            <div className="user">
                <NavLink className='chat chat_small' to="/chat/1234567890">
                    <div className='propic'><img src={profilepic} alt="" /></div>
                    <div className='name'>Alia {chat_id}</div>
                </NavLink>
            </div> 
            <div className="messages">
                <div className='msg recieve'>{JSON.stringify(chats)} {chat_id}</div>
                 {/* {messages["669b076d525ee97ff4ba86a2"] && messages["669b076d525ee97ff4ba86a2"].map(msg =>
                    <div className='msg recieve'>{msg}</div>
                )}  */}

            </div>

            <div className="msg_box">
                <div className="msg_box_flex">
                    <Input className='input_msg' onChange={e => {set_new_msg(e.target.value)}} value={new_msg} placeholder='Enter Message Here'></Input>
                    <Button className='send' type='button' onClick={onSubmit}>Send</Button>
                </div>
            </div>
        </>
    );
}





const mapStateToProps = state => ({  
    // isPending: state.chat.isPending,
    // messages: state.chat.messages,
    chats: state.chats.chats

});

export default connect(mapStateToProps, {sendMessage, getChats})(Chat);