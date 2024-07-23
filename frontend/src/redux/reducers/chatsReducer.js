import {
  GET_CHATS_PENDING, GET_CHATS_SUCCESS,
  SET_SEND_MESSAGE_PENDING, SET_SEND_MESSAGE_SUCCESS
} from '../constants/chatsConstants';

const initialState = {
  chats: null,
  loadingChats: false,
  sendingMsg: false
};

// STORES ALL THE CHAT INFO FOR A PARTICULAR USER
export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATS_PENDING:
      return {
        ...state,
        loadingChats: true
      };
    case GET_CHATS_SUCCESS:
      return {
        ...state,
        chats: action.payload,
        loadingChats: false
      }
    case SET_SEND_MESSAGE_PENDING:
      return {
        ...state,
        sendingMsg: true
      };
    case SET_SEND_MESSAGE_SUCCESS:
      const updatedChats = [...state.chats];

      updatedChats[action.payload.chatId] = {
        ...updatedChats[action.payload.chatId],
        messages: [...updatedChats[action.payload.chatId].messages, { msg: action.payload.msg }]
      }; 

      return {
        ...state,
        chats: updatedChats,
        sendingMsg: false
      };

    default:
      return state;
  }
};