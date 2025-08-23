import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import DashboardPage from "@/components/pages/DashboardPage/DashboardPage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Dashboard",
		description: "Manage and view all payments",
	};
}

export default function page() {
	return (
		<DashboardLayout>
			<DashboardPage />
		</DashboardLayout>
	);
}
