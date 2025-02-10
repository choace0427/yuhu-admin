// "use client";
// import { PageContainer } from "@/components/PageContainer/PageContainer";

// import {
// 	ActionIcon,
// 	Avatar,
// 	Badge,
// 	Flex,
// 	Menu,
// 	Paper,
// 	Text,
// } from "@mantine/core";
// import { MantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
// import { useEffect, useMemo } from "react";
// import { useCustomTable } from "@/hooks/use-custom-table";
// import {
// 	IconBlockquote,
// 	IconCheck,
// 	IconDotsVertical,
// 	IconEye,
// } from "@tabler/icons-react";
// import { createClient } from "@/utils/supabase/client";
// import { useQueryClient } from "@tanstack/react-query";
// import { updateTherapist, useTherapists } from "@/services/therapist";
// import { TherapistList } from "@/services/therapist/types";

// export default function TherapistPage() {
// 	const { data, isError, isFetching, isLoading } = useTherapists();
// 	const queryTherapist = useQueryClient();

// 	const columns = useMemo<MRT_ColumnDef<TherapistList>[]>(
// 		() => [
// 			{
// 				accessorKey: "no",
// 				header: "No",
// 				size: 10,
// 				Cell: ({ cell }) => {
// 					return <Text>{cell.row.index + 1}</Text>;
// 				},
// 			},
// 			{
// 				accessorKey: "user",
// 				header: "User",
// 				size: 240,
// 				Cell: ({ cell }) => {
// 					return (
// 						<Flex align={"center"} gap={"sm"}>
// 							<Avatar
// 								color="initials"
// 								name={cell.row.original.name}
// 								src={cell.row.original.avatar_url}
// 							/>
// 							<Text>{cell.row.original.name}</Text>
// 						</Flex>
// 					);
// 				},
// 			},
// 			{
// 				accessorKey: "email",
// 				header: "Email",
// 			},
// 			{
// 				accessorKey: "hourly_rate",
// 				header: "Hourly Rate",
// 				size: 100,
// 				Cell: ({ cell }) => {
// 					return <Text>${cell.row.original.hourly_rate}/hr</Text>;
// 				},
// 			},
// 			{
// 				accessorKey: "services",
// 				header: "Services",
// 				maxSize: 500,
// 				minSize: 300,
// 				Cell: ({ cell }) => {
// 					const services = cell.row.original.services;
// 					return (
// 						<Flex gap={4}>
// 							{services && services.length > 0 ? (
// 								services.map((category: any, index: number) => (
// 									<div key={index} className="space-y-1">
// 										<Badge
// 											className="bg-primary text-primary-foreground hover:bg-primary/90"
// 											variant="outline"
// 										>
// 											{category.service_type?.subcategory}
// 										</Badge>
// 									</div>
// 								))
// 							) : (
// 								<Text fs="italic" size="sm" color="gray">
// 									No services
// 								</Text>
// 							)}
// 						</Flex>
// 					);
// 				},
// 			},
// 			{
// 				accessorKey: "summary",
// 				header: "Summary",
// 				size: 500,
// 				Cell: ({ cell }) => {
// 					return (
// 						<Text lineClamp={2} size="xs" fw={500}>
// 							{cell.row.original.summary}
// 						</Text>
// 					);
// 				},
// 			},
// 			{
// 				accessorKey: "phone",
// 				header: "Phone",
// 			},
// 			{
// 				accessorKey: "location",
// 				header: "Location",
// 			},
// 			{
// 				accessorKey: "resume",
// 				header: "Resume",
// 				Cell: ({ cell }) => {
// 					return (
// 						<>
// 							{cell.row.original.resume_url ? (
// 								<ActionIcon
// 									component="a"
// 									target="_blank"
// 									variant="transparent"
// 									mx={"auto"}
// 									href={cell.row.original.resume_url}
// 								>
// 									<IconEye size={"1rem"} />
// 								</ActionIcon>
// 							) : (
// 								<Text size="sm" fs="italic" color="gray">
// 									No Resume
// 								</Text>
// 							)}
// 						</>
// 					);
// 				},
// 			},
// 			{
// 				accessorKey: "iban_number",
// 				header: "IBAN Number",
// 				Cell: ({ cell }) => {
// 					return (
// 						<>
// 							{cell.row.original.bank_list[0]?.iban_number ? (
// 								cell.row.original.bank_list[0]?.iban_number
// 							) : (
// 								<Text size="xs" fs="italic" color="gray">
// 									{" "}
// 									"No IBAN Number"
// 								</Text>
// 							)}
// 						</>
// 					);
// 				},
// 			},
// 			{
// 				accessorKey: "swift_number",
// 				header: "SWIFT/BIC Number",
// 				Cell: ({ cell }) => {
// 					return (
// 						<>
// 							{cell.row.original.bank_list[0]?.swift_number ? (
// 								cell.row.original.bank_list[0]?.swift_number
// 							) : (
// 								<Text size="xs" fs="italic" color="gray">
// 									{" "}
// 									"No SWIFT/BIC Number"
// 								</Text>
// 							)}
// 						</>
// 					);
// 				},
// 			},
// 			{
// 				accessorKey: "status",
// 				header: "Status",
// 				Cell: ({ cell }) => {
// 					const status = cell.getValue<"pending" | "accepted" | "blocked">();
// 					let color: "red" | "yellow" | "green" = "red";
// 					if (status === "accepted") color = "green";
// 					else if (status === "pending") color = "yellow";
// 					return <Badge color={color}>{status}</Badge>;
// 				},
// 				filterVariant: "select",
// 				mantineFilterSelectProps: {
// 					data: [
// 						{ label: "Accepted", value: "accepted" },
// 						{ label: "Pending", value: "pending" },
// 						{ label: "Blocked", value: "blocked" },
// 					] as any,
// 				},
// 			},
// 			{
// 				accessorKey: "action",
// 				header: "Actions",
// 				size: 50,
// 				Cell: ({ cell }) => {
// 					return (
// 						<Menu withinPortal position="bottom-end" shadow="sm">
// 							<Menu.Target>
// 								<ActionIcon variant="subtle">
// 									<IconDotsVertical size="1rem" />
// 								</ActionIcon>
// 							</Menu.Target>

