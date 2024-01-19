import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import loadAppData from './utils/loadJwtUser';

import Register from './containers/Register';
import Login from './containers/Login';
import Home from './containers/PublicHome';
import Profile from './containers/Profile';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

import axios from 'axios';
import { connect } from 'react-redux';
import signOut from './icons/signout.png';
import chat from './icons/chat.png';
import profile from './icons/profile.png';
import search from './icons/search.png';

loadAppData();

axios.defaults.baseURL = "http://localhost:4000/";

function App({ isAuthenticated, user }) {

  return (
    <div className='main'>
      <div className="sub-main">

        {(isAuthenticated &&
          <div className='nav'>
            <div id="left">
              <Link to="/chats"  >
                <img src={logo} width="50px" alt="" />
              </Link>
            </div>
            <div id='right'>
              <Link to="/chats" className='active' >
                <img src={chat} alt='chat' title='chat' />
              </Link>
              <Link to="/chats">
                <img src={search} alt='search' title='search' />
              </Link>
              <Link to="/chats">
                <img src={profile} alt='profile' title='profile' />
              </Link>
              <Link to="/chats">
                <img src={signOut} alt='signout' title='signout' />
              </Link>
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


        <Routes>
          <Route path="/" element={<PublicRoute component={Home} />} />
          <Route path="/register" element={<PublicRoute component={Register} />} />
          <Route path="/login" element={<PublicRoute component={Login} />} />


          <Route path="profile" element={<PrivateRoute component={Profile} />} />

          {/* <Route element={<Home />} /> */}
        </Routes>





      </div>
    </div>

  );
}

const mapStateToProps = state => ({
  errors: state.auth.errors,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  isPending: state.auth.isPending
});

export default connect(mapStateToProps, {})(App);