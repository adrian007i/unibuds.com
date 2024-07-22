import logo from './logo.svg'; 
import React from 'react';
import { Routes, Route, Link, NavLink } from "react-router-dom";
import loadAppData from './utils/loadJwtUser';

import Register from './containers/Auth/Register';
import Login from './containers/Auth/Login';
import Home from './containers/PublicHome';
import User from './containers/Auth/User';
import Chats from './containers/Chat/Chats'; 
import Chat from './containers/Chat/Chat'; 

import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

import axios from 'axios';
import { connect } from 'react-redux';
import signOut from './icons/signout.png';
import chat from './icons/chat.png';
import profile from './icons/profile.png'; 



import { logoutUser } from './redux/actions/authActions'

loadAppData();

axios.defaults.baseURL = "http://localhost:4000/";

function App({ logoutUser, auth}) {

  return (
    <div className="main"> 

      {(auth.isAuthenticated &&
        <div className='nav'>
          <div id="left">
            <NavLink to="/chats"  >
              <img src={logo} width="50px" alt=""  /> {auth.token_data._id}
            </NavLink>
          </div>
          <div id='right'>
            <NavLink to="/chats" className={({isActive}) => (isActive ? "active" : '')}>
              <img src={chat} alt='chat' title='chat' />
            </NavLink > 
            <NavLink to="/profile" className={({isActive}) => (isActive ? "active" : '')}>
              <img src={profile} alt='profile' title='profile' />
            </NavLink>
            <button onClick={logoutUser} style={{ background: "transparent", border: "none" }} >
              <img src={signOut} alt='signout' title='signout' />
            </button>
          </div>
        </div>
      ) ||
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <h1>
            <img src={logo} width="100px" className='margin-auto' alt="" />
            UniBuds { }
          </h1>
        </Link>
      }

      <div id='pages'>
        <Routes>
          <Route path="/" element={<PublicRoute component={Home} />} />
          <Route path="/register" element={<PublicRoute component={Register} />} />
          <Route path="/login" element={<PublicRoute component={Login} />} />

          <Route path="/chats" element={<PrivateRoute component={Chats} />} />
          <Route path="/chat/:chat_id" element={<PrivateRoute component={Chat} />} />
          <Route path="/profile" element={<PrivateRoute component={User} />} /> 

          {/* <Route element={<Home />} /> */}
        </Routes>
      </div>
    </div>

  );
}

const mapStateToProps = state => ({
  errors: state.auth.errors, 
  auth: state.auth,
  isPending: state.auth.isPending
});

export default connect(mapStateToProps, { logoutUser })(App);