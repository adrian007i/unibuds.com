import {
  GET_CHATS_PENDING, GET_CHATS_SUCCESS,
  SET_SEND_MESSAGE_PENDING, SET_SEND_MESSAGE_SUCCESS
} from '../constants/chatsConstants';

const initialState = {
  chats: null,
  loading_chats: false,
  sending_msg: false
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
      }
    case SET_SEND_MESSAGE_PENDING:
      return {
        ...state,
        sending_msg: true
      };
    case SET_SEND_MESSAGE_SUCCESS:
      const updatedChats = [...state.chats];
      
      updatedChats[action.payload.chat_id] = {
        ...updatedChats[action.payload.chat_id], 
        messages: [...updatedChats[action.payload.chat_id].messages, {msg: action.payload.msg}]
      };
 
      return {
        ...state,
        chats: updatedChats,
        sending_msg: false
      };

    default:
      return state;
  }
};