"use client";

import { VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface PageLayoutProps {
	children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
	return (
		<>
			<VStack
				py={10}
				px={10}
				h={"100%"}
				align="stretch">
				<>{children}</>
			</VStack>
		</>
	);
}
