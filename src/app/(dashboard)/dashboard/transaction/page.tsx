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
														0) * 2}{" "}
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
														2}{" "}
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
											{Array.isArray(row.original.booking_list.b_date?.range) &&
												row.original.booking_list.b_date.range.map(
													(timeSlot: number) => {
														const startHour = timeSlot * 2;
														const endHour = startHour + 2;
														return (
															<Badge key={timeSlot} variant="outline" size="lg">
																{startHour.toString().padStart(2, "0")}:00 -{" "}
																{endHour.toString().padStart(2, "0")}:00
															</Badge>
														);
													}
												)}
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
