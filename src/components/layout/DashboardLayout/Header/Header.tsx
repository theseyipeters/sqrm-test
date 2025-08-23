import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setIsSidebarOpen } from "@/redux/slices/actionSlice";
import { FundRLogo } from "@/svgs/svgs";
import { Box, Flex, IconButton, Text, useMediaQuery } from "@chakra-ui/react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
	const dispatch = useAppDispatch();
	const { isSidebarOpen } = useAppSelector((state) => state.action);
	const [isMobile] = useMediaQuery(["(max-width: 991px)"]);

	const toggleSidebar = () => dispatch(setIsSidebarOpen(!isSidebarOpen));
	return (
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
	);
}
