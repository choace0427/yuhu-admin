"use client";
import { PageContainer } from "@/components/PageContainer/PageContainer";

import {
	ActionIcon,
	Avatar,
	Badge,
	Flex,
	Menu,
	Paper,
	Rating,
	Space,
	Text,
	Title,
} from "@mantine/core";
import { MantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo } from "react";
import { useCustomTable } from "@/hooks/use-custom-table";
import {
	IconBlockquote,
	IconCheck,
	IconDotsVertical,
} from "@tabler/icons-react";
import { createClient } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { updateTherapist, useTherapists } from "@/services/therapist";
import { TherapistList } from "@/services/therapist/types";

export default function TherapistPage() {
	const { data, isError, isFetching, isLoading } = useTherapists();
	const queryTherapist = useQueryClient();

	const columns = useMemo<MRT_ColumnDef<TherapistList>[]>(
		() => [
			{
				accessorKey: "no",
				header: "No",
				size: 10,
				Cell: ({ cell }) => {
					return <Text>{cell.row.index + 1}</Text>;
				},
			},
			{
				accessorKey: "user",
				header: "User",
				size: 240,
				Cell: ({ cell }) => {
					return (
						<Flex align={"center"} gap={"sm"}>
							<Avatar
								color="initials"
								name={cell.row.original.name}
								src={cell.row.original.avatar_url}
							/>
							<Text>{cell.row.original.name}</Text>
						</Flex>
					);
				},
			},
			{
				accessorKey: "email",
				header: "Email",
			},
			{
				accessorKey: "hourly_rate",
				header: "Hourly Rate",
				size: 100,
				Cell: ({ cell }) => {
					return <Text>${cell.row.original.hourly_rate}/hr</Text>;
				},
			},
			{
				accessorKey: "summary",
				header: "Summary",
				size: 500,
				Cell: ({ cell }) => {
					return (
						<Text lineClamp={2} size="xs" fw={500}>
							{cell.row.original.summary}
						</Text>
					);
				},
			},
			{
				accessorKey: "phone",
				header: "Phone",
			},
			{
				accessorKey: "location",
				header: "Location",
			},
			{
				accessorKey: "status",
				header: "Status",
				Cell: ({ cell }) => {
					const status = cell.getValue<"pending" | "accepted" | "blocked">();
					let color: "red" | "yellow" | "green" = "red";
					if (status === "accepted") color = "green";
					else if (status === "pending") color = "yellow";
					return <Badge color={color}>{status}</Badge>;
				},
				filterVariant: "select",
				mantineFilterSelectProps: {
					data: [
						{ label: "Accepted", value: "accepted" },
						{ label: "Pending", value: "pending" },
						{ label: "Blocked", value: "blocked" },
					] as any,
				},
			},
			{
				accessorKey: "action",
				header: "Actions",
				size: 50,
				Cell: ({ cell }) => {
					return (
						<Menu withinPortal position="bottom-end" shadow="sm">
							<Menu.Target>
								<ActionIcon variant="subtle">
									<IconDotsVertical size="1rem" />
								</ActionIcon>
							</Menu.Target>

							<Menu.Dropdown>
								<Menu.Item
									leftSection={<IconCheck size={14} />}
									onClick={() =>
										updateTherapist("accepted", cell.row.original.id)
									}
								>
									Accept User
								</Menu.Item>
								<Menu.Item
									leftSection={<IconBlockquote size={14} />}
									onClick={() =>
										updateTherapist("blocked", cell.row.original.id)
									}
								>
									Block User
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					);
				},
			},
		],
		[]
	);

	const table = useCustomTable<TherapistList>({
		columns,
		data: data ?? [],
		rowCount: data?.length ?? 0,
		state: {
			isLoading,
			showAlertBanner: isError,
			showProgressBars: isFetching,
		},
	});

	useEffect(() => {
		const supabase = createClient();
		const therapistListRealtime = supabase
			.channel("therapist_list-db-changes")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "therapist_list",
				},
				(payload) => {
					queryTherapist.invalidateQueries({ queryKey: ["therapist_list"] });
				}
			)
			.subscribe();

		return () => {
			therapistListRealtime.unsubscribe();
		};
	}, [queryTherapist]);

	return (
		<PageContainer title="Therapist List">
			<Paper withBorder radius="md" p="md" mt="lg">
				<MantineReactTable table={table} />
			</Paper>
		</PageContainer>
	);
}
