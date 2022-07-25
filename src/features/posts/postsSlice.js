import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    postsUpdated: (state, action) => {
      const updatedState = [];
      action.payload.forEach((post) => updatedState.push(post));
      return updatedState;
    },
  },
});

export const { postsUpdated } = postsSlice.actions;

export default postsSlice.reducer;
