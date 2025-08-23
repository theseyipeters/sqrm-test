import { FiSettings } from "react-icons/fi";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoWalletOutline } from "react-icons/io5";
import { VscGlobe } from "react-icons/vsc";
import { IconType } from "react-icons";

export interface SidebarLink {
	label: string;
	href: string;
	icon: IconType;
}

export const SIDEBAR_LINKS: SidebarLink[] = [
	{
		label: "Get Started",
		href: "/",
		icon: VscGlobe,
	},
	{
		label: "Dashboard",
		href: "/dashboard",
		icon: LuLayoutDashboard,
	},
	{
		label: "Accounts",
		href: "/accounts",
		icon: IoWalletOutline,
	},
	{
		label: "Transfers",
		href: "/transfers",
		icon: FiSettings,
	},
	{
		label: "Transactions",
		href: "/transactions",
		icon: FiSettings,
	},
	{
		label: "Settings",
		href: "/dashboard/settings",
		icon: FiSettings,
	},
];
