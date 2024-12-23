import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormControl as Input } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { wsSendMessage, setUnreadStatus, blockUser } from './slice';

import './chat.css';


const Chat = ({ ws }) => {

    const dispatch = useDispatch();
    const { chatId } = useParams();
    const navigate = useNavigate();
    const data = useSelector(state => state.chat.data);
    const authUserId = useSelector(state => state.auth.tokenData._id);

    const [newMsg, setNewMsg] = useState('');
    const [chatIndex, setChatIndex] = useState(null);
    const [amIuser1, setAmIUser1] = useState(null);
    const [otherUser, setOtherUser] = useState(null);


    // sets the chat index once the data loads
    useEffect(() => {
        if (data && chatIndex === null) {
            setChatIndex(data.findIndex(chat => chat._id === chatId));
        }

    }, [data]);


    useEffect(() => {

        if (chatIndex !== null) {

            setAmIUser1(authUserId == data[chatIndex].user1._id);  
            setOtherUser(authUserId == data[chatIndex].user1._id ? data[chatIndex].user2 : data[chatIndex].user1);

            // if there are no messages, auto send once once the user acepted the chat
            if (data[chatIndex].messages.length === 0) {
                ws.send(JSON.stringify(
                    {
                        'type': 1,
                        'body': data[chatIndex].user1.firstName + ' started a chat',
                        'reciever': data[chatIndex].user2._id,
                        'amIUser1': 1,
                        'chatId': data[chatIndex]._id
                    }
                ));

                // add to local redux state
                dispatch(wsSendMessage({
                    'index': chatIndex,
                    'msg': data[chatIndex].user1.firstName + ' started a chat',
                    'sender': 1,
                    'chatId': data[chatIndex]._id
                }));
            }

            // check if the user has unread message
            let userUnread;
            if (authUserId !== data[chatIndex].user1._id) {
                if (data[chatIndex].userB_Unread)
                    userUnread = 'userB_Unread';
            }
            else {
                if (data[chatIndex].userA_Unread)
                    userUnread = 'userA_Unread';
            } 


            // if user didnt read yet. we update the redux state and database via ws request
            if (userUnread) {

                // updating the redux state 
                dispatch(setUnreadStatus({ chatIndex, userUnread }))
                // websocket msg to update database values
                ws.send(JSON.stringify(
                    {
                        'type': 2,
                        'chatId': data[chatIndex]._id,
                        'userUnread': userUnread,
                        'newUnread': false
                    }
                ));
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
                'type': 1,
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

    // if the user blocks the other user
    const block = ()=>{
        const user = otherUser.firstName.toLowerCase();
        if (prompt(`Type "${user}" to permanently block`).toLowerCase() === user){ 
            navigate('/chats');
            dispatch(blockUser({
                "arr_id" : chatIndex,
                "db_id": data[chatIndex]._id,
                "user1": data[chatIndex].user1._id,
                "user2": data[chatIndex].user2._id
            }));

        }else{
            alert("Invalid User")
        }
    }

    if (chatIndex !== null && otherUser !== null) {
        return (
            <>
                <div className='user'>
                    <div className='chat'>
                        <NavLink  to='/chats'>
                            <div className='propic'><img src={otherUser && import.meta.env.VITE_S3_ENDPOINT + otherUser.profilePicture} alt='' /></div>
                            <div className='name'>{otherUser && otherUser.firstName}</div> 
                        </NavLink> 
                        <Button className='btn btn-danger' onClick={block}>Block</Button> 
                    </div> 
                </div>
                <div className='messages'>
                    <small>{JSON.stringify(otherUser)}</small>
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