"use client";

import {
	ActionIcon,
	Box,
	Drawer,
	Indicator,
	Menu,
	ScrollArea,
	Stack,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBell, IconSearch, IconSettings } from "@tabler/icons-react";
import classes from "./AdminHeader.module.css";
import { DirectionSwitcher } from "../DirectionSwitcher/DirectionSwitcher";
import { Logo } from "../Logo/Logo";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import {
	getNotificationsList,
	useNotification,
} from "@/services/notifications";
import { NotificationsList } from "@/services/notifications/types";

interface Props {
	burger?: React.ReactNode;
}

export function AdminHeader({ burger }: Props) {
	const supabase = createClient();

	const [notifications, setNotifications] = useState<any[]>([]);

	const handleNotification = async () => {
		const { data, error } = await supabase
			.from("notifications")
			.select()
			.eq("read_status", false);
		if (error) {
			console.error(error);
			throw error;
		}

		setNotifications(data);
	};

	const handleReadNotifications = async (id: any) => {
		const { error } = await supabase
			.from("notifications")
			.update({ read_status: true })
			.eq("notification_id", id);

		if (error) throw error;

		getNotificationsList();
	};

	const { user } = useAuthStore();

	useEffect(() => {
		const notificationChannel = supabase
			.channel("noti-db-changes")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "notifications",
					filter: `notification_type=eq.${5}`,
				},
				handleNotification
			)
			.subscribe();

		return () => {
			notificationChannel.unsubscribe();
		};
	}, []);

	return (
		<header className={classes.header}>
			{burger && burger}
			<Logo />
			<Box style={{ flex: 1 }} />
			<TextInput
				placeholder="Search"
				variant="filled"
				leftSection={<IconSearch size="0.8rem" />}
			/>
			<Menu shadow="md" width={300}>
				<Menu.Target>
					<ActionIcon variant="subtle" size={"lg"}>
						<Indicator
							inline
							processing
							color="red"
							size={8}
							offset={2}
							disabled={
								notifications && notifications?.length > 0 ? false : true
							}
						>
							<IconBell size="1.25rem" />
						</Indicator>
					</ActionIcon>
				</Menu.Target>
				<Menu.Dropdown>
					<ScrollArea mah={200}>
						{notifications && notifications?.length > 0 ? (
							notifications?.map((item: NotificationsList, index) => {
								return (
									<Menu.Item
										key={index}
										onClick={() =>
											handleReadNotifications(item?.notification_id)
										}
									>
										<Title order={6}>{item.content}</Title>
									</Menu.Item>
								);
							})
						) : (
							<Menu.Item>
								<Text>No Notifications</Text>
							</Menu.Item>
						)}
					</ScrollArea>
				</Menu.Dropdown>
			</Menu>
		</header>
	);
}
