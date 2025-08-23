import { configureStore } from "@reduxjs/toolkit";
import actionReducer from "@/redux/slices/actionSlice";

export const store = configureStore({
	reducer: {
		action: actionReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
