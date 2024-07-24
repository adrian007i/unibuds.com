import React, { useState, memo } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button,  FormControl as Input} from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';

// CUSTOM
// import formatDate from '../../utils/formatDate';
import { sendMessage } from './slice';

import './chat.css';
import profilepic from '../../icons/Alia.jpg';


const Chat = () => {  
    const { chatId } = useParams(); 
    const data = useSelector(state => state.chat.data); 
    const dispatch = useDispatch()
   
    const [newMsg, setNewMsg] = useState('');
    
    // useEffect(()=>{
    //     console.log('rendering took place for '+ chat_id)
    // },[chats]) 
    
    const onSubmit = (e) => {
        e.preventDefault();
        // TODO: fix so messages dont re-render the entire dataset
        // document.getElementsByClassName('messages')[0].append(`<div className='msg recieve'>${new_msg}</div>`);
        dispatch(sendMessage({
            'msg': newMsg,
            'user1': data[chatId].user1,
            'user2': data[chatId].user2,
            'chatId': chatId
        }))
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
                {data && data[chatId].messages.map((msg, index) =>
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
 

export default Chat;