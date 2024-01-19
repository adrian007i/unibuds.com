import axios from 'axios';
import { GET_PROFILE_SUCCESS, GET_PROFILE_PENDING } from '../constants/profileConstants';
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
