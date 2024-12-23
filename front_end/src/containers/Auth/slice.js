import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import Validate from '../../utils/validation';
import { loadAppData, destoryAppData } from '../../utils/loadJwtUser';
import { thunk } from 'redux-thunk';

const initialState = {
  tokenData: null,
  tokenDataPending: false,
  isAuthenticated: false,
  errors: {},
  isPending: false,
  universities: null,
  universitiesPending: false,
  resetLinkPending: false,
  resetLinkSent: false,
  resetLinkError: "",
  resetPasswordPending: false,
  resetPasswordError: "",
  resetPasswordSuccess: false,
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

  if (name.length < 3) {
    thunkAPI.fulfillWithValue(null);
    return null;
  }

  try {

    const response = await axios.post('/get_universities', { "name": name });

    thunkAPI.fulfillWithValue(response.data.data);
    return response.data.data;

  } catch (e) {
    thunkAPI.rejectWithValue(e.response.data);
  }
});

export const sendResetUrl = createAsyncThunk('auth/sendResetUrl/', async (email, thunkAPI) => {

  try {
    const errors = new Validate({
      'email': [email, ['isEmpty', 'isValidEmail']],
    });

    if (!errors.isValid)
      return thunkAPI.rejectWithValue(errors.errors.email);

    await axios.post('/send_reset_url', { email: email });
    return
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
});

export const resetPassword = createAsyncThunk('auth/sendResetUrl', async (data, thunkAPI) => {

  try {
    const errors = new Validate({
      'password': [data.password, ['isEmpty', 'minLength'], 6],
    });

    if (!errors.isValid)
      return thunkAPI.rejectWithValue(errors.errors.password);

    const response = await axios.post('/set_password', data);
    thunkAPI.fulfillWithValue(response.data)
    return response.data;
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.errors = {}
    },
    setTokenDataPending : (state) => {
      state.tokenDataPending = true
    },
    setCurrentUser: (state, action) => {
      state.tokenData = loadAppData(action.payload);
      state.isAuthenticated = state.tokenData ? true : false;
      state.tokenDataPending = false;
    },
    logoutUser: (state) => {
      destoryAppData();
      state.tokenData = null;
      state.isAuthenticated = false;
      state.errors = {}
      state.isPending = false
    },
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
      })
      .addCase(sendResetUrl.pending, (state) => {
        state.resetLinkSent = false;
        state.resetLinkPending = true;
        state.resetLinkError = "";
      })
      .addCase(sendResetUrl.fulfilled, (state) => {
        state.resetLinkPending = false;
        state.resetLinkSent = true;
      })
      .addCase(sendResetUrl.rejected, (state, action) => {
        state.resetLinkError = action.payload;
        state.resetLinkPending = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordPending = true;
        state.resetPasswordSuccess = false;
        state.resetPasswordError = "";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordPending = false;
        state.resetPasswordSuccess = true;
        state.resetpasswordJWT = action.payload.token
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordError = action.payload;
        state.resetPasswordPending = false;
      })
  },
});

export const { setCurrentUser, logoutUser, resetErrors, setTokenDataPending } = authSlice.actions;

export default authSlice.reducer;