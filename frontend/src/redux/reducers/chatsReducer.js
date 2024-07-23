import {
  GET_CHATS_PENDING, GET_CHATS_SUCCESS,
  SET_SEND_MESSAGE_PENDING, SET_SEND_MESSAGE_SUCCESS
} from '../constants/chatsConstants';

const initialState = {
  chats: null,
  // new_messages: [], // {"chat_id" , "new_messages"}  we do not want to re-render all messages
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
        chats: action.payload,
        sending_msg: true
      };
      case SET_SEND_MESSAGE_SUCCESS:
        return {
          ...state,
          chats: action.payload,
          sending_msg: true
        };

    default:
      return state;
  }
};