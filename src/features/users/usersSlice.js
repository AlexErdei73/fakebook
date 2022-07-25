import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    usersUpdated: (state, action) => {
      const updatedState = [];
      action.payload.forEach((user) => updatedState.push(user));
      return updatedState;
    },
  },
});

export const { usersUpdated } = usersSlice.actions;

export default usersSlice.reducer;
