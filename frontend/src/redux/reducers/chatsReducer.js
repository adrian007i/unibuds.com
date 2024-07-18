import {
    GET_CHATS_PENDING, GET_CHATS_SUCCESS
  } from '../constants/chatsConstants';
  
  const initialState = {
    chats: [],
    isPending: false, 
  };
  
  export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CHATS_PENDING:
        return {
          ...state,
          isPending: true
        };
      case GET_CHATS_SUCCESS: 
        return {
          ...state,
          chats: action.payload,
          isPending: false
        };
      default:
        return state;
    }
  };