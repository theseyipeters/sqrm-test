import { screen } from "@testing-library/react";
import OnlinePayments from "./OnlinePayments";
import { renderWithProviders } from "@/test-utils";

jest.mock("./BarChart/BarChart", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-barchart">Mock BarChart</div>,
}));

describe("OnlinePayments", () => {
	it("renders account details correctly", () => {
		renderWithProviders(<OnlinePayments />);

		// Bank name + account number
		expect(screen.getByText(/STERLING BANK/i)).toBeInTheDocument();
		expect(screen.getByText("8000000000")).toBeInTheDocument();

		// Copy button
		expect(screen.getByText(/copy/i)).toBeInTheDocument();
	});

	it("renders BarChart component", () => {
		renderWithProviders(<OnlinePayments />);
		expect(screen.getByTestId("mock-barchart")).toBeInTheDocument();
	});
});
