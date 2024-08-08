import React, { useState, memo, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button, FormControl as Input } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';

// CUSTOM
// import formatDate from '../../utils/formatDate';
import { wsSendMessage } from './slice';

import './chat.css';
import profilepic from '../../icons/Alia.jpg';


const Chat = ({ ws }) => {

    const { chatId } = useParams();
    const data = useSelector(state => state.chat.data);
    const authUserId = useSelector(state => state.auth.tokenData._id);

    const dispatch = useDispatch()

    const [newMsg, setNewMsg] = useState('');
    const chatIndex = data ? data.findIndex(chat => chat._id === chatId) : null;
    
    // user 1 or user 2 is assigned to each message, here we figure of which of the two the user is
    let amIuser1;
    if(chatIndex !== null) amIuser1 = authUserId == data[chatIndex].user1._id;

    const onSubmit = (e) => {

        if(newMsg.length === 0)
            return

        ws.send(JSON.stringify(
            {
                'body': newMsg,
                'reciever': amIuser1 ? data[chatIndex].user2._id : data[chatIndex].user1._id,
                'chatId': data[chatIndex]._id
            }
        ));
        dispatch(wsSendMessage({
            'index': chatIndex,
            'msg': newMsg,
            'sender': amIuser1 ? 1 : 2,
            'chatId': data[chatIndex]._id
        })); 

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
                {data && data[chatIndex].messages.map((msg, index) => {

                    // we are using flex box reverse direction, so contents must iterated in reverse
                    let id = data[chatIndex].messages.length - 1 - index;
                    return (
                        <div key={id} className={`msg ${amIuser1}${data[chatIndex].messages[id].sender}` }>
                            {data[chatIndex].messages[id].msg}
                        </div>)
                }
                )}
            </div>

            <div className='msg_box'>
                <div className='msg_box_flex'>
                    <Input className='input_msg' onChange={e => { setNewMsg(e.target.value) }} onKeyDown={e => { if (e.key == 'Enter') onSubmit() }} value={newMsg} placeholder='Enter Message Here'></Input>

                    <Button disabled={newMsg.length === 0 } className='send' type='button' onClick={onSubmit}><img className='sendIcon' src="/send.png" alt="" /></Button>
                </div>
            </div>
        </>
    );
}


export default Chat;