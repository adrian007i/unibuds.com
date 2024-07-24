import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { store } from './state/store';
import { useDispatch } from 'react-redux'; 
import { BrowserRouter } from 'react-router-dom';

import App from './App';
// TODO MIGHT CONSIDER REMOVING BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { setCurrentUser } from './containers/Auth/slice';
import { getChats } from './containers/Chat/slice';

const Main = () => {
  const dispatch = useDispatch();
  dispatch(setCurrentUser(localStorage.getItem("jwtToken")));
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  
  if(isAuthenticated)
    dispatch(getChats())

  return <App />
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

