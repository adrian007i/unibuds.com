import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


import { isEmpty, isValidEmail, minLength } from '../../utils/validation';
import setAuthToken from '../../utils/setAuthToken';
import {loadAppData, destoryAppData} from '../../utils/loadJwtUser';

const initialState = {
  tokenData: null,
  isAuthenticated: false,
  errors: {},
  isPending: false
};

// Register User
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
  try {
    const response = await axios.post('/api/register', userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Login user
export const loginUser = createAsyncThunk('auth/loginUser', async (regUser, thunkAPI) => {
  try {
    const localErrors = {}

    if (isEmpty(regUser.email)) localErrors.email = 'Required';
    else if (!isValidEmail(regUser.email)) localErrors.email = 'Invalid Email';

    if (isEmpty(regUser.password)) localErrors.password = 'Required';
    else if (minLength(regUser.password, 6)) localErrors.password = 'Too Short';

    if (Object.values(localErrors).length > 0)
      return thunkAPI.rejectWithValue(localErrors);

    const response = await axios.post('/login', regUser); 
    thunkAPI.fulfillWithValue(response.data)

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
  
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    alert2: (state) => {
      alert(123)
    },
    setCurrentUser: (state , action )  => { 
      state.tokenData = loadAppData(action.payload); 
      state.isAuthenticated = state.tokenData ? true : false;
    },
    logoutUser: (state) => {
      destoryAppData();
      state.tokenData = null;
      state.isAuthenticated = false;
      state.errors = {}
      state.isPending = false
    }
  },
  extraReducers: (builder) => {
    builder
      // .addCase(registerUser.pending, (state) => {
      //   state.loading = true;
      //   state.errorS = null;
      // })
      // .addCase(registerUser.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.user = action.payload;
      // })
      // .addCase(registerUser.rejected, (state, action) => {
      //   state.loading = false;
      //   state.errorS = action.payload;
      // })
      .addCase(loginUser.pending, (state) => {
        state.isPending = true;
        state.errors = {};
      })
      .addCase(loginUser.fulfilled, (state, action) => { 
        state.tokenData = loadAppData(action.payload.token); 
        state.isAuthenticated = state.tokenData ? true : false;
        state.isPending = false; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isPending = false;
        state.errors = action.payload;
      });
  },
});

export const { setCurrentUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;