import { createSlice } from "@reduxjs/toolkit";

export const imagesSlice = createSlice({
  name: "images",
  initialState: [],
  reducers: {
    imageAdded: (state, action) => {
      const index = state
        .map((image) => image.storagePath)
        .indexOf(action.payload.storagePath);
      if (index === -1) state.push(action.payload);
    },
    imageUrlFound: (state, action) => {
      const index = state
        .map((image) => image.storagePath)
        .indexOf(action.payload.storagePath);
      if (index > -1) state[index].url = action.payload.url;
    },
  },
});

export const { imageAdded, imageUrlFound } = imagesSlice.actions;

export default imagesSlice.reducer;
