import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import Transactions from "@/components/pages/Transactions/Transactions";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Transactions",
		description: "Manage and view all transactions",
	};
}

export default function page() {
	return (
		<DashboardLayout>
			<Transactions />
		</DashboardLayout>
	);
}
