import { Card, Clipboard, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function OnlinePayments() {
	return (
		<VStack align={"start"}>
			<Card.Root width="325px">
				<Card.Body
					py={5}
					px={6}
					gap="1">
					<Card.Title
						fontSize={13}
						fontWeight={400}
						color={"gray.400"}>
						ACCOUNT DETAILS
					</Card.Title>
					<Stack gap={1.5}>
						<Text
							fontSize={13}
							fontWeight={400}
							color={""}>
							STERLING BANK
						</Text>

						<Flex
							align={"center"}
							justify={"space-between"}>
							<Text
								fontSize={21}
								fontWeight={700}>
								8000000000
							</Text>

							<Clipboard.Root
								bg={"#9F56D433"}
								color={"#9F56D4"}
								rounded={8}
								alignItems={"center"}
								justifyContent={"center"}
								py={1.5}
								px={2.5}
								value="8000000000">
								<Flex
									gap={2}
									align={"center"}
									justify={"center"}>
									<Clipboard.Trigger asChild>
										<Clipboard.Indicator />
									</Clipboard.Trigger>
									<Text fontSize={12}>Copy</Text>
								</Flex>
							</Clipboard.Root>
						</Flex>
					</Stack>
				</Card.Body>
			</Card.Root>

			{/* -------- Chart here ---------- */}
		</VStack>
	);
}
