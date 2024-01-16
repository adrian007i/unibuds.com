import {SET_USER, REGISTER_FAIL, REGISTER_PENDING, LOGIN_PENDING, LOGIN_FAIL } from '../constants/auth';

const initialState = {
  user: null,
  isAuthenticated: false,
  errors: {},
  isPending: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_PENDING:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        errors: {},
        isPending: true
      };
    case REGISTER_FAIL:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        errors: action.payload,
        isPending: false
      }; 

      case SET_USER:
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          errors: {},
          isPending: false
        };

    case LOGIN_PENDING:
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        errors: {},
        isPending: true
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        errors: action.payload,
        isPending: false
      };
    default:
      return state;
  }
};