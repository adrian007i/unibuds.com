import axios from 'axios';
import { GET_PROFILE_SUCCESS, GET_PROFILE_PENDING, SET_PROFILE_PENDING, SET_PROFILE_FAIL, SET_PROFILE_SUCCESS } from '../constants/profileConstants';
import { isEmpty, minLength, isValidEmail } from '../../utils/validation';

export const getProfileData = (user_id) => async (dispatch) => {

    try {
        dispatch({ type: GET_PROFILE_PENDING });
        const response = await axios.get('/get_profile?user_id=' + user_id); 
        dispatch({ type: GET_PROFILE_SUCCESS, payload : response.data });



        // server request failed
    } catch (errors) {

    }
};

export const updateProfile = (profileData) => async (dispatch) => { 
    try { 
        dispatch({ type: SET_PROFILE_PENDING });


        const response = await axios.post('/set_profile', profileData);
        console.log(response);
        dispatch({ type: SET_PROFILE_SUCCESS });

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
            type: SET_PROFILE_FAIL,
            payload: errors.response.data
        });
    }
};

