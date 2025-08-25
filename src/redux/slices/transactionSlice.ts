import { Transaction } from "@/types/transaction";
import { createSlice } from "@reduxjs/toolkit";

interface TransactionState {
	page: number;
	transactions: Transaction[] | null;
	visibleTransactions: Transaction[] | null;
}

const initialState: TransactionState = {
	page: 1,
	transactions: null,
	visibleTransactions: null,
};

const transactionSlice = createSlice({
	name: "transaction",
	initialState,
	reducers: {
		setPage: (state, action) => {
			state.page = action.payload;
		},
		setVisibleTransactions: (state, action) => {
			state.visibleTransactions = action.payload;
		},
	},
});

export const { setPage, setVisibleTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;
