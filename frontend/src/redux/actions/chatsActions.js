import axios from 'axios';
import { 
    GET_CHATS_PENDING, 
    GET_CHATS_SUCCESS,
    SET_MESSAGE_RECIEVED, 
    SET_SEND_MESSAGE_PENDING, 
    SET_SEND_MESSAGE_SUCCESS
} from '../constants/chatsConstants';


// FETCH CHATS BELONGING TO A USER
export const getChats = () => async (dispatch) => {
    dispatch({ type: GET_CHATS_PENDING });
    const response = await axios.get('/get_chats/');  
    dispatch({ type: GET_CHATS_SUCCESS, payload: response.data.chats });
};
// SEND A MESSAGE FROM USER A TO USER B
export const sendMessage = (payload) => async (dispatch) => {  
    dispatch({ type: SET_SEND_MESSAGE_PENDING }); 
    // const response = await axios.post('/send_message/', msg); 
    dispatch({ type: SET_SEND_MESSAGE_SUCCESS, payload : payload});
};


export const recieveMessage = (message) => async (dispatch) => {
    dispatch({ type: SET_MESSAGE_RECIEVED, payload : message});
};
