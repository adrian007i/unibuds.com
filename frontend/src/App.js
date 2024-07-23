import React from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import loadAppData from './utils/loadJwtUser';
import axios from 'axios';
import { connect } from 'react-redux';

// UI COMPONENTS
import Register from './containers/Auth/Register';
import Login from './containers/Auth/Login';
import Home from './containers/PublicHome';
import User from './containers/Auth/User';
import Chats from './containers/Chat/Chats';
import Chat from './containers/Chat/Chat';

import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

// ICONS
import signOut from './icons/signout.png';
import chat from './icons/chat.png';
import profile from './icons/profile.png';
import logo from './logo.png';


import { logoutUser } from './redux/actions/authActions'

// BACKEND API ENDPOINT
axios.defaults.baseURL = 'http://localhost:4000/';

loadAppData();

function App({ logoutUser, auth, chats }) {

  if (!chats && auth.isAuthenticated)
    return <h1>laoding</h1>

  return (
    <div className='main'>

      {(auth.isAuthenticated &&
        <div className='nav'>
          <div id='left'>
            <NavLink to='/chats'  >
              <img src={logo} height='30px' alt='' className='logo'/>
            </NavLink>
          </div>
          <div id='right'>
            <NavLink to='/chats' className={({ isActive }) => (isActive ? 'active' : '')}>
              <img src={chat} alt='chat' title='chat' />
            </NavLink >
            <NavLink to='/profile' className={({ isActive }) => (isActive ? 'active' : '')}>
              <img src={profile} alt='profile' title='profile' />
            </NavLink>
            <button onClick={logoutUser} style={{ background: 'transparent', border: 'none' }} >
              <img src={signOut} alt='signout' title='signout' />
            </button>
          </div>
        </div>
      ) ||
        <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
          <div>
            <br />
            <img src={logo} width='50px' className='logo'/>
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

          <Route path='/chats' element={<PrivateRoute component={Chats} />} />
          <Route path='/chat/:chatId' element={<PrivateRoute component={Chat} />} />
          <Route path='/profile' element={<PrivateRoute component={User} />} />
        </Routes>
      </div>
    </div>

  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  chats: state.chats.chats
});

export default connect(mapStateToProps, { logoutUser })(App);