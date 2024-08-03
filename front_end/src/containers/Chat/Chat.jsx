import React, { useState, memo } from 'react';
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
    // useEffect(()=>{
    //     console.log('rendering took place for '+ chat_id)
    // },[chats]) 

    const onSubmit = (e) => {
        e.preventDefault();
        // TODO: fix so messages dont re-render the entire dataset
        // document.getElementsByClassName('messages')[0].append(`<div className='msg recieve'>${new_msg}</div>`);

        // const message = { 
        //     'body': newMsg,
        //     'reciever': authUserId == data[chatId].user1 ? data[chatId].user2 : data[chatId].user1,
        //     'chatId': data[chatId]._id
        // }
        // if (ws) {
        ws.send(JSON.stringify(
            {
                'body': newMsg,
                'reciever': authUserId == data[chatId].user1 ? data[chatId].user2 : data[chatId].user1,
                'chatId': data[chatId]._id
            }
        ));

        //     ws.onmessage = function (event) {
        //         console.log(event);

        //     }
        // }

        dispatch(wsSendMessage({
            'index': chatId,
            'msg': newMsg,
            'sender': authUserId == data[chatId].user1 ? 1 : 2,
            'chatId': data[chatId]._id
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
                {data && data[chatId].messages.map((msg, index) =>
                    <div key={index} className={'msg s'+msg.sender}>{msg.msg}</div>
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