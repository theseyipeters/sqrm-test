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
				px={{ base: 5, md: 10 }}
				h={"100%"}
				align="stretch"
				overflow="auto">
				<>{children}</>
			</VStack>
		</>
	);
}
