import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    isSignedIn: false,
    isEmailVerified: false,
    error: "",
  },
  reducers: {
    signIn: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.id = action.payload.id;
      state.displayName = action.payload.displayName;
      state.isEmailVerified = action.payload.isEmailVerified;
      state.isSignedIn = true;
    },
    signOut: (state) => {
      state.isSignedIn = false;
    },
    errorOccured: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { signIn, signOut, errorOccured } = userSlice.actions;

export default userSlice.reducer;
