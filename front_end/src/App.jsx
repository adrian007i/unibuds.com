import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-bootstrap';

// UI COMPONENTS
import Register from './containers/Auth/Register';
import Login from './containers/Auth/Login';
import Home from './containers/PublicHome';
import User from './containers/User/User';
import Chats from './containers/Chat/Chats';
import Chat from './containers/Chat/Chat';
import UserMatch from './containers/UserMatch/UserMatch';
import ForgetPassword from './containers/Auth/ForgetPassword';
import ResetPasswordLink from './containers/Auth/ResetPasswordLink'

import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

// ICONS
import signOut from './icons/signout.png';
import chat from './icons/chat.png';
import search from './icons/search.png';

import { defaultPic } from './utils/globals';
import { logoutUser } from './containers/Auth/slice';
import { wsRecieveMessage, getChat } from './containers/Chat/slice';

function App({ ws }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.user);
  const { data: chats, unreadChats } = useSelector((state) => state.chat);

  if (ws) {
    ws.onopen = function (event) {
      console.log('Connection opened');
    };

    ws.onclose = function (event) {
      console.log('Connection closed');

    };

    // message recieved via web socket protocol
    ws.onmessage = function (event) {
      const message = JSON.parse(event.data);
      const chatIndex = chats.findIndex(chat => chat._id === message.chatId);

      // the user recieved a new chat request.
      if (chatIndex === -1) {
        dispatch(getChat({
          'msg': message.body,
          'sender': 1,
          'chatId': message.chatId
        }));

      } else {

        // identify sender if user 1 or user 2
        const sender = auth.tokenData._id === chats[chatIndex].user1._id ? 2 : 1;
        let unread = null;

        // check if the chat is open based on the url 
        if (!window.location.pathname.includes(chats[chatIndex]._id)) {

          // mark the message as unread if the chat is closed
          // Sender === 1 means I am userB
          if (sender === 1) {
            if (!chats[chatIndex].userB_Unread)
              unread = 'userB_Unread';

          } 
          // sender === 2 means i am useA
          else {
            if (!chats[chatIndex].userA_Unread)
              unread = 'userA_Unread';
          }
          // if the message is unread by the user, a ws message will be send back to the server to update the database
          // for example chat.UserX_Unread = true
          if (unread) {
            ws.send(JSON.stringify(
              {
                'type': 2,
                'chatId': chats[chatIndex]._id,
                'userUnread': unread,
                'newUnread': true
              }
            ));
          }

        }

        dispatch(wsRecieveMessage({
          'index': chatIndex,
          'msg': message.body,
          'sender': sender,
          'chatId': message.chatId,
          'unread': unread
        }));
      }
    }
  }

  const logoutAndDisconnect = () => {
    dispatch(logoutUser())
    ws.close()
  }

  return (
    <div className='main'>
      {/* !data.bio || !data.major */}

      {(auth.isAuthenticated &&
        <div className='nav'>
          <div id='left'>
            <a href='/'>
              <img src='/logo.svg' height='35px' alt='' className='logo' />
            </a>
          </div>
          <div id='right'>
            <NavLink to='/chats' className={({ isActive }) => (isActive ? 'active' : '')}>
              {unreadChats !== 0 && <span className='newChats'>{unreadChats}</span>}
              <img src={chat} alt='chat' title='chat' />
            </NavLink >
            <NavLink to='/find_a_buddy' className={({ isActive }) => (isActive ? 'active' : '')}>
              <img src={search} alt='search' title='find a buddy' />
            </NavLink >
            <NavLink to='/profile' className={({ isActive }) => (isActive ? 'active' : '')}>

              {/* SET USER PROFILE PICTURE */}
              {(data &&
                <img className='navProPic' src={import.meta.env.VITE_S3_ENDPOINT + data.profilePicture} title='profile' />
              ) ||
                <img className='navProPic' src={defaultPic} title='profile' />
              }

            </NavLink>
            <button onClick={logoutAndDisconnect} style={{ background: 'transparent', border: 'none' }} >
              <img src={signOut} alt='signout' title='signout' />
            </button>
          </div>
        </div>
      ) ||
        <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
          <div>
            <div className='text-center'>
              <img src='/logo.svg' width='50px' className='logo' />
              <h1 >UniBuds</h1>
            </div>
          </div>
        </Link>
      }

      <div id='pages'>
        <Routes>
          <Route path='/' element={<PublicRoute component={Home} />} />
          <Route path='/register' element={<PublicRoute component={Register} />} />
          <Route path='/login' element={<PublicRoute component={Login} />} />
          <Route path='/forgetPassword' element={<PublicRoute component={ForgetPassword} />} />
          <Route path='/resetPasswordLink/:userId/:userToken' element={<PublicRoute component={ResetPasswordLink} />} />

          <Route path='/profile' element={<PrivateRoute component={User} />} />
          <Route path='/chats' element={<PrivateRoute component={Chats} />} />
          <Route path='/find_a_buddy' element={<PrivateRoute component={UserMatch} />} />
          <Route path='/chat/:chatId' element={<PrivateRoute component={Chat} ws={ws} />} />

        </Routes>
      </div>
    </div>

  );
}


export default App;