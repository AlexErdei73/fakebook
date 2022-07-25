import { createSlice } from "@reduxjs/toolkit";

export const incomingMessagesSlice = createSlice({
  name: "incomingMessages",
  initialState: [],
  reducers: {
    incomingMessagesUpdated: (state, action) => {
      const updatedState = [];
      action.payload.forEach((message) => updatedState.push(message));
      return updatedState;
    },
  },
});

export const { incomingMessagesUpdated } = incomingMessagesSlice.actions;

export default incomingMessagesSlice.reducer;
