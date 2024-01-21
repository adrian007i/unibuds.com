import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route, Link, NavLink } from "react-router-dom";
import loadAppData from './utils/loadJwtUser';

import Register from './containers/Register';
import Login from './containers/Login';
import Home from './containers/PublicHome';
import Profile from './containers/Profile';
import Chat from './containers/Chat';
import Search from './containers/Search';

import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

import axios from 'axios';
import { connect } from 'react-redux';
import signOut from './icons/signout.png';
import chat from './icons/chat.png';
import profile from './icons/profile.png';
import search from './icons/search.png';



import { logoutUser } from './redux/actions/authActions'

loadAppData();

axios.defaults.baseURL = "http://localhost:4000/";

function App({ logoutUser, isAuthenticated }) {

  return (
    <div className="main">

      {(isAuthenticated &&
        <div className='nav'>
          <div id="left">
            <NavLink to="/chats"  >
              <img src={logo} width="50px" alt="" />
            </NavLink>
          </div>
          <div id='right'>
            <NavLink to="/chats" activeClassName="active">
              <img src={chat} alt='chat' title='chat' />
            </NavLink >
            <NavLink to="/search" activeClassName="active">
              <img src={search} alt='search' title='search' />
            </NavLink>
            <NavLink to="/profile" activeClassName="active">
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

          <Route path="chats" element={<PrivateRoute component={Chat} />} />
          <Route path="profile" element={<PrivateRoute component={Profile} />} />
          <Route path="search" element={<PrivateRoute component={Search} />} />

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

export default connect(mapStateToProps, { logoutUser })(App);