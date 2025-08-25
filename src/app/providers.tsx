"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { system } from "@/theme";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<Provider store={store}>
			<ChakraProvider value={system}>{children}</ChakraProvider>
		</Provider>
	);
}
