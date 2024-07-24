 

import { configureStore } from '@reduxjs/toolkit'; 

import counterReducer from '../state/counterSlice'
import authReducer from '../containers/Auth/slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer
  },
})


// const store = configureStore({
//   reducer: reducer,
//   devTools: true,
// })