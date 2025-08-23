import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import Homepage from "@/components/pages/Homepage/Homepage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Users",
		description: "Manage and view all registered users",
	};
}

export default function Home() {
	return (
		<DashboardLayout>
			<Homepage />
		</DashboardLayout>
	);
}
