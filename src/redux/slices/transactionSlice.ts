import { api } from "@/config/axios";
import { Transaction } from "@/types/transaction";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface TransactionState {
	loading: boolean;
	page: number;
	transactions: Transaction[] | [];
	visibleTransactions: Transaction[] | [];
}

const initialState: TransactionState = {
	loading: false,
	page: 1,
	transactions: [],
	visibleTransactions: [],
};

export const getTransactions = createAsyncThunk(
	"getTransactions",
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await api.get(`/transactions`);
			console.log(data);
			return data.data;
		} catch (error: any) {
			return rejectWithValue(error.response.data.message);
		}
	}
);
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
	extraReducers(builder) {
		builder
			.addCase(getTransactions.pending, (state) => {
				state.loading = true;
			})
			.addCase(getTransactions.fulfilled, (state, action) => {
				(state.loading = false), (state.transactions = action.payload);
			});
	},
});

export const { setPage, setVisibleTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;