// 							<Menu.Dropdown>
// 								<Menu.Item
// 									leftSection={<IconCheck size={14} />}
// 									onClick={() =>
// 										updateTherapist("accepted", cell.row.original.id)
// 									}
// 								>
// 									Accept User
// 								</Menu.Item>
// 								<Menu.Item
// 									leftSection={<IconBlockquote size={14} />}
// 									onClick={() =>
// 										updateTherapist("blocked", cell.row.original.id)
// 									}
// 								>
// 									Block User
// 								</Menu.Item>
// 							</Menu.Dropdown>
// 						</Menu>
// 					);
// 				},
// 			},
// 		],
// 		[]
// 	);

// 	const table = useCustomTable<TherapistList>({
// 		columns,
// 		data: data ?? [],
// 		rowCount: data?.length ?? 0,
// 		state: {
// 			isLoading,
// 			showAlertBanner: isError,
// 			showProgressBars: isFetching,
// 		},
// 	});

// 	useEffect(() => {
// 		const supabase = createClient();
// 		const therapistListRealtime = supabase
// 			.channel("therapist_list-db-changes")
// 			.on(
// 				"postgres_changes",
// 				{
// 					event: "*",
// 					schema: "public",
// 					table: "therapist_list",
// 				},
// 				(payload) => {
// 					queryTherapist.invalidateQueries({ queryKey: ["therapist_list"] });
// 				}
// 			)
// 			.subscribe();

// 		return () => {
// 			therapistListRealtime.unsubscribe();
// 		};
// 	}, [queryTherapist]);

// 	return (
// 		<PageContainer title="Therapist List">
// 			<Paper withBorder radius="md" p="md" mt="lg">
// 				<MantineReactTable table={table} />
// 			</Paper>
// 		</PageContainer>
// 	);
// }

