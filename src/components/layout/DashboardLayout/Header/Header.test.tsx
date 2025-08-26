import { screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { renderWithProviders } from "@/test-utils";

// mock Redux hooks
const mockDispatch = jest.fn();
let mockIsSidebarOpen = false;

jest.mock("@/hooks/hooks", () => ({
	useAppDispatch: () => mockDispatch,
	useAppSelector: (fn: any) =>
		fn({ action: { isSidebarOpen: mockIsSidebarOpen } }),
}));

// mock action creator
jest.mock("@/redux/slices/actionSlice", () => ({
	setIsSidebarOpen: (payload: boolean) => ({
		type: "action/setIsSidebarOpen",
		payload,
	}),
}));

let isMobile = false;
jest.mock("@chakra-ui/react", () => {
	const original = jest.requireActual("@chakra-ui/react");
	return {
		...original,
		useMediaQuery: () => [isMobile],
	};
});

describe("Header", () => {
	beforeEach(() => {
		mockDispatch.mockClear();
		mockIsSidebarOpen = false;
		isMobile = false;
	});

	it("does not render toggle button on desktop", () => {
		renderWithProviders(<Header />);
		expect(
			screen.queryByRole("button", { name: /toggle menu/i })
		).not.toBeInTheDocument();
	});

	it("renders toggle button on mobile", () => {
		isMobile = true;
		renderWithProviders(<Header />);
		expect(
			screen.getByRole("button", { name: /toggle menu/i })
		).toBeInTheDocument();
	});

	it("dispatches toggle action when button clicked", () => {
		isMobile = true;
		renderWithProviders(<Header />);

		fireEvent.click(screen.getByRole("button", { name: /toggle menu/i }));

		expect(mockDispatch).toHaveBeenCalledWith({
			type: "action/setIsSidebarOpen",
			payload: true,
		});
	});
});
