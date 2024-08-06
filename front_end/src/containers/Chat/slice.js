import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; 

const initialState = {
    data: null,
    loadingChats: false,
    sendingMsg: false,
    errors:{}
  };

// Get user Profile Data
export const getChats = createAsyncThunk('auth/getChats', async (user, thunkAPI) => {
  try {
    const response = await axios.get('/get_chats/');  
    thunkAPI.fulfillWithValue(response.data.chats);
    return response.data.chats;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  } 
});

export const sendMessage = createAsyncThunk('auth/sendMessage', async (msg, thunkAPI) => {
  try {
    // await axios.post('/send_message/', msg);
    thunkAPI.fulfillWithValue(msg);
    return msg;

  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  } 
});
 
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    wsRecieveMessage: (state, action) => {
      state.data[action.payload.index].messages.push(action.payload);
    },
    wsSendMessage: (state, action) => {
      state.data[action.payload.index].messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChats.pending, (state) => {
        state.loadingChats = true;
        state.errors = {};
      })
      .addCase(getChats.fulfilled, (state, action) => { 
        state.data = action.payload;
        state.loadingChats = false;  
      })
      .addCase(getChats.rejected, (state, action) => {
        state.errors = action.payload; 
        state.loadingChats = false; 
      }) 
  },
});

export const {wsSendMessage, wsRecieveMessage} = chatSlice.actions;

export default chatSlice.reducer;