import axios from 'axios';
import { LOGIN_FAIL, LOGIN_PENDING, REGISTER_FAIL, REGISTER_PENDING, SET_USER, LOGOUT_USER } from '../constants/authConstants';
import { isEmpty, minLength, isValidEmail } from '../../utils/validation';
import loadAppData from '../../utils/loadJwtUser';
import setAuthToken from '../../utils/setAuthToken';

// Register User
export const registerUser = (userData) => async (dispatch) => {

    try {
        dispatch({ type: REGISTER_PENDING });

        // client side form validation
        const localErrors = {}
        if (isEmpty(userData.firstName)) localErrors.firstName = 'Required';
        else if (minLength(userData.firstName, 2)) localErrors.firstName = 'Too Short';

        if (isEmpty(userData.lastName)) localErrors.lastName = 'Required';
        else if (minLength(userData.lastName, 2)) localErrors.lastName = 'Too Short';

        if (isEmpty(userData.email)) localErrors.email = 'Required';
        else if (!isValidEmail(userData.email)) localErrors.email = 'Invalid Email';

        if (isEmpty(userData.password)) localErrors.password = 'Required';
        else if (minLength(userData.password, 6)) localErrors.password = 'Too Short';

        // check if client side validation failed
        if (Object.values(localErrors).length > 0) {

            dispatch({
                type: REGISTER_FAIL,
                payload: localErrors
            });
        }

        // client side validation passed
        else {
            const response = await axios.post('/register', userData);

            localStorage.setItem('jwtToken', response.data.token);
            loadAppData(response.data.token)
        }

        // server request failed
    } catch (errors) {
        dispatch({
            type: REGISTER_FAIL,
            payload: errors.response.data
        });
    }
};

// Login user
export const loginUser = (userData) => async (dispatch) => {

    try {
        dispatch({ type: LOGIN_PENDING });

        // client side form validation
        const localErrors = {}

        if (isEmpty(userData.email)) localErrors.email = 'Required';
        else if (!isValidEmail(userData.email)) localErrors.email = 'Invalid Email';

        if (isEmpty(userData.password)) localErrors.password = 'Required';
        else if (minLength(userData.password, 6)) localErrors.password = 'Too Short';

        // check if client side validation failed
        if (Object.values(localErrors).length > 0) {

            dispatch({
                type: LOGIN_FAIL,
                payload: localErrors
            });
        }

        // client side validation passed
        else {
            const response = await axios.post('/login', userData);
            localStorage.setItem('jwtToken', response.data.token);
            loadAppData(response.data.token);
        }

        // server request failed
    } catch (errors) {
        dispatch({
            type: REGISTER_FAIL,
            payload: errors.response.data
        });
    }
};

// set user details in redux state
export const setCurrentUser = (decoded) => async (dispatch) => {
    dispatch({ type: SET_USER, payload: decoded });
};

// logout user
export const logoutUser = () => dispatch => {

    // remove token from localstorage
    localStorage.removeItem('jwtToken');

    // this will delete the authtoken from future requests
    setAuthToken(false);

    // this will need to be updated to clear all data from state
    dispatch({ type: LOGOUT_USER });
};  
