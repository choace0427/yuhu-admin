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
import { useBooking } from "@/services/booking";
import { BookingList } from "@/services/booking/types";
import { PageContainer } from "@/components/PageContainer/PageContainer";

export default function BookingAdminPanel() {
	const { data, isError, isFetching, isLoading } = useBooking();

	const columns = useMemo<MRT_ColumnDef<BookingList>[]>(
		() => [
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
					<Text>{row.original.service || "Not specified"}</Text>
				),
			},
			{
				accessorKey: "date",
				header: "Date",
				Cell: ({ row }) => <Text>{row.original.b_date?.date}</Text>,
			},
			{
				accessorKey: "booking_status",
				header: "Status",
				Cell: ({ row }) => (
					<Badge
						color={
							row.original.booking_status === "confirmed"
								? "green"
								: row.original.booking_status === "cancelled"
								? "red"
								: "yellow"
						}
					>
						{row.original.booking_status}
					</Badge>
				),
			},
		],
		[]
	);

	return (
		<PageContainer title="Booking List">
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
										<Text size="sm" mt="xs">
											<Text component="span" fw={500}>
												Service:
											</Text>{" "}
											{row.original.service || "Not specified"}
										</Text>
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
													{row.original.b_date?.date || "Not specified"}
												</Text>
											</div>
											<div>
												<Text size="sm" color="dimmed">
													Duration
												</Text>
												<Text>
													{(row.original.b_date?.range?.length || 0) * 2} hours
												</Text>
											</div>
											<div>
												<Text size="sm" color="dimmed">
													Status
												</Text>
												<Badge
													size="lg"
													color={
														row.original.booking_status === "confirmed"
															? "green"
															: row.original.booking_status === "cancelled"
															? "red"
															: "yellow"
													}
												>
													{row.original.booking_status}
												</Badge>
											</div>
										</Group>
										<Text size="sm" fw={500} mt="sm">
											Time Slots:
										</Text>
										<Group gap="xs">
											{Array.isArray(row.original.b_date?.range) &&
												row.original.b_date.range.map((timeSlot: number) => {
													const startHour = timeSlot * 2;
													const endHour = startHour + 2;
													return (
														<Badge key={timeSlot} variant="outline" size="lg">
															{startHour.toString().padStart(2, "0")}:00 -{" "}
															{endHour.toString().padStart(2, "0")}:00
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
