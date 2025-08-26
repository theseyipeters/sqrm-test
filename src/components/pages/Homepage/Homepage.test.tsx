import { screen } from "@testing-library/react";
import Homepage from "./Homepage";
import { renderWithProviders } from "@/test-utils";

jest.mock("@/components/layout/PageLayout/PageLayout", () => {
	return ({ children }: { children: React.ReactNode }) => (
		<div data-testid="mock-page-layout">{children}</div>
	);
});

describe("Homepage", () => {
	it("renders the heading", () => {
		renderWithProviders(<Homepage />);
		expect(
			screen.getByRole("heading", {
				name: /🚀 Next\.js \+ Chakra UI \+ Custom Theme/i,
			})
		).toBeInTheDocument();
	});

	it("renders the description text", () => {
		renderWithProviders(<Homepage />);
		expect(
			screen.getByText(/Now using custom brand colors & fonts!/i)
		).toBeInTheDocument();
	});

	it("renders the Get Started button", () => {
		renderWithProviders(<Homepage />);
		const button = screen.getByRole("button", { name: /Get Started/i });
		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute("type", "button"); // Chakra uses native button
	});

	it("wraps content in PageLayout", () => {
		renderWithProviders(<Homepage />);
		expect(screen.getByTestId("mock-page-layout")).toBeInTheDocument();
	});
});
