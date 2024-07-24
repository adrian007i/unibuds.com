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

import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

// ICONS
import signOut from './icons/signout.png';
import chat from './icons/chat.png';
import profile from './icons/profile.png';
import logo from './logo.png';
 
import { logoutUser } from './containers/Auth/slice'

// BACKEND API ENDPOINT
axios.defaults.baseURL = 'http://localhost:4000/';


function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth); 

  return (
    <div className='main'>

      {(auth.isAuthenticated &&
        <div className='nav'>
          <div id='left'>
            <Link to='/chats'  >
              <img src={logo} height='30px' alt='' className='logo' />
            </Link>
          </div>
          <div id='right'>
            <NavLink to='/chats' className={({ isActive }) => (isActive ? 'active' : '')}>
              <img src={chat} alt='chat' title='chat' />
            </NavLink >
            <NavLink to='/profile' className={({ isActive }) => (isActive ? 'active' : '')}>
              <img src={profile} alt='profile' title='profile' />
            </NavLink>
            <button onClick={()=> dispatch(logoutUser())} style={{ background: 'transparent', border: 'none' }} >
              <img src={signOut} alt='signout' title='signout' />
            </button>
          </div>
        </div>
      ) ||
        <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
          <div>
            <br />
            <img src={logo} width='50px' className='logo' />
            <h1 className='d-inline'>UniBuds</h1>
          </div>
          <hr />
        </Link>
      }

      <div id='pages'>
        <Routes>
          <Route path='/' element={<PublicRoute component={Home} />} />
          <Route path='/register' element={<PublicRoute component={Register} />} />
          <Route path='/login' element={<PublicRoute component={Login} />} />

          <Route path='/profile' element={<PrivateRoute component={User} />} /> 
          <Route path='/chats' element={<PrivateRoute component={Chats} />} />
          <Route path='/chat/:chatId' element={<PrivateRoute component={Chat} />} />
          
        </Routes>
      </div>
    </div>

  );
}


export default App;