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

    const onSubmit = (e) => {

        ws.send(JSON.stringify(
            {
                'body': newMsg,
                'reciever': authUserId == data[chatIndex].user1 ? data[chatIndex].user2 : data[chatIndex].user1,
                'chatId': data[chatIndex]._id
            }
        ));
        dispatch(wsSendMessage({
            'index': chatIndex,
            'msg': newMsg,
            'sender': authUserId === data[chatIndex].user1 ? 1 : 2,
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
                        <div key={id} className={'msg s' + data[chatIndex].messages[id].sender}>
                            {data[chatIndex].messages[id].msg}
                        </div>)
                }
                )}
            </div>

            <div className='msg_box'>
                <div className='msg_box_flex'>
                    <Input className='input_msg' onChange={e => { setNewMsg(e.target.value) }} onKeyDown={e => { if (e.key == 'Enter') onSubmit() }} value={newMsg} placeholder='Enter Message Here'></Input>

                    <Button className='send' type='button' onClick={onSubmit}><img className='sendIcon' src="/send.png" alt="" /></Button>
                </div>
            </div>
        </>
    );
}


export default Chat;