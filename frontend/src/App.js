import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Register from './containers/Register';
import Login from './containers/Login';
import Home from './containers/Home';

import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <div className='main'>
      <div className="sub-main">
        <Link to="/" style={{color: "inherit",textDecoration: "none"}}>
          <h1>
            <img src={logo} width="100px" className='margin-auto' alt="" />
            UniBuds
          </h1>
        </Link>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/profile" element={Register} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
