import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import currentUserReducer from "../features/currentUser/currentUserSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    currentUser: currentUserReducer,
  },
});
