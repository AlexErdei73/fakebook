import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/userSlice";

export default configureStore({
  reducer: {
    auth: userReducer,
  },
});
