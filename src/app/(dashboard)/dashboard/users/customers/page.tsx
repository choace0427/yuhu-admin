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
import { updateCustomer, useCustomers } from "@/services/customers";
import type { CustomersList } from "@/services/customers/types";
import {
	IconBlockquote,
	IconCheck,
	IconDotsVertical,
} from "@tabler/icons-react";
import { supabase } from "@/supabase";
import { useQueryClient } from "@tanstack/react-query";

export default function CustomersPage() {
	const { data, isError, isFetching, isLoading } = useCustomers();
	const queryClient = useQueryClient();

	const columns = useMemo<MRT_ColumnDef<CustomersList>[]>(
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
					const status = cell.getValue<"pending" | "accept" | "block">();
					let color: "red" | "yellow" | "green" = "red";
					if (status === "accept") color = "green";
					else if (status === "pending") color = "yellow";
					return <Badge color={color}>{status}</Badge>;
				},
				filterVariant: "select",
				mantineFilterSelectProps: {
					data: [
						{ label: "Accept", value: "accept" },
						{ label: "Pending", value: "pending" },
						{ label: "Block", value: "block" },
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
									onClick={() => updateCustomer("accept", cell.row.original.id)}
								>
									Accept User
								</Menu.Item>
								<Menu.Item
									leftSection={<IconBlockquote size={14} />}
									onClick={() => updateCustomer("block", cell.row.original.id)}
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

	const table = useCustomTable<CustomersList>({
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
		const customerListRealtime = supabase
			.channel("customer_list-db-changes")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "customers_list",
				},
				(payload) => {
					queryClient.invalidateQueries({ queryKey: ["customer_list"] });
				}
			)
			.subscribe();

		return () => {
			customerListRealtime.unsubscribe();
		};
	}, [queryClient]);

	return (
		<PageContainer title="Customers List">
			<Paper withBorder radius="md" p="md" mt="lg">
				<MantineReactTable table={table} />
			</Paper>
		</PageContainer>
	);
}
