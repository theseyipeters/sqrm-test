import { render, screen } from "@testing-library/react";
import TransactionsGrid from "./TransactionsGrid";
import { renderWithProviders } from "@/test-utils";
import {
	setPage,
	setVisibleTransactions,
} from "@/redux/slices/transactionSlice";
import { Transaction } from "@/types/transaction";

jest.mock("@/components/_common/StatusBadge/StatusBadge", () => {
	return ({ status }: { status: string }) => (
		<span data-testid="status-badge">{status}</span>
	);
});

const mockDispatch = jest.fn();
jest.mock("@/hooks/hooks", () => {
	const actual = jest.requireActual("@/hooks/hooks");
	return {
		...actual,
		useAppDispatch: () => mockDispatch,
		useAppSelector: (selector: any) =>
			selector({
				transaction: { page: 1, visibleTransactions: [] },
			}),
	};
});

describe("TransactionsGrid", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders empty state when no transactions", () => {
		renderWithProviders(<TransactionsGrid transactions={[]} />);

		expect(screen.getByText(/No transactions found/i)).toBeInTheDocument();
	});

	it("dispatches setVisibleTransactions on mount", () => {
		const transactions: Transaction[] = [
			{
				amount: "₦43,644",
				id: "TR_8401857902",
				type: "Transfer",
				date: "Feb 12, 2022",
				time: "10:30AM",
				status: "Processed",
			},
			{
				amount: "₦35,471",
				id: "TR_8401857903",
				type: "Withdrawal",
				date: "Feb 13, 2022",
				time: "02:15PM",
				status: "Failed",
			},
		];

		renderWithProviders(
			<TransactionsGrid
				transactions={transactions}
				pageSize={1}
			/>
		);

		expect(mockDispatch).toHaveBeenCalledWith(
			setVisibleTransactions([transactions[0]])
		);
	});

	it("renders transactions correctly", () => {
		const transactions: Transaction[] = [
			{
				amount: "₦43,644",
				id: "TR_8401857902",
				type: "Transfer",
				date: "Feb 12, 2022",
				time: "10:30AM",
				status: "Processed",
			},
			{
				amount: "₦35,471",
				id: "TR_8401857903",
				type: "Withdrawal",
				date: "Feb 13, 2022",
				time: "02:15PM",
				status: "Failed",
			},
		];

		renderWithProviders(<TransactionsGrid transactions={transactions} />);
	});

	it("renders pagination info text", () => {
		const transactions: Transaction[] = Array.from({ length: 15 }, (_, i) => ({
			amount: "₦35,471",
			id: "TR_8401857903",
			type: "Withdrawal",
			date: "Feb 13, 2022",
			time: "02:15PM",
			status: "Failed",
		}));

		renderWithProviders(<TransactionsGrid transactions={transactions} />);

		expect(screen.getByText(/Showing 1-10 of 15 results/i)).toBeInTheDocument();
	});
});
