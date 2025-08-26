import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "./redux/store/store";
import { system } from "./theme";

export function renderWithProviders(ui: ReactNode, options = {}) {
	return render(
		<Provider store={store}>
			<ChakraProvider value={system}>{ui}</ChakraProvider>
		</Provider>,
		options
	);
}
