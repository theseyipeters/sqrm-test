import PageLayout from "@/components/layout/PageLayout/PageLayout";
import { Tabs, VStack } from "@chakra-ui/react";
import OnlinePayments from "./OnlinePayments/OnlinePayments";

export default function DashboardPage() {
	return (
		<PageLayout>
			<VStack w={"100%"}>
				<Tabs.Root
					colorPalette={"blue"}
					w={"100%"}
					defaultValue="payments">
					<Tabs.List>
						<Tabs.Trigger
							w={"fit-content"}
							px={5}
							py={4}
							borderColor="brand.200"
							fontSize={16}
							fontWeight={600}
							value="payments">
							Online Payments
						</Tabs.Trigger>
					</Tabs.List>

					<Tabs.Content
						mt={4}
						value="payments">
						<OnlinePayments />
					</Tabs.Content>
				</Tabs.Root>
			</VStack>
		</PageLayout>
	);
}
