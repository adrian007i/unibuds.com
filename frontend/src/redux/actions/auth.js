import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, REGISTER_PENDING } from '../constants/auth';
import { isEmpty, minLength, isValidEmail } from '../../utils/validation';

// Register User
export const registerUser = (userData, history) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_PENDING });

        // client side form validation
        const localErrors = {}
        if (isEmpty(userData.first_name)) localErrors.first_name = 'Required';
        else if (minLength(userData.first_name, 2)) localErrors.first_name = 'Too Short';

        if (isEmpty(userData.last_name)) localErrors.last_name = 'Required';
        else if (minLength(userData.last_name, 2)) localErrors.last_name = 'Too Short';

        if (isEmpty(userData.email)) localErrors.email = 'Required';
        else if (!isValidEmail(userData.email)) localErrors.email = 'Invalid Email';

        if (isEmpty(userData.password)) localErrors.password = 'Required';
        else if (minLength(userData.password, 6)) localErrors.password = 'Too Short';

        // check if client side validation failed
        if (Object.values(localErrors).length > 0) { 
            dispatch({
                type: REGISTER_FAIL,
                payload:localErrors
            }); 
        }

        // client side validation passed
        else {
            const response = await axios.post('http://localhost:4000/signup', userData);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            }); 
            console.log(history)
            history.push('/profile');
        }
    
    // server request failed
    } catch (errors) {
        dispatch({
            type: REGISTER_FAIL,
            payload: errors.response.data
        });
    }
};

