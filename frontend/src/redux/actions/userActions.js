import axios from 'axios';

import {
    GET_USER_SUCCESS,
    GET_USER_PENDING,
    SET_USER_PENDING,
    SET_USER_FAIL,
    SET_USER_SUCCESS
} from '../constants/userConstants';
 

// fetches the user details
export const getUserData = (user_id) => async (dispatch) => {

    dispatch({ type: GET_USER_PENDING });
    const response = await axios.get('/get_user?user_id=' + user_id);
    dispatch({ type: GET_USER_SUCCESS, payload: response.data });
};

export const setUserData = (userData) => async (dispatch) => {
    try {
        dispatch({ type: SET_USER_PENDING });
        // TODO need to do user validation here
        await axios.post('/set_user', userData);
        dispatch({ type: SET_USER_SUCCESS, payload : userData }); 

        // server request failed
    } catch (errors) { 
        console.log(errors)
        dispatch({
            type: SET_USER_FAIL,
            payload: errors.response.data
        });
    }
};

