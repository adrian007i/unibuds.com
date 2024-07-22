import {
    GET_CHATS_PENDING, GET_CHATS_SUCCESS
  } from '../constants/chatsConstants';
  
  const initialState = {
    chats: null,
    loading_chats: false,
    sending_msg: true 
  };
  
  export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CHATS_PENDING:
        return {
          ...state,
          loading_chats: true
        };
      case GET_CHATS_SUCCESS: 
        return {
          ...state,
          chats: action.payload,
          loading_chats: false
        };
      default:
        return state;
    }
  };