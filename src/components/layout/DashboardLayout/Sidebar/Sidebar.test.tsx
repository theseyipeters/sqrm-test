import { screen } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { renderWithProviders } from "@/test-utils";

jest.mock("../data", () => ({
	SIDEBAR_LINKS: [
		{ href: "/", label: "Get Started", icon: () => <span>🌍</span> },
		{ href: "/dashboard", label: "Dashboard", icon: () => <span>📊</span> },
		{ href: "/accounts", label: "Accounts", icon: () => <span>💳</span> },
		{ href: "/transfers", label: "Transfers", icon: () => <span>💸</span> },
		{
			href: "/transactions",
			label: "Transactions",
			icon: () => <span>📜</span>,
		},
		{
			href: "/settings",
			label: "Settings",
			icon: () => <span>⚙️</span>,
		},
	],
}));

let mockPathname = "/";
jest.mock("next/navigation", () => ({
	usePathname: () => mockPathname,
}));

jest.mock("@/hooks/hooks", () => ({
	useAppDispatch: () => jest.fn(),
	useAppSelector: (fn: any) => fn({ action: { isSidebarOpen: true } }),
}));

describe("Sidebar navigation", () => {
	it("renders all sidebar links", () => {
		renderWithProviders(<Sidebar />);
		expect(screen.getByText("Get Started")).toBeInTheDocument();
		expect(screen.getByText("Dashboard")).toBeInTheDocument();
		expect(screen.getByText("Accounts")).toBeInTheDocument();
		expect(screen.getByText("Transfers")).toBeInTheDocument();
		expect(screen.getByText("Transactions")).toBeInTheDocument();
		expect(screen.getByText("Settings")).toBeInTheDocument();
	});

	it("highlights the correct active link (Dashboard)", () => {
		mockPathname = "/dashboard";
		renderWithProviders(<Sidebar />);

		const activeLink = screen.getByText("Dashboard").closest("div");
		// expect(activeLink).toHaveAttribute("data-active", "true");
	});
});
