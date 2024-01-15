import { REGISTER_SUCCESS, REGISTER_FAIL,REGISTER_PENDING } from '../constants/auth';

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
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        errors: {},
        isPending: false
      };
    case REGISTER_FAIL:
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