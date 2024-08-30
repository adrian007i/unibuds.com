import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import Validate from '../../utils/validation';
import { loadAppData, destoryAppData } from '../../utils/loadJwtUser';
import { thunk } from 'redux-thunk';

const initialState = {
  tokenData: null,
  isAuthenticated: false,
  errors: {},
  isPending: false,
  universities: null,
  universitiesPending: false
};

// Register User
export const registerUser = createAsyncThunk('auth/registerUser', async (user, thunkAPI) => {
  try {

    // CLIENT SIDE VALIDATION FOR USER
    const errors = new Validate({
      'firstName': [user.firstName, ['isEmpty', 'minLength'], 2],
      'lastName': [user.lastName, ['isEmpty', 'minLength'], 2],
      'email': [user.email, ['isEmpty', 'isValidEmail']],
      'password': [user.password, ['isEmpty', 'minLength'], 6],
      'profilePicture': [user.profilePictureUrl, ['validPicture']],
      'university': [user.university, ['isEmpty']]
    }); 

    if (!errors.isValid)
      return thunkAPI.rejectWithValue(errors.errors);

    const response = await axios.post('/register', user, {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    });
    if (!errors.isValid)
      return thunkAPI.rejectWithValue(errors.errors);

    thunkAPI.fulfillWithValue(response.data)
    return response.data;

  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }

});

// Login user
export const loginUser = createAsyncThunk('auth/loginUser', async (user, thunkAPI) => {
  try {

    // CLIENT SIDE VALIDATION FOR USER
    const errors = new Validate({
      'email': [user.email, ['isEmpty', 'isValidEmail']],
      'password': [user.password, ['isEmpty', 'minLength'], 6]
    });

    if (!errors.isValid)
      return thunkAPI.rejectWithValue(errors.errors);

    const response = await axios.post('/login', user);
    thunkAPI.fulfillWithValue(response.data)

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }

});

export const searchUniversity = createAsyncThunk('auth/searchUniversities', async (name, thunkAPI) => {

  if (name.length < 3){
    thunkAPI.fulfillWithValue(null);
    return null;
  }

  try { 

    const response = await axios.get('/get_universities?name=' + name);

    thunkAPI.fulfillWithValue(response.data.data);
    return response.data.data;

  } catch (e) {
    thunkAPI.rejectWithValue(e.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.errors = {}
    },
    setCurrentUser: (state, action) => {
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
      .addCase(registerUser.pending, (state) => {
        state.isPending = true;
        state.errors = {};
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.tokenData = loadAppData(action.payload.token);
        state.isAuthenticated = state.tokenData ? true : false;
        state.isPending = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isPending = false;
        state.errors = action.payload;
      })
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
      })
      .addCase(searchUniversity.pending, (state) => {
        state.universitiesPending = true;
        state.errors = {};
      })
      .addCase(searchUniversity.fulfilled, (state, action) => {
        state.universities = action.payload;
        state.universitiesPending = false;
      })
      .addCase(searchUniversity.rejected, (state, action) => {
        state.isPending = false;
        state.errors = action.payload;
      });
  },
});

export const { setCurrentUser, logoutUser, resetErrors } = authSlice.actions;

export default authSlice.reducer;