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
  reducers: {},
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
      .addCase(sendMessage.pending, (state) => {
        state.errors = {}
        state.sendingMsg = true; 
      })
      .addCase(sendMessage.fulfilled, (state, action) => { 
        state.data[action.payload.chatId].messages.push(action.payload)
        // state.data.messages.push(action.payload);
        // state.sendingMsg = false;  
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.errors = action.payload; 
        state.sendingMsg = false; 
      })
  },
});

// export const {} = authSlice.actions;

export default chatSlice.reducer;