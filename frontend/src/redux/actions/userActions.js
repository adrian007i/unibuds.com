import axios from 'axios';
import { isEmpty, minLength, isValidEmail } from '../../utils/validation';

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


        const response = await axios.post('/set_user', userData);
        console.log(response);
        dispatch({ type: SET_USER_SUCCESS });

        // client side form validation
        // const localErrors = {}
        // if (isEmpty(userData.first_name)) localErrors.first_name = 'Required';
        // else if (minLength(userData.first_name, 2)) localErrors.first_name = 'Too Short';

        // if (isEmpty(userData.last_name)) localErrors.last_name = 'Required';
        // else if (minLength(userData.last_name, 2)) localErrors.last_name = 'Too Short';

        // if (isEmpty(userData.email)) localErrors.email = 'Required';
        // else if (!isValidEmail(userData.email)) localErrors.email = 'Invalid Email';

        // if (isEmpty(userData.password)) localErrors.password = 'Required';
        // else if (minLength(userData.password, 6)) localErrors.password = 'Too Short';

        // // check if client side validation failed
        // if (Object.values(localErrors).length > 0) {

        //     dispatch({
        //         type: REGISTER_FAIL,
        //         payload: localErrors
        //     });
        // }

        // // client side validation passed
        // else {
        //     const response = await axios.post('/signup', userData);

        //     localStorage.setItem("jwtToken", response.data.token);
        //     loadAppData(response.data.token)
        // }

        // server request failed
    } catch (errors) {
        console.log(errors)
        dispatch({
            type: SET_USER_FAIL,
            payload: errors.response.data
        });
    }
};

