import { createSlice } from "@reduxjs/toolkit";

interface ActionState {
	isSidebarOpen: boolean;
}

const initialState: ActionState = {
	isSidebarOpen: false,
};

const actionSlice = createSlice({
	name: "action",
	initialState,
	reducers: {
		setIsSidebarOpen: (state, action) => {
			state.isSidebarOpen = action.payload;
		},
	},
});

export const { setIsSidebarOpen } = actionSlice.actions;
export default actionSlice.reducer;
