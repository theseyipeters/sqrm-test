import { useEffect, useState } from "react";
import {
	Checkbox,
	Table,
	Pagination,
	Flex,
	Text,
	ButtonGroup,
	IconButton,
	Status,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import StatusBadge from "@/components/_common/StatusBadge/StatusBadge";

interface TransactionTableProps {
	transactions: any[];
	pageSize?: number;
}

export default function TransactionsTable({
	transactions,
	pageSize = 10,
}: TransactionTableProps) {
	const [selection, setSelection] = useState<string[]>([]);
	const [page, setPage] = useState(1);
	const [visibleTransactions, setVisibleTransactions] = useState<any[]>([]);

	const totalPages = Math.ceil(transactions.length / pageSize);

	useEffect(() => {
		const start = (page - 1) * pageSize;
		const end = start + pageSize;

		setVisibleTransactions(transactions.slice(start, end));
	}, [page, pageSize, transactions]);

	return (
		<>
			<Table.Root
				variant="outline"
				size="sm">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeader
							px={5}
							py={5}>
							<Checkbox.Root
								colorPalette={"blue"}
								size="sm"
								aria-label="Select all"
								checked={
									selection.length === visibleTransactions.length
										? true
										: selection.length === 0
										? false
										: "indeterminate"
								}
								onCheckedChange={(changes) => {
									if (changes.checked) {
										setSelection(visibleTransactions.map((tx: any) => tx.id));
									} else {
										setSelection([]);
									}
								}}>
								<Checkbox.HiddenInput />
								<Checkbox.Control />
							</Checkbox.Root>
						</Table.ColumnHeader>
						<Table.ColumnHeader>Amount</Table.ColumnHeader>
						<Table.ColumnHeader>Transaction ID</Table.ColumnHeader>
						<Table.ColumnHeader>Transaction Type</Table.ColumnHeader>
						<Table.ColumnHeader>Date</Table.ColumnHeader>
						<Table.ColumnHeader>Time</Table.ColumnHeader>
						<Table.ColumnHeader>Status</Table.ColumnHeader>
					</Table.Row>
				</Table.Header>

				<Table.Body color={"#535379"}>
					{visibleTransactions.map((tx: any, index: number) => (
						<Table.Row key={index}>
							<Table.Cell
								px={5}
								py={5}>
								<Checkbox.Root
									colorPalette={"blue"}
									size="sm"
									mt="0.5"
									aria-label={`Select ${tx.id}`}
									checked={selection.includes(tx.id)}
									onCheckedChange={(changes) => {
										setSelection((prev) =>
											changes.checked
												? [...prev, tx.id]
												: prev.filter((id) => id !== tx.id)
										);
									}}>
									<Checkbox.HiddenInput />
									<Checkbox.Control />
								</Checkbox.Root>
							</Table.Cell>
							<Table.Cell
								color={"#000505"}
								fontWeight="normal">
								{tx.amount}
							</Table.Cell>
							<Table.Cell fontWeight="medium">{tx.id}</Table.Cell>
							<Table.Cell>{tx.type}</Table.Cell>
							<Table.Cell>{tx.date}</Table.Cell>
							<Table.Cell>{tx.time}</Table.Cell>
							<Table.Cell>
								<StatusBadge status={tx.status} />
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>

			{/* Pagination Section */}
			<Flex
				justify="space-between"
				align="center"
				mt={4}
				p={4}>
				<Text
					fontSize="sm"
					color="gray.500">
					Showing {(page - 1) * pageSize + 1}-
					{Math.min(page * pageSize, transactions.length)} of{" "}
					{transactions.length} results
				</Text>

				<Pagination.Root
					count={transactions.length}
					pageSize={pageSize}
					page={page}
					onPageChange={(e) => {
						setPage(e.page);
					}}>
					<ButtonGroup
						variant="ghost"
						size="sm">
						<Pagination.PrevTrigger
							color={"#535379"}
							asChild>
							<IconButton>
								<LuChevronLeft />
							</IconButton>
						</Pagination.PrevTrigger>

						<Pagination.Items
							render={(page) => (
								<IconButton
									color={"#535379"}
									key={page.value}
									variant={{ base: "ghost", _selected: "outline" }}>
									{page.value}
								</IconButton>
							)}
						/>

						<Pagination.NextTrigger
							color={"#535379"}
							asChild>
							<IconButton>
								<LuChevronRight />
							</IconButton>
						</Pagination.NextTrigger>
					</ButtonGroup>
				</Pagination.Root>
			</Flex>
		</>
	);
}