"use client";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import {
	ActionIcon,
	Avatar,
	Badge,
	Button,
	Drawer,
	Flex,
	Grid,
	Group,
	Image,
	Stack,
	Text,
	Title,
	Divider,
	Paper,
	ScrollArea,
	SimpleGrid,
	Menu,
	Modal,
	Center,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { MantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { useState, useEffect, useMemo } from "react";
import { useCustomTable } from "@/hooks/use-custom-table";
import {
	IconBlockquote,
	IconCheck,
	IconDotsVertical,
	IconEye,
} from "@tabler/icons-react";
import { createClient } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { updateTherapist, useTherapists } from "@/services/therapist";
import { TherapistList } from "@/services/therapist/types";

export default function TherapistPage() {
	const { data, isError, isFetching, isLoading } = useTherapists();
	const queryTherapist = useQueryClient();

	// State to handle drawer
	const [drawerOpened, setDrawerOpened] = useState(false);
	const [selectedTherapist, setSelectedTherapist] =
		useState<TherapistList | null>(null);

	const openDrawer = (therapist: TherapistList) => {
		setSelectedTherapist(therapist);
		setDrawerOpened(true);
	};

	const closeDrawer = () => {
		setSelectedTherapist(null);
		setDrawerOpened(false);
	};

	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [opened, setOpened] = useState(false);
	const openImagePreview = (index: number) => {
		setCurrentIndex(index); // Set the clicked image index
		setOpened(true); // Open the modal
	};

	const columns = useMemo<MRT_ColumnDef<TherapistList>[]>(
		() => [
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
									leftSection={<IconEye size={14} />}
									onClick={() => openDrawer(cell.row.original)}
								>
									View Details
								</Menu.Item>
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

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				title="Therapist Details"
				padding="xl"
				size="lg"
				position="right"
				styles={{
					header: { display: "flex", justifyContent: "space-between" },
				}}
			>
				{selectedTherapist && (
					<Stack gap="lg">
						<Group ps="apart" mb="md">
							<Group>
								<Avatar
									src={selectedTherapist.avatar_url}
									size="xl"
									radius="sm"
									name={selectedTherapist?.name}
									color="initials"
								/>
								<div>
									<Title order={4}>{selectedTherapist.name}</Title>
									<Text size="sm" color="dimmed">
										{selectedTherapist.email}
									</Text>
								</div>
							</Group>
							<Badge
								color={
									selectedTherapist.status === "accepted"
										? "green"
										: selectedTherapist.status === "pending"
										? "yellow"
										: "red"
								}
							>
								{selectedTherapist.status}
							</Badge>
						</Group>

						<Divider />

						<Grid>
							<Grid.Col span={6}>
								<Text>
									<strong>Hourly Rate:</strong> ${selectedTherapist.hourly_rate}
									/hr
								</Text>
							</Grid.Col>
							<Grid.Col span={6}>
								<Text>
									<strong>Phone:</strong> {selectedTherapist.phone || "N/A"}
								</Text>
							</Grid.Col>
							<Grid.Col span={6}>
								<Text>
									<strong>Location:</strong>{" "}
									{selectedTherapist.location || "N/A"}
								</Text>
							</Grid.Col>
						</Grid>

						<Divider />
						<Grid>
							<Grid.Col span={12}>
								<Text>
									<strong>IBAN:</strong>{" "}
									{selectedTherapist.bank_list[0]?.iban_number || "N/A"}
								</Text>
							</Grid.Col>
							<Grid.Col span={12}>
								<Text>
									<strong>SWIFT/BIC:</strong>{" "}
									{selectedTherapist.bank_list[0]?.swift_number || "N/A"}
								</Text>
							</Grid.Col>
						</Grid>
						<Divider />
						<Title order={5}>Summary</Title>
						<Text color="dimmed">
							{selectedTherapist.summary || "No summary available"}
						</Text>

						<Divider />
						<Title order={5}>Services</Title>
						<Flex gap={8} wrap="wrap">
							{selectedTherapist.services?.length ? (
								selectedTherapist.services.map((service, index) => (
									<Badge key={index} variant="outline" color="blue">
										{service.service_type?.subcategory}
									</Badge>
								))
							) : (
								<Text color="dimmed">No services available</Text>
							)}
						</Flex>

						<Divider />
						<Title order={5}>Uploaded Images</Title>
						<TherapistImagePreview
							documents={JSON.parse(selectedTherapist.documents)}
						/>

						<Divider />
						<Title order={5}>Resume</Title>
						{selectedTherapist.resume_url ? (
							<Button
								component="a"
								href={selectedTherapist.resume_url}
								target="_blank"
								variant="outline"
							>
								View Resume
							</Button>
						) : (
							<Text color="dimmed">No resume uploaded</Text>
						)}
					</Stack>
				)}
			</Drawer>
		</PageContainer>
	);
}

const TherapistImagePreview = ({ documents }: { documents: any }) => {
	const [opened, setOpened] = useState(false);
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const openImagePreview = (index: number) => {
		setCurrentIndex(index);
		setOpened(true);
	};

	return (
		<>
			{/* Image Grid */}
			<SimpleGrid cols={3} spacing="sm">
				{documents?.length > 0 ? (
					documents?.map((image: string, index: number) => (
						<Image
							key={index}
							src={image}
							alt={`Uploaded image ${index + 1}`}
							height={100}
							radius="md"
							onClick={() => openImagePreview(index)} // Open preview on click
							style={{ cursor: "pointer" }} // Pointer cursor for better UX
						/>
					))
				) : (
					<Text color="dimmed">No images uploaded</Text>
				)}
			</SimpleGrid>

			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				size="xl"
				centered
				withCloseButton={false}
				padding={0}
			>
				<Carousel initialSlide={currentIndex} withIndicators loop>
					{documents?.map((image: string, index: number) => (
						<Carousel.Slide key={index}>
							<Image
								src={image}
								alt={`Image ${index + 1}`}
								fit="contain"
								radius="md"
								// style={{ maxHeight: "80vh", maxWidth: "100%" }}
							/>
						</Carousel.Slide>
					))}
				</Carousel>
				<Text ta="center" mt="sm">
					{currentIndex + 1} / {documents.length}
				</Text>
			</Modal>
		</>
	);
};
