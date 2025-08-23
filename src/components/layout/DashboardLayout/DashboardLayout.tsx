"use client";

import { ReactNode, useState } from "react";
import {
	Box,
	Flex,
	IconButton,
	Text,
	VStack,
	HStack,
	useBreakpointValue,
	Stack,
} from "@chakra-ui/react";
import { FiMenu, FiX } from "react-icons/fi";
import { FundRLogo } from "@/svgs/svgs";
import { SIDEBAR_LINKS } from "./data";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardLayoutProps {
	children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const isMobile = useBreakpointValue({ base: true, md: false });
	const pathname = usePathname();

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	return (
		<Stack
			gap={0}
			h="100vh"
			bg="gray.50"
			color="gray.800">
			{/* Header */}
			<Flex
				as="header"
				h="80px"
				align="center"
				justify="space-between"
				borderBottomWidth="1px"
				px={8}
				bg="white">
				{isMobile && (
					<IconButton
						aria-label="Toggle Menu"
						onClick={toggleSidebar}
						variant="ghost">
						{isSidebarOpen ? <FiX /> : <FiMenu />}
					</IconButton>
				)}
				<Box>
					<FundRLogo />
				</Box>
				<Box>
					<Text
						fontSize="sm"
						color="gray.500">
						Hello, Seyi
					</Text>
				</Box>
			</Flex>

			<Flex h="100%">
				{/* Sidebar */}
				{(!isMobile || isSidebarOpen) && (
					<Box
						w={{ base: "200px", md: "263px" }}
						bg="white"
						borderRightWidth="1px"
						pt={10}
						pos="relative"
						zIndex={10}>
						<VStack
							align="stretch"
							gap={6}>
							<VStack
								align="stretch"
								gap={0}>
								{SIDEBAR_LINKS.map((link) => {
									const isActive = pathname === link.href;
									return (
										<Link
											key={link.href}
											href={link.href}>
											<HStack
												_hover={{
													bg: isActive ? "" : "#3976E820",
													cursor: "pointer",
												}}
												py={4}
												px={8}
												bg={isActive ? "#3976E8" : "transparent"}
												fontWeight={isActive ? "medium" : "normal"}
												color={isActive ? "white" : "#04004D"}>
												<link.icon />
												<Text>{link.label}</Text>
											</HStack>
										</Link>
									);
								})}
							</VStack>
						</VStack>
					</Box>
				)}

				{/* Main content */}
				<Flex
					flex="1"
					direction="column">
					<Box
						as="main"
						flex="1"
						overflowY="auto">
						{children}
					</Box>
				</Flex>
			</Flex>
		</Stack>
	);
}
