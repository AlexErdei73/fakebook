import { createSlice } from "@reduxjs/toolkit";

export const outgoingMessagesSlice = createSlice({
  name: "outgoingMessages",
  initialState: [],
  reducers: {
    outgoingMessagesUpdated: (state, action) => {
      const updatedState = [];
      action.payload.forEach((message) => updatedState.push(message));
      return updatedState;
    },
  },
});

export const { outgoingMessagesUpdated } = outgoingMessagesSlice.actions;

export default outgoingMessagesSlice.reducer;
