"use client";

import {
	Card,
	Flex,
	Grid,
	GridCol,
	Group,
	SimpleGrid,
	Text,
} from "@mantine/core";
import { TransactionCard } from "./TransactionCard";
import { useCustomers } from "@/services/customers";
import { useTherapists } from "@/services/therapist";
import { useBooking } from "@/services/booking";

export function DashboardContent() {
	const { data: customerData } = useCustomers();
	const { data: therapistData } = useTherapists();
	const { data: bookingData } = useBooking();

	return (
		<Grid>
			<GridCol span={{ sm: 12, md: 12, lg: 12 }}>
				<SimpleGrid cols={3}>
					<Card p="md" radius="md">
						<Group>
							<div>
								<Text c="dimmed" tt="uppercase" fw={700} fz="xs">
									Customers
								</Text>
								<Text fw={700} fz="xl">
									{customerData?.length || 0}
								</Text>
							</div>
						</Group>
						<Text c="dimmed" fz="sm" mt="sm">
							<Text component="span" c={"green.4"} fw={700}>
								{12}%
							</Text>
						</Text>
					</Card>
					<Card p="md" radius="md">
						<Group>
							<div>
								<Text c="dimmed" tt="uppercase" fw={700} fz="xs">
									Therapists
								</Text>
								<Text fw={700} fz="xl">
									{therapistData?.length || 0}
								</Text>
							</div>
						</Group>
						<Text c="dimmed" fz="sm" mt="sm">
							<Text component="span" c={"green.4"} fw={700}>
								{24}%
							</Text>
						</Text>
					</Card>
					<Card p="md" radius="md">
						<Group>
							<div>
								<Text c="dimmed" tt="uppercase" fw={700} fz="xs">
									Bookings
								</Text>
								<Text fw={700} fz="xl">
									{bookingData?.length || 0}
								</Text>
							</div>
						</Group>
						<Text c="dimmed" fz="sm" mt="sm">
							<Text component="span" c={"green.4"} fw={700}>
								{10}%
							</Text>
						</Text>
					</Card>
				</SimpleGrid>
			</GridCol>
			<GridCol span={12}>
				<TransactionCard />
			</GridCol>
		</Grid>
	);
}
