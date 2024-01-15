import axios from 'axios';
import {REGISTER_SUCCESS, REGISTER_FAIL } from '../constants/auth';

// Register User
export const registerUser = (userData, history) => async (dispatch) => {
    try {
        
        const response = await axios.post('http://localhost:4000/signup', userData); 
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        });

        history.push('/login');
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.data
        });
    }
};