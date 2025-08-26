/* eslint-disable @typescript-eslint/no-explicit-any */
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
	Skeleton,
	Box,
} from "@chakra-ui/react";
import { FiCalendar, FiDownload } from "react-icons/fi";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useEffect, useMemo, useState } from "react";
import PageLayout from "@/components/layout/PageLayout/PageLayout";
import TransactionsTable from "./TransactionsTable/TransactionsTable";
import TransactionsGrid from "./TransactionsGrid/TransactionsGrid";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getTransactions } from "@/redux/slices/transactionSlice";

const accountFilter = createListCollection({
	items: [
		{ label: "All Transactions", value: "all" },
		{ label: "Transfer", value: "transfer" },
		{ label: "Withdrawal", value: "withdrawal" },
		{ label: "Deposit", value: "deposit" },
	],
});

export default function Transactions() {
	const dispatch = useAppDispatch();
	const { loading, transactions } = useAppSelector(
		(state) => state.transaction
	);
	const [isMobile] = useMediaQuery(["(max-width: 768px)"]);
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: new Date(2022, 0, 1),
		to: new Date(2022, 1, 28),
	});

	const [selectedAccountFilter, setSelectedAccountFilter] = useState(["all"]);

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

	const filteredTransactions = useMemo(() => {
		if (!transactions) return [];

		return transactions.filter((transaction) => {
			// Account type filter
			const accountFilterValue = selectedAccountFilter[0];
			const matchesAccountFilter =
				accountFilterValue === "all" ||
				transaction.type?.toLowerCase() === accountFilterValue.toLowerCase();

			// Date range filter
			let matchesDateFilter = true;
			if (dateRange?.from && dateRange?.to && transaction.date) {
				// Convert transaction date string to Date object
				const transactionDate = new Date(transaction.date);
				const fromDate = new Date(dateRange.from);
				const toDate = new Date(dateRange.to);

				// Set time to start/end of day for proper comparison
				fromDate.setHours(0, 0, 0, 0);
				toDate.setHours(23, 59, 59, 999);

				matchesDateFilter =
					transactionDate >= fromDate && transactionDate <= toDate;
			}

			return matchesAccountFilter && matchesDateFilter;
		});
	}, [transactions, selectedAccountFilter, dateRange]);

	const handleAccountFilterChange = (details: any) => {
		setSelectedAccountFilter(details.value);
	};

	const handleDateRangeChange = (newDateRange: any) => {
		setDateRange(newDateRange);
	};

	const handleGet = () => {
		dispatch(getTransactions());
	};

	useEffect(() => {
		handleGet();
	}, []);

	return (
		<PageLayout>
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
								value={selectedAccountFilter}
								onValueChange={handleAccountFilterChange}
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
													onSelect={handleDateRangeChange}
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
						<Flex>
							<Select.Root
								variant={"subtle"}
								collection={accountFilter}
								value={selectedAccountFilter}
								onValueChange={handleAccountFilterChange}
								size="md">
								<Select.HiddenSelect />
								<Select.Control w={180}>
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

			{loading ? (
				<Box w={"100%"}>
					<Skeleton
						variant={"shine"}
						height="700px"
					/>
				</Box>
			) : (
				<>
					{isMobile ? (
						<TransactionsGrid transactions={filteredTransactions} />
					) : (
						<TransactionsTable transactions={filteredTransactions} />
					)}
				</>
			)}
		</PageLayout>
	);
}
