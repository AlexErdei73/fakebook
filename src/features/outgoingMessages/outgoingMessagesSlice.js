import { createSlice } from "@reduxjs/toolkit";

export const outgoingMessagesSlice = createSlice({
  name: "outgoingMessages",
  initialState: [],
  reducers: {
    outgoingMessagesUpdated: (state, action) => {
      action.payload.forEach((message) => state.push(message));
    },
  },
});

export const { outgoingMessagesUpdated } = outgoingMessagesSlice.actions;

export default outgoingMessagesSlice.reducer;
