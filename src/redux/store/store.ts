import { configureStore } from "@reduxjs/toolkit";
import actionReducer from "@/redux/slices/actionSlice";
import transactionReducer from "@/redux/slices/transactionSlice";

export const store = configureStore({
	reducer: {
		action: actionReducer,
		transaction: transactionReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
