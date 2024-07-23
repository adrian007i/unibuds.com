import {
  GET_USER_SUCCESS,
  GET_USER_PENDING,
  SET_USER_PENDING,
  SET_USER_FAIL,
  SET_USER_SUCCESS
} from '../constants/userConstants';

const initialState = {
  data: null,
  getUserPending: false,
  setUserPending: false,
  errors: {}
};


// this reducer is used to store user info when they are logged in
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PENDING:
      return {
        ...state,
        getUserPending: true
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        getUserPending: false
      };
    case SET_USER_FAIL:
      return {
        ...state,
        errors: action.payload,
        setUserPending: false
      };
    case SET_USER_PENDING:
      return {
        ...state,
        setUserPending: true
      };
    case SET_USER_SUCCESS:
      return {
        ...state,
        setUserPending: false,
        data: action.payload
      };
    default:
      return state;
  }
};