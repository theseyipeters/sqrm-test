import StatusBadge from "@/components/_common/StatusBadge/StatusBadge";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
	setPage,
	setVisibleTransactions,
} from "@/redux/slices/transactionSlice";
import { Transaction } from "@/types/transaction";
import {
	Box,
	ButtonGroup,
	Card,
	Flex,
	IconButton,
	Pagination,
	Separator,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface TransactionGridProps {
	transactions: Transaction[];
	pageSize?: number;
}

export default function TransactionsGrid({
	transactions,
	pageSize = 10,
}: TransactionGridProps) {
	const dispatch = useAppDispatch();
	const { page, visibleTransactions } = useAppSelector(
		(state) => state.transaction
	);

	useEffect(() => {
		const start = (page - 1) * pageSize;
		const end = start + pageSize;

		dispatch(setVisibleTransactions(transactions.slice(start, end)));
	}, [page, pageSize, transactions]);
	return (
		<Box>
			<Text fontWeight={500}>Transactions</Text>
			<VStack
				align={"flex-start"}
				mt={5}>
				{visibleTransactions?.map((tx: Transaction, index: number) => (
					<TransactionCard
						key={index}
						transaction={tx}
					/>
				))}
			</VStack>

			{/* Pagination Section */}
			<Flex
				direction={{ base: "column", sm: "row" }}
				align={{ base: "flex-start", sm: "center" }}
				gap={{ base: 4, sm: 2 }}
				justify="space-between"
				mt={4}
				p={0}>
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
		</Box>
	);
}

interface TransactionCardProp {
	transaction: Transaction;
}

const TransactionCard = ({ transaction }: TransactionCardProp) => {
	return (
		<Card.Root
			p={4}
			w={"100%"}
			border={"1px solid"}
			borderColor={"#BEBEBE40"}
			size="sm">
			<Card.Body color="fg.muted">
				<VStack
					w={"100%"}
					gap={5}>
					<Flex
						w={"100%"}
						align={"center"}
						justify={"space-between"}>
						<Text>AMOUNT:</Text>
						<Text>{transaction.amount}</Text>
					</Flex>
					<Separator w={"100%"} />
					<Flex
						w={"100%"}
						align={"center"}
						justify={"space-between"}>
						<Text>TRANSACTION TYPE:</Text>
						<Text>{transaction.type}</Text>
					</Flex>
					<Separator w={"100%"} />
					<Flex
						w={"100%"}
						align={"center"}
						justify={"space-between"}>
						<Text>DATE:</Text>
						<Text>{transaction.date}</Text>
					</Flex>
					<Separator w={"100%"} />
					<Flex
						w={"100%"}
						align={"center"}
						justify={"space-between"}>
						<Text>STATUS:</Text>
						<StatusBadge status={transaction.status} />
					</Flex>
				</VStack>
			</Card.Body>
		</Card.Root>
	);
};
