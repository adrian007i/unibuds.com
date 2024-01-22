import {
  GET_USER_SUCCESS,
  GET_USER_PENDING,
  SET_USER_PENDING,
  SET_USER_FAIL,
  SET_USER_SUCCESS
} from '../constants/userConstants';

const initialState = {
  data: null,
  get_user_pending: false,
  set_user_pending: false,
  errors: {}
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PENDING:
      return {
        ...state,
        get_user_pending: true
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        get_user_pending: false
      };
    case SET_USER_FAIL:
      return {
        ...state,
        errors: action.payload,
        set_user_pending: false
      };
    case SET_USER_PENDING:
      return {
        ...state,
        set_user_pending: true
      };
    case SET_USER_SUCCESS:
      return {
        ...state,
        set_user_pending: false,
        data: action.payload
      };
    default:
      return state;
  }
};