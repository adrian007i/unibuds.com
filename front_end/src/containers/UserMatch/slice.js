import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const initialState = {
  matchedUser: null,
  errors: {},
  isPending: false
};


export const fetchMatch = createAsyncThunk('auth/fetchMatch', async (data, thunkAPI) => {
  try {
    var start = Date.now();
    const response = await axios.get('/generate_new_chat');
    var diff =   Date.now() - start;

    if (diff < 3000){
      await sleep(3000 - diff) 
    }
      

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
        state.matchedUser = null
        state.isPending = true;
        state.errors = {};
      })
      .addCase(fetchMatch.fulfilled, (state, action) => { 
        state.matchedUser = action.payload.user
        state.isPending = false;
      })
      .addCase(fetchMatch.rejected, (state, action) => {
        state.isPending = false;
        state.errors = action.payload;
      })
  },
});

export const {} = matchSlice.actions;

export default matchSlice.reducer;