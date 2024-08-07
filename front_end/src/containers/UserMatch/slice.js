import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  matched_user: null, 
  errors: {},
  isPending: false
};


const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

  },
});

export const {} = matchSlice.actions;

export default matchSlice.reducer;