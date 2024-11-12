import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// preveventing user memory from fulling up
const MAX_MESSAGES_TRESH = 120; // once there is 120 messages  
const ROLL_BACK_TO = 40;       // roll back to 40 messages

const initialState = {
  data: null,
  unreadChats: 0,
  loadingChats: false,
  sendingMsg: false,
  errors: {}
};

// Get chat data when first message arrives
export const getChats = createAsyncThunk('auth/getChats', async (user, thunkAPI) => {
  try {
    const response = await axios.get('/get_chats/');

    let totalUnread = 0;
    response.data.chats.forEach((e, i) => { 
      

      let userUnread = user === e.user1._id ? e.userA_Unread : e.userB_Unread;

      if (userUnread)
        totalUnread = totalUnread + 1
    }); 
 

    const chats = {
      'data' : response.data.chats,
      'unread': totalUnread
    }
    
    thunkAPI.fulfillWithValue(chats);
    return chats;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// new incoming chat
export const getChat = createAsyncThunk('auth/getChat', async (chat, thunkAPI) => {
  try {
    let response = await axios.get('/get_chat/' + chat.chatId);
    var date = new Date();
    chat.timestamp = date.toString();
    response.data.messages[0] = chat;
    response.data.lastMessage = chat.timestamp;

    thunkAPI.fulfillWithValue(response.data);
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const sendMessage = createAsyncThunk('auth/sendMessage', async (msg, thunkAPI) => {
  try {
    await axios.post('/send_message/', msg);
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
    addNewChat: (state, action) => {
      state.data.unshift(action.payload);
    },
    wsRecieveMessage: (state, action) => {
      state.data[action.payload.index].messages.push(action.payload);
      const chat = state.data[action.payload.index];

      if (chat.messages.length >= MAX_MESSAGES_TRESH)
        chat.messages = chat.messages.slice(chat.messages.length - ROLL_BACK_TO);
    },
    wsSendMessage: (state, action) => {
      state.data[action.payload.index].messages.push(action.payload);
      const chat = state.data[action.payload.index];

      if (chat.messages.length >= MAX_MESSAGES_TRESH)
        chat.messages = chat.messages.slice(chat.messages.length - ROLL_BACK_TO);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChats.pending, (state) => {
        state.loadingChats = true;
        state.errors = {};
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.unreadChats = action.payload.unread;
        state.loadingChats = false;
      })
      .addCase(getChats.rejected, (state, action) => {
        state.errors = action.payload;
        state.loadingChats = false;
      })
      .addCase(getChat.fulfilled, (state, action) => {
        state.data.unshift(action.payload)
      })
  },
});

export const { wsSendMessage, wsRecieveMessage, addNewChat } = chatSlice.actions;

export default chatSlice.reducer;