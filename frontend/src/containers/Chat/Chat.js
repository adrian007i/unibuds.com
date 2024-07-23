import React, { useState, memo } from 'react';
import { connect } from 'react-redux';
import { Button,  FormControl as Input} from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';

// CUSTOM
// import formatDate from '../../utils/formatDate';
import { sendMessage } from '../../redux/actions/chatsActions';

import './chat.css';
import profilepic from '../../icons/Alia.jpg';


const Chat = ({ sendMessage, chats }) => {

    const { chatId} = useParams(); 
    const [newMsg, setNewMsg] = useState('');
    
    // useEffect(()=>{
    //     console.log('rendering took place for '+ chat_id)
    // },[chats])

    const onSubmit = (e) => {
        e.preventDefault();
        // TODO: fix so messages dont re-render the entire dataset
        // document.getElementsByClassName('messages')[0].append(`<div className='msg recieve'>${new_msg}</div>`);
        sendMessage({
            'msg': newMsg,
            'user1': chats[chatId].user1,
            'user2': chats[chatId].user2,
            'chatId': chatId
        });
        setNewMsg('')
    };

    return (
        <>
            <div className='user'>
                <NavLink className='chat chat_small' to='/chat/1234567890'>
                    <div className='propic'><img src={profilepic} alt='' /></div>
                    <div className='name'>Alia</div>

                </NavLink>
            </div>
            <div className='messages'>  
                {chats[chatId].messages.map((msg, index) =>
                   <div key={index} className='msg recieve'>{msg.msg}</div>
                )}
            </div>

            <div className='msg_box'>
                <div className='msg_box_flex'>
                    <Input className='input_msg' onChange={e => { setNewMsg(e.target.value) }} value={newMsg} placeholder='Enter Message Here'></Input>
                    <Button className='send' type='button' onClick={onSubmit}>Send</Button>
                </div>
            </div>
        </>
    );
}





const mapStateToProps = state => ({
    // isPending: state.chat.isPending,
    // messages: state.chat.messages,
    chats: state.chats.chats,

});

export default connect(mapStateToProps, { sendMessage })(memo(Chat));