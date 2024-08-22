import { createSlice } from "@reduxjs/toolkit";

export const accountPageSlice = createSlice({
	name: "accountPage",
	initialState: {
		profileLink: "",
		isWatch: false,
		isFriendsListPage: false,
	},
	reducers: {
		profileLinkSet: (state, action) => {
			state.profileLink = action.payload;
		},
		friendsListPageSet: (state, action) => {
			state.isFriendsListPage = action.payload;
		},
		watchSet: (state, action) => {
			state.isWatch = action.payload;
		},
	},
});

export const { profileLinkSet, friendsListPageSet, watchSet } =
	accountPageSlice.actions;

export default accountPageSlice.reducer;
