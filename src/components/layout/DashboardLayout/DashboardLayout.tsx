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
	useMediaQuery,
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
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isMobile] = useMediaQuery(["(max-width: 991px)"]);
	const pathname = usePathname();

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	return (
		<Box
			h="100vh"
			w={"100%"}
			bg="gray.50"
			position={"relative"}
			overflow={"hidden"}
			color="gray.800">
			{/* Header */}
			<Flex
				as="header"
				position={"fixed"}
				top={0}
				left={0}
				w={"100%"}
				zIndex={30}
				h="80px"
				align="center"
				justify="space-between"
				borderBottomWidth="1px"
				px={{ base: 5, md: 8 }}
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

			<Flex
				h="100vh"
				pt={"80px"}>
				{/* Sidebar */}
				{!isMobile ? (
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
				) : null}

				{isMobile && isSidebarOpen && (
					<Box
						w={"263px"}
						bg="white"
						borderRightWidth="1px"
						h={"100%"}
						pt={"100px"}
						pos={"absolute"}
						top={0}
						left={0}
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
											onClick={() => setIsSidebarOpen(false)}
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
		</Box>
	);
}
