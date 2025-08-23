import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import Transactions from "@/components/pages/Transactions/Transactions";
import React from "react";

export default function page() {
	return (
		<DashboardLayout>
			<Transactions />
		</DashboardLayout>
	);
}
