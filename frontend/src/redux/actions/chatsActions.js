import axios from 'axios';
import { GET_CHATS_PENDING, GET_CHATS_SUCCESS } from '../constants/chatsConstants';


// FETCH CHATS BELONGING TO A USER
export const getChats = () => async (dispatch) => {

    dispatch({ type: GET_CHATS_PENDING });
    const response = await axios.get('/get_chats/');  
    dispatch({ type: GET_CHATS_SUCCESS, payload: response.data.chats });
};
