"use client";

import {
	Button,
	Flex,
	HStack,
	Portal,
	Select,
	createListCollection,
	Popover,
	Separator,
	Stack,
	Text,
	useMediaQuery,
} from "@chakra-ui/react";
import { FiCalendar, FiDownload } from "react-icons/fi";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout/PageLayout";
import TransactionsTable from "./TransactionsTable/TransactionsTable";
import { transactions } from "./data";
import TransactionsGrid from "./TransactionsGrid/TransactionsGrid";

const accountFilter = createListCollection({
	items: [
		{ label: "All Accounts", value: "all" },
		{ label: "Savings", value: "savings" },
		{ label: "Checking", value: "checking" },
	],
});

export default function Transactions() {
	const [isMobile] = useMediaQuery(["(max-width: 991px)"]);
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: new Date(2023, 5, 6),
		to: new Date(2023, 5, 15),
	});

	const formatDateRange = () => {
		if (!dateRange?.from || !dateRange?.to) return "Select Date Range";
		return `${dateRange.from.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		})} - ${dateRange.to.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		})}`;
	};

	return (
		<PageLayout>
			{/* Header Filters */}
			<Stack>
				{isMobile ? (
					<Stack
						justify="space-between"
						align="flex-start"
						mb={4}
						gap={4}>
						{/* Account Select */}
						<Flex
							w={"100%"}
							justify={"space-between"}>
							<Select.Root
								variant={"subtle"}
								collection={accountFilter}
								value={[accountFilter.items[0].value]}
								size="sm">
								<Select.HiddenSelect />
								<Select.Control w={130}>
									<Select.Trigger>
										<Select.ValueText placeholder="Select" />
									</Select.Trigger>
									<Select.IndicatorGroup>
										<Select.Indicator />
									</Select.IndicatorGroup>
								</Select.Control>
								<Portal>
									<Select.Positioner>
										<Select.Content>
											{accountFilter.items.map((item) => (
												<Select.Item
													item={item}
													key={item.value}>
													{item.label}
													<Select.ItemIndicator />
												</Select.Item>
											))}
										</Select.Content>
									</Select.Positioner>
								</Portal>
							</Select.Root>

							<Button
								size="sm"
								color={"#535379"}
								variant="outline">
								<FiDownload size={16} />
								Export
							</Button>
						</Flex>

						<Flex w={"fit-content"}>
							<HStack
								w={"100%"}
								gap={3}>
								{/* Date Range Picker */}
								<Text fontSize={14}>Select Date Range:</Text>
								<Popover.Root>
									<Popover.Trigger asChild>
										<Button
											color={"#535379"}
											size="sm"
											variant="outline">
											<FiCalendar size={16} />
											{formatDateRange()}
										</Button>
									</Popover.Trigger>

									<Popover.Positioner>
										<Popover.Content
											w="auto"
											p={4}>
											<Popover.Arrow>
												<Popover.ArrowTip />
											</Popover.Arrow>

											<Popover.Body>
												<DayPicker
													mode="range"
													selected={dateRange}
													onSelect={setDateRange}
													numberOfMonths={2}
												/>
											</Popover.Body>
										</Popover.Content>
									</Popover.Positioner>
								</Popover.Root>
							</HStack>
						</Flex>
					</Stack>
				) : (
					<Flex
						justify="space-between"
						align="center"
						mb={4}
						gap={4}>
						{/* Account Select */}
						<Flex>
							<Select.Root
								variant={"subtle"}
								collection={accountFilter}
								value={[accountFilter.items[0].value]}
								size="sm">
								<Select.HiddenSelect />
								<Select.Control w={130}>
									<Select.Trigger>
										<Select.ValueText placeholder="Select" />
									</Select.Trigger>
									<Select.IndicatorGroup>
										<Select.Indicator />
									</Select.IndicatorGroup>
								</Select.Control>
								<Portal>
									<Select.Positioner>
										<Select.Content>
											{accountFilter.items.map((item) => (
												<Select.Item
													item={item}
													key={item.value}>
													{item.label}
													<Select.ItemIndicator />
												</Select.Item>
											))}
										</Select.Content>
									</Select.Positioner>
								</Portal>
							</Select.Root>
						</Flex>

						<Flex w={"fit-content"}>
							<HStack
								w={"100%"}
								gap={3}>
								<Text fontSize={14}>Select Date Range:</Text>
								<Popover.Root>
									<Popover.Trigger asChild>
										<Button
											color={"#535379"}
											size="sm"
											variant="outline">
											<FiCalendar size={16} />
											{formatDateRange()}
										</Button>
									</Popover.Trigger>

									<Popover.Positioner>
										<Popover.Content
											w="auto"
											p={4}>
											<Popover.Arrow>
												<Popover.ArrowTip />
											</Popover.Arrow>

											<Popover.Body>
												<DayPicker
													mode="range"
													selected={dateRange}
													onSelect={setDateRange}
													numberOfMonths={2}
												/>
											</Popover.Body>
										</Popover.Content>
									</Popover.Positioner>
								</Popover.Root>

								<Button
									size="sm"
									color={"#535379"}
									variant="outline">
									<FiDownload size={16} />
									Export
								</Button>
							</HStack>
						</Flex>
					</Flex>
				)}
				<Separator mb={8} />
			</Stack>

			{/* Transactions   */}
			{isMobile ? (
				<TransactionsGrid transactions={transactions} />
			) : (
				<TransactionsTable transactions={transactions} />
			)}
		</PageLayout>
	);
}
