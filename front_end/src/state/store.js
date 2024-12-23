 

import { configureStore } from '@reduxjs/toolkit'; 
 
import authReducer from '../containers/Auth/slice';
import userReducer from '../containers/User/slice';
import chatReducer from '../containers/Chat/slice';
import matchReducer from '../containers/UserMatch/slice';

export const store = configureStore({
  reducer: { 
    auth: authReducer,
    user: userReducer,
    chat: chatReducer,
    match: matchReducer
  }
})


// const store = configureStore({
//   reducer: reducer,
//   devTools: true,
// })