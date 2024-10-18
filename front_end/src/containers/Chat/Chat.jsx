import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormControl as Input } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';

import { wsSendMessage } from './slice';

import './chat.css';


const Chat = ({ ws }) => {

    const dispatch = useDispatch();
    const { chatId } = useParams();
    const data = useSelector(state => state.chat.data);
    const authUserId = useSelector(state => state.auth.tokenData._id);

    const [newMsg, setNewMsg] = useState('');
    const [chatIndex, setChatIndex] = useState(null);
    const [amIuser1, setAmIUser1] = useState(null);
    const [otherUser, setOtherUser] = useState(null);

    // sets the chat index once the data loads
    useEffect(() => {
        if (data && chatIndex === null)
            setChatIndex(data.findIndex(chat => chat._id === chatId));
    }, [data]);

    // if there are no messages, auto send once once the user acepted the chat
    useEffect(() => {

        if (chatIndex !== null) {

            setAmIUser1(authUserId == data[chatIndex].user1._id);
            setOtherUser((amIuser1 ? data[chatIndex].user2 : data[chatIndex].user1));

            if (data[chatIndex].messages.length === 0) {
                ws.send(JSON.stringify(
                    {
                        'body': data[chatIndex].user1.firstName + ' started a chat',
                        'reciever': data[chatIndex].user2._id,
                        'amIUser1': 1,
                        'chatId': data[chatIndex]._id
                    }
                )); 
                
                dispatch(wsSendMessage({
                    'index': chatIndex,
                    'msg': data[chatIndex].user1.firstName + ' started a chat',
                    'sender': 1,
                    'chatId': data[chatIndex]._id
                }));
            }
        }


    }, [chatIndex]);

    const onSubmit = (e) => {
        if (e)
            e.preventDefault();

        if (newMsg.length === 0)
            return

        ws.send(JSON.stringify(
            {
                'body': newMsg,
                'reciever': amIuser1 ? data[chatIndex].user2._id : data[chatIndex].user1._id,
                'amIUser1': amIuser1,
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

    if (chatIndex !== null && otherUser !== null) {
        return (
            <>
                <div className='user'>
                    <NavLink className='chat chat_small' to='/chats'>
                        <div className='propic'><img src={otherUser && import.meta.env.VITE_S3_ENDPOINT + otherUser.profilePicture} alt='' /></div>
                        <div className='name'>{otherUser && otherUser.firstName}</div>

                    </NavLink>
                </div>
                <div className='messages'>
                    {data[chatIndex].messages.map((msg, index) => {

                        // we are using flex box reverse direction, so contents must iterated in reverse
                        let id = data[chatIndex].messages.length - 1 - index;

                        return (
                            <div key={id} className={`msg ${amIuser1}${data[chatIndex].messages[id].sender}`}>
                                {data[chatIndex].messages[id].msg}
                            </div>)
                    }
                    )}
                </div>


                <div className='msg_box'>
                    <div className='msg_box_flex'>
                        <Input className='input_msg' onChange={e => { setNewMsg(e.target.value) }} onKeyDown={e => { if (e.key == 'Enter') onSubmit() }} value={newMsg} placeholder='Enter Message Here'></Input>

                        <Button disabled={newMsg.length === 0} className='send' type='button' onMouseDown={onSubmit}><img className='sendIcon' src='/send.png' alt='' /></Button>
                    </div>
                </div>
            </>
        );
    }
    return <div>Loading</div>
}


export default Chat;