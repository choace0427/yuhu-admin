"use client";

import { useMemo, useState } from "react";
import {
	MantineReactTable,
	type MRT_ColumnDef,
	type MRT_Row,
} from "mantine-react-table";
import {
	Box,
	Text,
	Badge,
	Stack,
	Flex,
	Avatar,
	Grid,
	Paper,
	Group,
} from "@mantine/core";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { useTransaction } from "@/services/transaction";
import { TransactionList } from "@/services/transaction/types";

const timeSlots = Array.from({ length: 32 }, (_, i) => {
	const hour = Math.floor(i / 4) + 9;
	const minute = (i % 4) * 15;
	return `${hour.toString().padStart(2, "0")}:${minute
		.toString()
		.padStart(2, "0")}`;
});

export default function BookingAdminPanel() {
	const { data, isError, isFetching, isLoading } = useTransaction();

	const columns = useMemo<MRT_ColumnDef<TransactionList>[]>(
		() => [
			{
				accessorKey: "no",
				header: "No",
				size: 10,
				Cell: ({ row }) => <Text>{row.index + 1}</Text>,
			},
			{
				accessorKey: "customer",
				header: "Customer",
				Cell: ({ row }) => (
					<Flex align={"center"} gap={"sm"}>
						<Avatar
							src={row.original.customers_list?.avatar_url}
							name={row.original.customers_list?.name}
							color="initials"
						/>
						<Text>{row.original.customers_list?.name}</Text>
					</Flex>
				),
			},
			{
				accessorKey: "therapist",
				header: "Therapist",
				Cell: ({ row }) => <Text>{row.original.therapist_list?.name}</Text>,
			},
			{
				accessorKey: "service",
				header: "Service",
				Cell: ({ row }) => (
					<Text>{row.original.therapist_list?.service || "Not specified"}</Text>
				),
			},
			{
				accessorKey: "date",
				header: "Date",
				Cell: ({ row }) => (
					<Text>{row.original.booking_list?.b_date?.date}</Text>
				),
			},
			{
				accessorKey: "booking_status",
				header: "Payment Status",
				Cell: ({ row }) => (
					<Badge
						color={
							row.original.status === "succeeded"
								? "green"
								: row.original.status === "refunded"
								? "red"
								: "yellow"
						}
					>
						{row.original.status}
					</Badge>
				),
			},
		],
		[]
	);

	return (
		<PageContainer title="Transaction List">
			<MantineReactTable
				enableFullScreenToggle={false}
				enableDensityToggle={false}
				enableColumnActions={false}
				columns={columns}
				data={data || []}
				renderDetailPanel={({ row }) => (
					<Box px="md" py="sm">
						<Grid gutter="xl">
							<Grid.Col span={6}>
								<Paper p="md" withBorder>
									<Stack gap="xs">
										<Text size="lg" fw={500} mb="xs">
											Therapist Information
										</Text>
										<Group gap="sm" align="center">
											<Avatar
												src={row.original.therapist_list?.avatar_url}
												alt={row.original.therapist_list?.name}
												name={row.original.therapist_list?.name}
												color="initials"
												radius="xl"
												size="lg"
											/>
											<div>
												<Text fw={500}>
													{row.original.therapist_list?.name}
												</Text>
												<Text size="sm" color="dimmed">
													{row.original.therapist_list?.email}{" "}
												</Text>
											</div>
										</Group>
										<Flex gap={"sm"}>
											<Text component="span" fw={500} size="sm">
												Services:
											</Text>
											<Flex gap={4}>
												{row.original.therapist_list.services.map(
													(item: any, index: any) => {
														return (
															<Badge
																key={index}
																className="bg-primary text-primary-foreground hover:bg-primary/90"
																variant="outline"
															>
																{item.service_type?.subcategory}
															</Badge>
														);
													}
												) || "Not specified"}
											</Flex>
										</Flex>
									</Stack>
								</Paper>
							</Grid.Col>
							<Grid.Col span={6}>
								<Paper p="md" withBorder>
									<Stack gap="xs">
										<Text size="lg" fw={500} mb="xs">
											Booking Details
										</Text>
										<Group gap="xl">
											<div>
												<Text size="sm" color="dimmed">
													Date
												</Text>
												<Text>
													{row.original.booking_list.b_date?.date ||
														"Not specified"}
												</Text>
											</div>
											<div>
												<Text size="sm" color="dimmed">
													Duration
												</Text>
												<Text>
													{(row.original.booking_list.b_date?.range?.length ||
														0) * 0.25}{" "}
													hours
												</Text>
											</div>
											<div>
												<Text size="sm" color="dimmed">
													Total Amount
												</Text>
												<Text>
													$
													{(row.original.booking_list.b_date?.range?.length ||
														0) *
														row.original.therapist_list.hourly_rate *
														0.25}{" "}
												</Text>
											</div>
											<div>
												<Text size="sm" color="dimmed">
													Payment Status
												</Text>
												<Badge
													size="md"
													color={
														row.original.status === "succeeded"
															? "green"
															: row.original.status === "refunded"
															? "red"
															: "yellow"
													}
												>
													{row.original.status}
												</Badge>
											</div>
										</Group>
										<Text size="sm" fw={500} mt="sm">
											Time Slots:
										</Text>
										<Group gap="xs">
											{Array.isArray(
												row.original.booking_list?.b_date?.range
											) &&
												row.original.booking_list?.b_date.range
													.filter(
														(index: number) =>
															index >= 0 && index < timeSlots.length
													)
													.map((index: number) => {
														const startTime = timeSlots[index - 1];
														const endTime = timeSlots[index];

														if (!endTime) return null;

														return (
															<Badge key={index} variant="outline" size="lg">
																{startTime} - {endTime}
															</Badge>
														);
													})}
										</Group>
									</Stack>
								</Paper>
							</Grid.Col>
						</Grid>
					</Box>
				)}
			/>
		</PageContainer>
	);
}
