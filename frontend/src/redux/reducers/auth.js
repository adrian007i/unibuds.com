import { REGISTER_SUCCESS, REGISTER_FAIL } from '../constants/auth';

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null
      };
    case REGISTER_FAIL:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload
      };
    default:
      return state;
  }
};