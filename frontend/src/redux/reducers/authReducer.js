import { SET_USER, REGISTER_FAIL, REGISTER_PENDING, LOGIN_PENDING, LOGIN_FAIL, LOGOUT_USER } from '../constants/authConstants';

const initialState = {
  token_data: null,
  isAuthenticated: false,
  errors: {},
  isPending: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_PENDING:
      return {
        ...state,
        token_data: null,
        isAuthenticated: false,
        errors: {},
        isPending: true
      };
    case REGISTER_FAIL:
      return {
        ...state,
        token_data: null,
        isAuthenticated: false,
        errors: action.payload,
        isPending: false
      };

    case SET_USER:
      return {
        ...state,
        token_data: action.payload,
        isAuthenticated: true,
        errors: {},
        isPending: false
      };

    case LOGIN_PENDING:
      return {
        ...state,
        token_data: {},
        isAuthenticated: false,
        errors: {},
        isPending: true
      };
    case LOGIN_FAIL:
      return {
        ...state,
        token_data: null,
        isAuthenticated: false,
        errors: action.payload,
        isPending: false
      };
    case LOGOUT_USER:
      return {
        ...state,
        token_data: null,
        isAuthenticated: false,
        errors: {},
        isPending: false
      };
    default:
      return state;
  }
};