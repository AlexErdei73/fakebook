import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import currentUserReducer from "../features/currentUser/currentUserSlice";
import usersReducer from "../features/users/usersSlice";
import postsReducer from "../features/posts/postsSlice";
import incomingMessagesReducer from "../features/incomingMessages/incomingMessagesSlice";
import outgoingMessagesReducer from "../features/outgoingMessages/outgoingMessagesSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    currentUser: currentUserReducer,
    users: usersReducer,
    posts: postsReducer,
    incomingMessages: incomingMessagesReducer,
    outgoingMessages: outgoingMessagesReducer,
  },
});
