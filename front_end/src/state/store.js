 

import { configureStore } from '@reduxjs/toolkit'; 

import counterReducer from '../state/counterSlice'
import authReducer from '../containers/Auth/slice';
import userReducer from '../containers/User/slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    user: userReducer
  },
})


// const store = configureStore({
//   reducer: reducer,
//   devTools: true,
// })