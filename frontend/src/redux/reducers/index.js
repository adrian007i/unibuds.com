import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { chatsReducer } from './chatsReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  chats: chatsReducer

});