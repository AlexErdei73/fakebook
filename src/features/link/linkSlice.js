import { createSlice } from "@reduxjs/toolkit";

export const linkSlice = createSlice({
	name: "link",
	initialState: {
		active: "home",
		previous: "home"
	},
	reducers: {
		linkUpdated: (state, action) => {
			state.previous = state.active;
			state.active = action.payload;
		},
	},
});

export const { linkUpdated } = linkSlice.actions;

export default linkSlice.reducer;
