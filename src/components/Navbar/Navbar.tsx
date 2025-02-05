"use client";

import { Divider, ScrollArea } from "@mantine/core";

import type { NavItem } from "@/types/nav-item";
import { NavLinksGroup } from "./NavLinksGroup";
import classes from "./Navbar.module.css";

import { ActionIcon, Avatar, Flex, Menu, Text } from "@mantine/core";
import {
	IconDotsVertical,
	IconLogout,
	IconSettings,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface Props {
	data: NavItem[];
	hidden?: boolean;
}

export function Navbar({ data }: Props) {
	const links = data.map((item) => (
		<NavLinksGroup key={item.label} {...item} />
	));
	const signOut = useAuthStore((state: any) => state.signOut);
	const user = useAuthStore((state: any) => state.user);

	const router = useRouter();
	return (
		<>
			<ScrollArea className={classes.links}>
				<div className={classes.linksInner}>{links}</div>
			</ScrollArea>

			<Divider />
			<div className={classes.footer}>
				<Flex
					align={"center"}
					justify={"space-between"}
					className={classes.user}
				>
					<Flex direction="row" gap={8}>
						<Avatar
							src={user?.avatar || ""}
							radius="xl"
							name="Admin"
							color="initials"
						/>

						<div style={{ flex: 1 }}>
							<Text size="sm">Admin</Text>

							<Text c="dimmed" size="xs">
								{user?.email}
							</Text>
						</div>
					</Flex>
					<Menu withinPortal position="bottom-end" shadow="sm">
						<Menu.Target>
							<ActionIcon variant="subtle">
								<IconDotsVertical size="1rem" />
							</ActionIcon>
						</Menu.Target>

						<Menu.Dropdown>
							<Menu.Item
								leftSection={<IconSettings size={14} />}
								onClick={() => router.push("/dashboard/settings")}
							>
								Settings
							</Menu.Item>
							<Menu.Divider />
							<Menu.Item
								color="red"
								leftSection={<IconLogout size={14} />}
								onClick={() => signOut()}
							>
								Sign Out
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Flex>
			</div>
		</>
	);
}
