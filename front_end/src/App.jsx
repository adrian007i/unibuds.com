import React, { useEffect } from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

// UI COMPONENTS
import Register from './containers/Auth/Register';
import Login from './containers/Auth/Login';
import Home from './containers/PublicHome';
import User from './containers/User/User';
import Chats from './containers/Chat/Chats';
import Chat from './containers/Chat/Chat';
import UserMatch from './containers/UserMatch/UserMatch';

import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

// ICONS
import signOut from './icons/signout.png';
import chat from './icons/chat.png'; 
import search from './icons/search.png';

import { defaultPic } from './utils/globals';
import { logoutUser } from './containers/Auth/slice';
import { wsRecieveMessage } from './containers/Chat/slice';

function App({ ws }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.user);
  const chats = useSelector((state) => state.chat.data);

  if (ws) {
    ws.onopen = function (event) {
      console.log('Connection opened');
    };

    ws.onclose = function (event) {
      console.log('Connection closed');

    };

    ws.onmessage = function (event) {
      const message = JSON.parse(event.data)
      const chatIndex = chats.findIndex(chat => chat._id === message.chatId) 

      dispatch(wsRecieveMessage({
        'index': chatIndex,
        'msg': message.body,
        'sender': auth.tokenData._id === chats[chatIndex].user1._id ? 2 : 1,
        'chatId': message.chatId
      }));
    }
  }

  const logoutAndDisconnect = () => {
    dispatch(logoutUser())
    ws.close()
  }

  return (
    <div className='main'>

      {(auth.isAuthenticated &&
        <div className='nav'>
          <div id='left'>
            <a href='/'>
              <img src='/logo.svg' height='35px' alt='' className='logo' />
            </a>
          </div>
          <div id='right'>
            <NavLink to='/find_a_buddy' className={({ isActive }) => (isActive ? 'active' : '')}>
              <img src={search} alt='search' title='find a buddy' />
            </NavLink >
            <NavLink to='/chats' className={({ isActive }) => (isActive ? 'active' : '')}>
              <img src={chat} alt='chat' title='chat' />
            </NavLink >
            <NavLink to='/profile' className={({ isActive }) => (isActive ? 'active' : '')}>

              {/* SET USER PROFILE PICTURE */}
              {(data &&
                <img className='navProPic' src={axios.defaults.baseURL + 'uploads/' + data.profilePicture} title='profile' />
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
           <img src='./logo.svg' width='50px' className='logo' />
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