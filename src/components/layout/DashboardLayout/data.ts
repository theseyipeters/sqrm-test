import { IconType } from "react-icons";
import {
	AccountsSvg,
	DashboardSvg,
	GlobeSvg,
	SettingsSvg,
	TransactionsSvg,
	TransfersSvg,
} from "@/svgs/svgs";

export interface SidebarLink {
	label: string;
	href: string;
	icon: IconType;
}

export const SIDEBAR_LINKS: SidebarLink[] = [
	{
		label: "Get Started",
		href: "/",
		icon: GlobeSvg,
	},
	{
		label: "Dashboard",
		href: "/dashboard",
		icon: DashboardSvg,
	},
	{
		label: "Accounts",
		href: "/accounts",
		icon: AccountsSvg,
	},
	{
		label: "Transfers",
		href: "/transfers",
		icon: TransfersSvg,
	},
	{
		label: "Transactions",
		href: "/transactions",
		icon: TransactionsSvg,
	},
	{
		label: "Settings",
		href: "/dashboard/settings",
		icon: SettingsSvg,
	},
];
