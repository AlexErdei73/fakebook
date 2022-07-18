import { createSlice } from "@reduxjs/toolkit";

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    firstname: "",
    lastname: "",
    profilePictureURL: "fakebook-avatar.jpeg",
    backgroundPictureURL: "background-server.jpg",
    photos: [],
    posts: [],
    isOnline: false,
  },
  reducers: {
    currentUserUpdated: (state, action) => {
      const {
        firstname,
        lastname,
        profilePictureURL,
        backgroundPictureURL,
        photos,
        posts,
        isOnline,
        index,
      } = action.payload;
      state.firstname = firstname;
      state.lastname = lastname;
      state.profilePictureURL = profilePictureURL;
      state.backgroundPictureURL = backgroundPictureURL;
      state.isOnline = isOnline;
      if (index) state.index = index;
      state.photos = [];
      state.posts = [];
      photos.forEach((photo) => state.photos.push(photo));
      posts.forEach((post) => state.posts.push(post));
    },
  },
});

export const { currentUserUpdated } = currentUserSlice.actions;

export default currentUserSlice.reducer;
