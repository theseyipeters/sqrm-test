"use client";

import { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import { Toaster } from "@/components/ui/toaster";

interface DashboardLayoutProps {
	children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<Box
			h="100vh"
			w={"100%"}
			bg="gray.50"
			position={"relative"}
			overflow={"hidden"}
			color="gray.800">
			<Header />

			<Flex
				h="100vh"
				pt={"80px"}>
				<Sidebar />

				{/* Main content */}
				<Flex
					flex="1"
					h={"100%"}
					direction="column">
					<Box
						h={"100%"}
						as="main"
						flex="1">
						{children}
					</Box>
				</Flex>
			</Flex>

			<Toaster />
		</Box>
	);
}
