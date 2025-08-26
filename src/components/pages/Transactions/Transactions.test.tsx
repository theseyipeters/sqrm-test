import { render, screen } from "@testing-library/react";
import Transactions from "./Transactions";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { renderWithProviders } from "@/test-utils";

jest.mock("@/components/layout/PageLayout/PageLayout", () => {
	return ({ children }: { children: React.ReactNode }) => (
		<div data-testid="mock-page-layout">{children}</div>
	);
});

jest.mock(
	"./TransactionsTable/TransactionsTable",
	() =>
		({ transactions }: { transactions: any[] }) =>
			<div data-testid="transactions-table">{transactions.length} rows</div>
);

jest.mock(
	"./TransactionsGrid/TransactionsGrid",
	() =>
		({ transactions }: { transactions: any[] }) =>
			<div data-testid="transactions-grid">{transactions.length} rows</div>
);

jest.mock("@/hooks/hooks", () => {
	const actual = jest.requireActual("@/hooks/hooks");
	return {
		...actual,
		useAppDispatch: () => jest.fn(), // no-op
		useAppSelector: (selector: any) =>
			selector({
				transaction: {
					loading: false,
					transactions: [
						{ id: 1, type: "deposit", date: "2022-01-15" },
						{ id: 2, type: "withdrawal", date: "2022-02-10" },
					],
				},
			}),
	};
});

describe("Transactions page", () => {
	it("wraps content in PageLayout", () => {
		renderWithProviders(<Transactions />);
		expect(screen.getByTestId("mock-page-layout")).toBeInTheDocument();
	});

	it("renders export button", () => {
		renderWithProviders(<Transactions />);
		expect(screen.getByRole("button", { name: /export/i })).toBeInTheDocument();
	});

	it("renders TransactionsTable on desktop", () => {
		renderWithProviders(<Transactions />);
		expect(screen.getByTestId("transactions-table")).toHaveTextContent(
			"2 rows"
		);
	});

	it("renders skeleton when loading is true", () => {
		jest.mock("@/hooks/hooks", () => ({
			useAppDispatch: () => jest.fn(),
			useAppSelector: (selector: any) =>
				selector({
					transaction: { loading: true, transactions: [] },
				}),
		}));
	});
});
