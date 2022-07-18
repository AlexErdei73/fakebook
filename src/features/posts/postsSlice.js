import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    postsUpdated: (state, action) => {
      action.payload.forEach((post) => state.push(post));
    },
  },
});

export const { postsUpdated } = postsSlice.actions;

export default postsSlice.reducer;
