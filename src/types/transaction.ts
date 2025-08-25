export interface Transaction {
	amount: string;
	id: string;
	type: string;
	date: string;
	time: string;
	status: "Processed" | "Failed" | "Pending";
}
