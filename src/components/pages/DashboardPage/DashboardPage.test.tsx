import { render, screen, act } from "@testing-library/react";
import DashboardPage from "./DashboardPage";
import { renderWithProviders } from "@/test-utils";

jest.mock("@/components/layout/PageLayout/PageLayout", () => ({
	__esModule: true,
	default: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="mock-page-layout">{children}</div>
	),
}));

jest.mock("./OnlinePayments/OnlinePayments", () => ({
	__esModule: true,
	default: () => (
		<div data-testid="mock-online-payments">Online Payments Component</div>
	),
}));

describe("DashboardPage", () => {
	it("renders correctly", async () => {
		await act(async () => {
			renderWithProviders(<DashboardPage />);
		});

		expect(screen.getByTestId("mock-page-layout")).toBeInTheDocument();
		expect(
			screen.getByRole("tab", { name: /online payments/i })
		).toBeInTheDocument();
		expect(screen.getByTestId("mock-online-payments")).toBeInTheDocument();
	});
});
