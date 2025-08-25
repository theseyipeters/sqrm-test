import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setIsSidebarOpen } from "@/redux/slices/actionSlice";
import { BellSvg, FundRLogo } from "@/svgs/svgs";
import { Box, Flex, Group, IconButton, useMediaQuery } from "@chakra-ui/react";
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
				<Group gap={4}>
					<Box>
						<BellSvg />
					</Box>
					<Group>
						<Flex
							align={"center"}
							justify={"center"}
							color={"white"}
							w={50}
							h={50}
							rounded={"100%"}
							bg={"#0CBC8B"}>
							QA
						</Flex>
						<svg
							width="8"
							height="6"
							viewBox="0 0 8 6"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M3.46536 5.15082L0.23209 1.91754C-0.00552567 1.67993 -0.0606869 1.40412 0.0666074 1.09013C0.193902 0.776137 0.427274 0.619141 0.766726 0.619141H7.23327C7.57273 0.619141 7.8061 0.776137 7.93339 1.09013C8.06069 1.40412 8.00553 1.67993 7.76791 1.91754L4.53464 5.15082C4.44977 5.23568 4.36491 5.29508 4.28005 5.32903C4.19518 5.36297 4.10184 5.37995 4 5.37995C3.89816 5.37995 3.80482 5.36297 3.71995 5.32903C3.63509 5.29508 3.55023 5.23568 3.46536 5.15082Z"
								fill="#606060"
							/>
						</svg>
					</Group>
				</Group>
			</Box>
		</Flex>
	);
}
