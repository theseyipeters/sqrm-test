import { Box, HStack, Text, useMediaQuery, VStack } from "@chakra-ui/react";
import { SIDEBAR_LINKS } from "../data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setIsSidebarOpen } from "@/redux/slices/actionSlice";

export default function Sidebar() {
	const dispatch = useAppDispatch();
	const { isSidebarOpen } = useAppSelector((state) => state.action);
	const [isMobile] = useMediaQuery(["(max-width: 991px)"]);
	const pathname = usePathname();
	return (
		<>
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
											<Text fontSize={14}>{link.label}</Text>
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
										data-active={pathname === "/dashboard" ? "true" : undefined}
										onClick={() => dispatch(setIsSidebarOpen(false))}
										key={link.href}
										href={link.href}>
										<HStack
											data-active={isActive || undefined}
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
											<Text fontSize={14}>{link.label}</Text>
										</HStack>
									</Link>
								);
							})}
						</VStack>
					</VStack>
				</Box>
			)}
		</>
	);
}
