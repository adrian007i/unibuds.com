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
import { setCurrentUser, setTokenDataPending } from './containers/Auth/slice';
import { getChats } from './containers/Chat/slice';
import { getUserData } from './containers/User/slice';
import ReconnectingWebSocket from 'reconnecting-websocket';

let BASE_BACKEND_URL;
let HTTPS;
let WSS;

if (import.meta.env.MODE === 'development') {
  // BASE_BACKEND_URL = '192.168.4.46:4000/';
  BASE_BACKEND_URL = 'localhost:4000/';

  HTTPS = 'http://';
  WSS = 'ws://';
}
else {
  BASE_BACKEND_URL = 'unibuds-com.onrender.com/';
  HTTPS = 'https://';
  WSS = 'wss://';
}


axios.defaults.baseURL = HTTPS + BASE_BACKEND_URL;

let ws = null;

const Main = () => {

  const dispatch = useDispatch();
  const { isAuthenticated, tokenData, tokenDataPending } = useSelector(state => state.auth)


  useEffect(() => {

    if (!isAuthenticated && !tokenDataPending) {
      dispatch(setTokenDataPending());
      dispatch(setCurrentUser(localStorage.getItem('jwtToken')));
    }

    if (isAuthenticated){
        dispatch(getChats(tokenData._id));
        dispatch(getUserData());
        ws = new ReconnectingWebSocket(WSS + BASE_BACKEND_URL + 'web_socket_endpoint/' + '?auth=' + localStorage.getItem('jwtToken'));
    }

  }, [isAuthenticated]);
 

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

