import { useEffect, useState } from "react";
import {
	Checkbox,
	Table,
	Pagination,
	Flex,
	Text,
	ButtonGroup,
	IconButton,
	EmptyState,
	VStack,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import StatusBadge from "@/components/_common/StatusBadge/StatusBadge";
import { Transaction } from "@/types/transaction";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
	setPage,
	setVisibleTransactions,
} from "@/redux/slices/transactionSlice";
import { MdOutlineHourglassEmpty } from "react-icons/md";

interface TransactionTableProps {
	transactions: Transaction[];
	pageSize?: number;
}

export default function TransactionsTable({
	transactions,
	pageSize = 10,
}: TransactionTableProps) {
	const dispatch = useAppDispatch();
	const { page, visibleTransactions } = useAppSelector(
		(state) => state.transaction
	);
	const [selection, setSelection] = useState<string[]>([]);

	useEffect(() => {
		const start = (page - 1) * pageSize;
		const end = start + pageSize;

		dispatch(setVisibleTransactions(transactions.slice(start, end)));
	}, [dispatch, page, pageSize, transactions]);

	if (transactions.length === 0) {
		return (
			<EmptyState.Root>
				<EmptyState.Content>
					<EmptyState.Indicator>
						<MdOutlineHourglassEmpty />
					</EmptyState.Indicator>
					<VStack textAlign="center">
						<EmptyState.Title>No transactions found</EmptyState.Title>
						<EmptyState.Description>
							You don&apos;t have any transactions yet. Once you start making
							payments, they&apos;ll show up here.
						</EmptyState.Description>
					</VStack>
				</EmptyState.Content>
			</EmptyState.Root>
		);
	}

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
									selection.length === visibleTransactions?.length
										? true
										: selection.length === 0
										? false
										: "indeterminate"
								}
								onCheckedChange={(changes) => {
									if (changes.checked && visibleTransactions) {
										setSelection(
											visibleTransactions.map((tx: Transaction) => tx.id)
										);
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
					{visibleTransactions?.map((tx: Transaction, index: number) => (
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
						dispatch(setPage(e.page));
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
