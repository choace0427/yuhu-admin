"use client";

import {
	Card,
	Text,
	Group,
	Avatar,
	Stack,
	Badge,
	SimpleGrid,
	Paper,
	ThemeIcon,
} from "@mantine/core";
import { IconUsers, IconUserStar, IconCalendar } from "@tabler/icons-react";
import { useCustomers } from "@/services/customers";
import { useTherapists } from "@/services/therapist";
import { useBooking } from "@/services/booking";

export function DashboardContent() {
	const { data: customerData } = useCustomers();
	const { data: therapistData } = useTherapists();
	const { data: bookingData } = useBooking();
	return (
		<div>
			<SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
				<Paper withBorder p="md" radius="md">
					<Group ps="apart">
						<div>
							<Text color="dimmed" size="xs" tt="uppercase" fw={700}>
								Customers
							</Text>
							<Text fw={700} size="xl">
								{customerData?.length || 0}
							</Text>
						</div>
						<ThemeIcon color="teal" variant="light" size={38} radius="md">
							<IconUsers size={24} />
						</ThemeIcon>
					</Group>
					<Text color="green" size="sm" mt="md">
						12%
					</Text>
				</Paper>

				<Paper withBorder p="md" radius="md">
					<Group ps="apart">
						<div>
							<Text color="dimmed" size="xs" tt="uppercase" fw={700}>
								Therapists
							</Text>
							<Text fw={700} size="xl">
								{therapistData?.length || 0}
							</Text>
						</div>
						<ThemeIcon color="blue" variant="light" size={38} radius="md">
							<IconUserStar size={24} />
						</ThemeIcon>
					</Group>
					<Text color="green" size="sm" mt="md">
						24%
					</Text>
				</Paper>

				<Paper withBorder p="md" radius="md">
					<Group ps="apart">
						<div>
							<Text color="dimmed" size="xs" tt="uppercase" fw={700}>
								Bookings
							</Text>
							<Text fw={700} size="xl">
								{bookingData?.length || 0}
							</Text>
						</div>
						<ThemeIcon color="violet" variant="light" size={38} radius="md">
							<IconCalendar size={24} />
						</ThemeIcon>
					</Group>
					<Text color="green" size="sm" mt="md">
						10%
					</Text>
				</Paper>
			</SimpleGrid>
			<SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mt={"lg"}>
				<Card withBorder radius="md" p="md">
					<Card.Section withBorder inheritPadding py="xs">
						<Group ps="apart">
							<Text fw={500}>Recent Therapists</Text>
							<Badge>5 members</Badge>
						</Group>
					</Card.Section>

					<Stack gap="sm" mt="md">
						{therapistData?.slice(0, 10).map((therapist) => (
							<Group key={therapist.id} ps="apart">
								<Group>
									<Avatar
										src={therapist?.avatar_url}
										radius="xl"
										name={therapist?.name}
										color="initials"
									/>
									<div>
										<Text size="sm" fw={500}>
											{therapist?.name}
										</Text>
										<Text size="xs" color="dimmed">
											{therapist?.email}
										</Text>
									</div>
								</Group>
								<Badge
									color={
										therapist?.status === "accepted"
											? "green"
											: therapist?.status === "pending"
											? "gray"
											: "red"
									}
									variant="light"
								>
									{therapist?.status ? "Active" : "Inactive"}
								</Badge>
							</Group>
						))}
					</Stack>
				</Card>
				<Card withBorder radius="md" p="md">
					<Card.Section withBorder inheritPadding py="xs">
						<Group ps="apart">
							<Text fw={500}>Recent Customers</Text>
							<Badge>5 members</Badge>
						</Group>
					</Card.Section>

					<Stack gap="sm" mt="md">
						{customerData?.slice(0, 10).map((customer) => (
							<Group key={customer.id} ps="apart">
								<Group>
									<Avatar
										src={customer.avatar_url}
										radius="xl"
										name={customer.name}
										color="initials"
									/>
									<div>
										<Text size="sm" fw={500}>
											{customer.name}
										</Text>
										{/* <Text size="xs" color="dimmed">
											Last visit: {customer.lastVisit}
										</Text> */}
									</div>
								</Group>
								<Badge
									color={
										customer?.status === "accepted"
											? "green"
											: customer?.status === "pending"
											? "gray"
											: "red"
									}
									variant="light"
								>
									{customer?.status === "accepted"
										? "Active"
										: customer?.status === "pending"
										? "Pending"
										: "Blocked"}
								</Badge>
							</Group>
						))}
					</Stack>
				</Card>
			</SimpleGrid>
		</div>
	);
}
