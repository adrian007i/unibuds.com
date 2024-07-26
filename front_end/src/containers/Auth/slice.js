import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import Validate from '../../utils/validation';
import { loadAppData, destoryAppData } from '../../utils/loadJwtUser';

const initialState = {
  tokenData: null,
  isAuthenticated: false,
  errors: {},
  isPending: false
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
      'profilePicture': [user.profilePictureName, ['validPicture']]
    }); 

    if (!errors.isValid)
      return thunkAPI.rejectWithValue(errors.errors);


    // let formData = new FormData();
    // let fileName = `${user.profilePicture.name}`;
    // let file = new File([user.profilePicture.blob], fileName);
    // formData.append('file', file, fileName); 
    // formData.append('text', use)

    // user.profilePicture = new File([user.profilePicture.blob], 'hello.jpg')

    const response = await axios.post('/register', user, {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    });
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    alert2: (state) => {
      alert(123)
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
        state.loading = true;
        state.errors = {};
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.tokenData = loadAppData(action.payload.token);
        state.isAuthenticated = state.tokenData ? true : false;
        state.isPending = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
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
      });
  },
});

export const { setCurrentUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;