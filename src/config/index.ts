import {
	IconComponents,
	IconDashboard,
	IconEyeDollar,
	IconLock,
	IconMessage,
	IconMoodSmile,
	IconRepeat,
	IconServicemark,
	IconUsers,
} from "@tabler/icons-react";
import type { NavItem } from "@/types/nav-item";

export const navLinks: NavItem[] = [
	{ label: "Dashboard", icon: IconDashboard, link: "/dashboard" },
	{
		label: "Users",
		icon: IconUsers,
		initiallyOpened: true,
		links: [
			{
				label: "Customers",
				link: "/dashboard/users/customers",
			},
			{
				label: "Therapist",
				link: "/dashboard/users/therapist",
			},
		],
	},
	{
		label: "Booking",
		icon: IconRepeat,
		link: "/dashboard/booking",
	},
	{
		label: "Transaction",
		icon: IconEyeDollar,
		link: "/dashboard/transaction",
	},
	{
		label: "Services",
		icon: IconServicemark,
		link: "/dashboard/services",
	},
	{
		label: "Chat",
		icon: IconMessage,
		link: "/dashboard/chat_history",
	},
	{
		label: "Components",
		icon: IconComponents,
		initiallyOpened: true,
		links: [
			{
				label: "Table",
				link: "/dashboard/table",
			},
			{
				label: "Form",
				link: "/dashboard/form",
			},
		],
	},
	{
		label: "Auth",
		icon: IconLock,
		initiallyOpened: true,
		links: [
			{
				label: "Login",
				link: "/login",
			},
			{
				label: "Register",
				link: "/register",
			},
		],
	},
	{
		label: "Sample",
		icon: IconMoodSmile,
		initiallyOpened: true,
		links: [
			{
				label: "Landing",
				link: "/",
			},
		],
	},
];
