import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { object } from 'prop-types';

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
    await axios.post('/set_user',
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
    thunkAPI.fulfillWithValue(formData);
    return formData;

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
        state.data = action.payload;
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