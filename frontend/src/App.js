import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import loadAppData from './utils/loadJwtUser';

import Register from './containers/Register';
import Login from './containers/Login';
import Home from './containers/Home';
import Profile from './containers/Profile';
import PrivateRoute from './utils/PrivateRoute'
import axios from 'axios';
loadAppData();

axios.defaults.baseURL = "http://localhost:4000/";

function App() {

  return (
    <div className='main'>
      <div className="sub-main">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <h1>
            <img src={logo} width="100px" className='margin-auto' alt="" />
            UniBuds
          </h1>
        </Link>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="profile" element={<PrivateRoute component={Profile} />} />

          {/* <Route component={Error404} /> */}
        </Routes>


      </div>
    </div>

  );
}

export default App;
