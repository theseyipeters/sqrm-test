"use client";

import {
	Box,
	Flex,
	Text,
	Button,
	Select,
	Portal,
	createListCollection,
	Card,
	Group,
	Stack,
	useMediaQuery,
} from "@chakra-ui/react";
import { Chart, useChart } from "@chakra-ui/charts";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { useState } from "react";
import { calcPercentageChange } from "@/utils/helper";

const dateRange = createListCollection({
	items: [
		{ label: "Today", value: "today" },
		{ label: "Last 7 days", value: "7days" },
		{ label: "Last 30 days", value: "30days" },
	],
});

const PaymentsBarChart = () => {
	const chart = useChart({
		data: [
			{ month: "Jan", revenue: 280000 },
			{ month: "Feb", revenue: 450000 },
			{ month: "Mar", revenue: 360000 },
			{ month: "Apr", revenue: 270000 },
			{ month: "May", revenue: 70000 },
			{ month: "Jun", revenue: 150000 },
			{ month: "Jul", revenue: 120000 },
			{ month: "Aug", revenue: 160000 },
			{ month: "Sep", revenue: 140000 },
			{ month: "Oct", revenue: 170000 },
			{ month: "Nov", revenue: 220000 },
			{ month: "Dec", revenue: 0 },
		],
		series: [{ name: "revenue", color: "yellow.400" }],
	});

	const [activeFilter, setActiveFilter] = useState<
		"today" | "7days" | "30days"
	>("7days");
	const [filteredData, setFilteredData] = useState(chart.data);

	const totalRevenue = filteredData.reduce(
		(sum, item) => sum + item.revenue,
		0
	);

	const [isMobile] = useMediaQuery(["(max-width: 768px)"]);

	const handleFilterChange = (value: "today" | "7days" | "30days") => {
		setActiveFilter(value);

		if (value === "today") {
			setFilteredData(chart.data.slice(-1));
		} else if (value === "7days") {
			setFilteredData(chart.data.slice(-7));
		} else {
			setFilteredData(chart.data);
		}
	};

	let percentageChange = "0.00%";

	if (activeFilter === "7days") {
		const current = filteredData.reduce((sum, d) => sum + d.revenue, 0);
		const prev = chart.data
			.slice(-14, -7)
			.reduce((sum, d) => sum + d.revenue, 0);
		percentageChange = calcPercentageChange(current, prev);
	}

	return (
		<Box
			px={isMobile ? 0 : 8}
			py={isMobile ? 0 : 6}
			borderWidth={isMobile ? "0" : "1px"}
			w={"100%"}
			rounded="md">
			{/* Header */}

			{!isMobile && (
				<Flex
					w={"100%"}
					justify="space-between"
					align="center"
					mb={4}>
					{/* Filter Controls */}
					<Flex
						w={"100%"}
						gap={4}
						justify={"space-between"}
						align={{ base: "flex-start", md: "center" }}
						direction={{ base: "column", md: "row" }}>
						<Select.Root
							collection={dateRange}
							value={[activeFilter]}
							onValueChange={(val) =>
								handleFilterChange(val.value[0] as "today" | "7days" | "30days")
							}
							size="sm">
							<Select.HiddenSelect />
							<Group>
								<Select.Label>Showing data for</Select.Label>
								<Select.Control w={200}>
									<Select.Trigger>
										<Select.ValueText placeholder="Select" />
									</Select.Trigger>
									<Select.IndicatorGroup>
										<Select.Indicator />
									</Select.IndicatorGroup>
								</Select.Control>
							</Group>
							<Portal>
								<Select.Positioner>
									<Select.Content>
										{dateRange.items.map((item) => (
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

						<Group>
							<Button
								size="sm"
								variant={activeFilter === "today" ? "solid" : "ghost"}
								bg={activeFilter === "today" ? "#00C6FB0F" : ""}
								color={"#000000"}
								fontWeight={400}
								onClick={() => handleFilterChange("today")}>
								Today
							</Button>
							<Button
								size="sm"
								variant={activeFilter === "7days" ? "solid" : "ghost"}
								bg={activeFilter === "7days" ? "#00C6FB0F" : ""}
								color={"#000000"}
								fontWeight={400}
								onClick={() => handleFilterChange("7days")}>
								Last 7 days
							</Button>
							<Button
								size="sm"
								variant={activeFilter === "30days" ? "solid" : "ghost"}
								bg={activeFilter === "30days" ? "#00C6FB0F" : ""}
								color={"#000000"}
								fontWeight={400}
								onClick={() => handleFilterChange("30days")}>
								Last 30 days
							</Button>
						</Group>
					</Flex>
				</Flex>
			)}

			{/* Chart */}
			<Card.Root mt={"30px"}>
				<Card.Body w={"100%"}>
					<Stack w={"100%"}>
						<Flex
							w={"100%"}
							justify={"space-between"}
							align={"center"}>
							{!isMobile && (
								<Group>
									<Text fontWeight="bold">Revenue</Text>

									<Text
										color={
											percentageChange.startsWith("-") ? "red.500" : "green.500"
										}
										fontSize="sm">
										{percentageChange} vs{" "}
										{activeFilter === "today"
											? "Yesterday"
											: activeFilter === "7days"
											? "Last 7 days"
											: "Last 30 days"}
									</Text>
								</Group>
							)}

							{isMobile && <Text fontWeight="bold">Revenue</Text>}

							{isMobile && (
								<Flex>
									<Select.Root
										collection={dateRange}
										value={[activeFilter]}
										onValueChange={(val) =>
											handleFilterChange(
												val.value[0] as "today" | "7days" | "30days"
											)
										}
										size="sm">
										<Select.HiddenSelect />
										<Group>
											<Select.Control w={130}>
												<Select.Trigger>
													<Select.ValueText placeholder="Select" />
												</Select.Trigger>
												<Select.IndicatorGroup>
													<Select.Indicator />
												</Select.IndicatorGroup>
											</Select.Control>
										</Group>
										<Portal>
											<Select.Positioner>
												<Select.Content>
													{dateRange.items.map((item) => (
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
							)}
						</Flex>

						{!isMobile && (
							<Group>
								<Text
									color={"#424242"}
									fontSize="3xl"
									fontWeight={700}>
									₦{totalRevenue.toLocaleString()}
								</Text>

								<Text
									fontSize="sm"
									color="gray.500">
									in total value
								</Text>
							</Group>
						)}
					</Stack>
					<Chart.Root
						mt={"40px"}
						chart={chart}
						maxH="sm">
						<BarChart data={filteredData}>
							<CartesianGrid
								stroke={chart.color("border.muted")}
								vertical={false}
							/>
							<XAxis
								dataKey={chart.key("month")}
								axisLine={false}
								tickLine={false}
							/>
							<YAxis
								axisLine={false}
								tickLine={false}
								tickFormatter={(val) => `${val / 1000}K`}
							/>
							<Tooltip
								formatter={(val: number) => `₦${val.toLocaleString()}`}
							/>
							{chart.series.map((item) => (
								<Bar
									key={item.name}
									dataKey={chart.key(item.name)}
									fill={chart.color(item.color)}
									radius={[4, 4, 0, 0]}
								/>
							))}
						</BarChart>
					</Chart.Root>
				</Card.Body>
			</Card.Root>
		</Box>
	);
};

export default PaymentsBarChart;
