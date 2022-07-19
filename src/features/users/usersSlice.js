import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    usersUpdated: (state, action) => {
      state.forEach((user) => state.pop());
      action.payload.forEach((user) => state.push(user));
    },
  },
});

export const { usersUpdated } = usersSlice.actions;

export default usersSlice.reducer;
