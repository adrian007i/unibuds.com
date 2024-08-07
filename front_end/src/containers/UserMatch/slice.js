import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  matchedUser: null,
  errors: {},
  isPending: false
};


export const fetchMatch = createAsyncThunk('auth/fetchMatch', async (data, thunkAPI) => {
  try {
    const response = await axios.get('/generate_new_chat');
    thunkAPI.fulfillWithValue(response.data); 
    return response.data;
  } catch (error) { 
    return thunkAPI.rejectWithValue(error.response.data);
  }

});



const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatch.pending, (state) => {
        state.loading = true;
        state.errors = {};
      })
      .addCase(fetchMatch.fulfilled, (state, action) => { 
        state.matchedUser = action.payload.user
        state.isPending = false;
      })
      .addCase(fetchMatch.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
  },
});

export const {} = matchSlice.actions;

export default matchSlice.reducer;