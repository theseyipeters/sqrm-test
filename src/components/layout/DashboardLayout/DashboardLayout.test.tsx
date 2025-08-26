import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test-utils";
import DashboardLayout from "./DashboardLayout";

jest.mock("./Header/Header", () => () => (
	<div data-testid="header">Mock Header</div>
));
jest.mock("./Sidebar/Sidebar", () => () => (
	<div data-testid="sidebar">Mock Sidebar</div>
));

describe("DashboardLayout", () => {
	it("renders Header and Sidebar", () => {
		renderWithProviders(
			<DashboardLayout>
				<p>Dashboard content</p>
			</DashboardLayout>
		);

		expect(screen.getByTestId("header")).toBeInTheDocument();
		expect(screen.getByTestId("sidebar")).toBeInTheDocument();
	});

	it("renders children inside main content area", () => {
		renderWithProviders(
			<DashboardLayout>
				<p>Dashboard content</p>
			</DashboardLayout>
		);

		expect(screen.getByText("Dashboard content")).toBeInTheDocument();
	});
});
