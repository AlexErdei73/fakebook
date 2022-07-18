import { createSlice } from "@reduxjs/toolkit";

export const incomingMessagesSlice = createSlice({
  name: "incomingMessages",
  initialState: [],
  reducers: {
    incomingMessagesUpdated: (state, action) => {
      state = [];
      action.payload.forEach((message) => state.push(message));
    },
  },
});

export const { incomingMessagesUpdated } = incomingMessagesSlice.actions;

export default incomingMessagesSlice.reducer;
