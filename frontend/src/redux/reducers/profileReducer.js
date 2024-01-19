import {GET_PROFILE_SUCCESS,GET_PROFILE_PENDING} from '../constants/profileConstants';

const initialState = {
  data: null ,
  get_data_pending: false,
  set_data_pending: false,
  errors: {}
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_PENDING:
      return {
        ...state, 
        get_data_pending: true
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state, 
        data: action.payload, 
        get_data_pending: false
      };  
    default:
      return state;
  }
};