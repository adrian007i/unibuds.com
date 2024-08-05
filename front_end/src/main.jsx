import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { store } from './state/store';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import App from './App';
// TODO MIGHT CONSIDER REMOVING BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { setCurrentUser } from './containers/Auth/slice';
import { getChats } from './containers/Chat/slice';
import { getUserData } from './containers/User/slice';

// BACKEND API ENDPOINT
const BASE_BACKEND_URL = 'localhost:4000/';
axios.defaults.baseURL = 'http://' + BASE_BACKEND_URL;
let ws = null;

const Main = () => {
  
  const userToken = localStorage.getItem('jwtToken');
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (userToken) {
      dispatch(setCurrentUser(userToken));
      
      if (isAuthenticated) {
        dispatch(getChats());
        dispatch(getUserData()); 
        // ws = new WebSocket('ws://' + BASE_BACKEND_URL + 'web_socket_endpoint/' + '?auth=' + localStorage.getItem('jwtToken'));
      }
    }
  }, [isAuthenticated])


  return <App ws={ws} />
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

