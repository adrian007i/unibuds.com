import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; 
import Validate from '../../utils/validation';

const initialState = {
  data: null,
  getUserPending: false,
  setUserPending: false,
  errors: {}
};

// Get user Profile Data
export const getUserData = createAsyncThunk('auth/getUserData', async (user, thunkAPI) => {
  try {
    const response = await axios.get('/get_user');

    thunkAPI.fulfillWithValue(response.data);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Set User profile data
export const setUserData = createAsyncThunk('auth/setUserData', async ({ formData, proPicExt, proPicBlob }, thunkAPI) => {
  try {

     // CLIENT SIDE VALIDATION FOR USER
     const errors = new Validate({
      'firstName': [formData.firstName, ['isEmpty', 'minLength'], 2],
      'lastName': [formData.lastName, ['isEmpty', 'minLength'], 2],
      'email': [formData.email, ['isEmpty', 'isValidEmail']],  
      'university': [formData.university, ['isEmpty']]
    }); 

    if (!errors.isValid)
      return thunkAPI.rejectWithValue(errors.errors);


    const response = await axios.post('/set_user',
      {
        profilePicture: proPicBlob,
        proPicExt,
        data: formData
      },
      {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      });
    thunkAPI.fulfillWithValue({formData, profilePicture : response.profilePicture}); 
    return {formData, profilePicture : response.data.profilePicture};

  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.getUserPending = true;
        state.errors = {};
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.getUserPending = false;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.errors = action.payload;
        state.getUserPending = false;
      })
      .addCase(setUserData.pending, (state) => {
        state.setUserPending = true;
        state.errors = {};
      })
      .addCase(setUserData.fulfilled, (state, action) => {
        state.data = action.payload.formData;
        state.data.profilePicture = action.payload.profilePicture;
        state.setUserPending = false;
      })
      .addCase(setUserData.rejected, (state, action) => {
        state.errors = action.payload;
        state.setUserPending = false;
      })
  },
});

// export const {} = authSlice.actions;

export default userSlice.reducer;