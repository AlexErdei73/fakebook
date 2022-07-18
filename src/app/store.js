import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import currentUserReducer from "../features/currentUser/currentUserSlice";
import usersSlice from "../features/users/usersSlice";
import postsSlice from "../features/posts/postsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    currentUser: currentUserReducer,
    users: usersSlice,
    posts: postsSlice,
  },
});
