"use client";

import { useState } from "react";
import {
	Paper,
	Title,
	Text,
	Group,
	ScrollArea,
	ActionIcon,
	Tooltip,
	TextInput,
	Grid,
	Card,
	Avatar,
	Stack,
	Box,
	Container,
	useMantineTheme,
	Badge,
	rem,
} from "@mantine/core";
import {
	IconSearch,
	IconFilter,
	IconDownload,
	IconPrinter,
	IconMessage,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { getSelectedConversation, useRoomList } from "@/services/chat_history";
import dayjs from "dayjs";

export default function AdminChatManagement() {
	const theme = useMantineTheme();
	const { data } = useRoomList();
	const [selectedConversation, setSelectedConversation] = useState<
		string | null
	>(null);
	const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
	const [selectedMessages, setSelectedMessages] = useState<any[]>([]);
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState<string | null>(null);
	const [opened, { open, close }] = useDisclosure(false);

	const filteredConversations = data
		?.filter(
			(conv) =>
				conv.customers_list?.name
					?.toLowerCase()
					.includes(search.toLowerCase()) ||
				conv.lastChat?.messages?.toLowerCase().includes(search.toLowerCase())
		)
		?.map((conv) => ({
			...conv,
		}));

	const getStatusColor = (status: string) => {
		switch (status) {
			case "New":
				return "blue";
			case "Active":
				return "green";
			case "Completed":
				return "gray";
			default:
				return "gray";
		}
	};

	const handleSelectChat = async (rooms_id: string) => {
		const res = await getSelectedConversation(rooms_id);
		setSelectedMessages(res);
	};

	return (
		<PageContainer title="Chat Management Dashboard">
			<Container fluid p={0}>
				<Grid gutter="md">
					<Grid.Col span={{ base: 12, md: 4 }}>
						<Paper
							shadow="md"
							withBorder
							style={{
								overflow: "hidden",
							}}
							h={{ base: "calc(50vh - 80px)", md: "calc(100vh - 160px)" }}
						>
							<Box
								p="md"
								style={{
									background: theme.colors[theme.primaryColor][4],
								}}
							>
								<Group align="center">
									<TextInput
										placeholder="Search conversations..."
										leftSection={
											<IconSearch
												size="1rem"
												stroke={1.5}
												color={theme.colors[theme.primaryColor][3]}
											/>
										}
										value={search}
										onChange={(event) => setSearch(event.currentTarget.value)}
										style={{ flex: 1 }}
										radius="xl"
										styles={{
											input: {
												backgroundColor: theme.white,
												height: rem(42),
												"&:focus": {
													borderColor: theme.colors[theme.primaryColor][4],
													boxShadow: `0 0 0 2px ${
														theme.colors[theme.primaryColor][4]
													}`,
												},
											},
										}}
									/>
									<Tooltip label="Advanced Filters">
										<ActionIcon
											variant="filled"
											size={42}
											radius="xl"
											onClick={open}
											style={{
												backgroundColor: theme.white,
												color: theme.colors[theme.primaryColor][6],
											}}
										>
											<IconFilter size="1.2rem" stroke={1.5} />
										</ActionIcon>
									</Tooltip>
								</Group>
							</Box>
							<ScrollArea h="calc(100% - 90px)" p="md">
								<Stack gap="xs">
									{filteredConversations?.map((conv: any) => {
										return (
											<Card
												key={conv.id}
												padding="md"
												radius="md"
												onClick={() => {
													handleSelectChat(conv?.rooms_id);
													setSelectedConversation(conv?.customer_id);
													setSelectedRoom(conv?.rooms_id);
												}}
												style={{
													cursor: "pointer",
													transition: "all 0.2s ease",
												}}
												bg={
													selectedConversation === conv?.customer_id &&
													selectedRoom === conv?.rooms_id
														? theme.colors[theme.primaryColor][0]
														: theme.white
												}
												withBorder
												styles={{
													root: {
														"&:hover": {
															backgroundColor:
																theme.colors[theme.primaryColor][0],
															transform: "translateY(-2px)",
															boxShadow: theme.shadows.sm,
														},
													},
												}}
											>
												<Group justify="space-between" wrap="nowrap">
													<Group gap="sm" wrap="nowrap">
														<Avatar
															src={conv?.customers_list.avatar_url}
															radius="xl"
															size={46}
															color={theme.primaryColor}
															styles={{
																root: {
																	border: `2px solid ${
																		theme.colors[theme.primaryColor][3]
																	}`,
																},
															}}
														>
															{conv?.customers_list.name?.charAt(0)}
														</Avatar>
														<div style={{ flex: 1, minWidth: 0 }}>
															<Group ps="apart" mb={4}>
																<Text fw={600} size="sm" truncate>
																	{conv?.customers_list.name}
																</Text>
																<Badge
																	variant="dot"
																	size="sm"
																	color={theme.primaryColor}
																>
																	Active
																</Badge>
															</Group>
															<Group gap={6} align="center">
																<IconMessage
																	size="0.8rem"
																	stroke={1.5}
																	color={theme.colors.gray[6]}
																/>
																<Text size="xs" c="dimmed" truncate>
																	{conv?.lastChat?.messages}
																</Text>
															</Group>
														</div>
													</Group>
												</Group>
											</Card>
										);
									})}
								</Stack>
							</ScrollArea>
						</Paper>
					</Grid.Col>

					<Grid.Col span={{ base: 12, md: 8 }}>
						<Paper
							shadow="md"
							withBorder
							style={{
								backgroundColor: theme.white,
								overflow: "hidden",
							}}
							h={{ base: "calc(50vh - 80px)", md: "calc(100vh - 160px)" }}
						>
							{selectedConversation ? (
								<Stack h="100%" gap={0}>
									<Box
										p="md"
										style={{
											background: theme.colors[theme.primaryColor][4],
										}}
									>
										<Group ps="apart" mb="xs">
											<Title order={4} c="white">
												Conversation Details
											</Title>
											<Group gap="xs">
												<Tooltip label="Download Conversation">
													<ActionIcon
														variant="filled"
														size="lg"
														radius="xl"
														style={{
															backgroundColor: theme.white,
															color: theme.colors[theme.primaryColor][6],
														}}
													>
														<IconDownload size="1.2rem" stroke={1.5} />
													</ActionIcon>
												</Tooltip>
												<Tooltip label="Print Conversation">
													<ActionIcon
														variant="filled"
														size="lg"
														radius="xl"
														style={{
															backgroundColor: theme.white,
															color: theme.colors[theme.primaryColor][6],
														}}
													>
														<IconPrinter size="1.2rem" stroke={1.5} />
													</ActionIcon>
												</Tooltip>
											</Group>
										</Group>
									</Box>
									<ScrollArea
										h="calc(100% - 70px)"
										p="md"
										styles={{
											viewport: {
												backgroundImage: `radial-gradient(${
													theme.colors[theme.primaryColor][0]
												} 1px, transparent 1px)`,
												backgroundSize: "24px 24px",
											},
										}}
									>
										<Stack gap="lg">
											{selectedMessages.map((message) => (
												<Box
													key={message.conversation_id}
													style={{
														maxWidth: "70%",
														alignSelf:
															message.sender_id === selectedConversation
																? "flex-start"
																: "flex-end",
													}}
												>
													<Paper
														p="md"
														radius="md"
														style={{
															backgroundColor:
																message.sender_id === selectedConversation
																	? theme.colors[theme.primaryColor][4]
																	: theme.white,
															boxShadow: theme.shadows.sm,
															border:
																message.sender_id === selectedConversation
																	? "none"
																	: `1px solid ${theme.colors.gray[2]}`,
														}}
													>
														<Text
															size="sm"
															fw={600}
															c={
																message.sender_id === selectedConversation
																	? "white"
																	: theme.colors[theme.primaryColor][6]
															}
															mb={4}
														>
															{message.sender_id === selectedConversation
																? "Customer"
																: "Therapist"}
														</Text>
														<Text
															c={
																message.sender_id === selectedConversation
																	? "white"
																	: "dark"
															}
															style={{ lineHeight: 1.6 }}
														>
															{message.messages}
														</Text>
														<Text
															size="xs"
															ta="right"
															c={
																message.sender_id === selectedConversation
																	? "white"
																	: "dimmed"
															}
															mt={8}
															opacity={0.8}
															fw={500}
														>
															{dayjs(message.created_at).format("HH:mm")}
														</Text>
													</Paper>
												</Box>
											))}
										</Stack>
									</ScrollArea>
								</Stack>
							) : (
								<Group
									ps="center"
									h="100%"
									style={{
										background: "white",
									}}
								>
									<Stack align="center" gap="xs" w={"100%"}>
										<IconMessage
											size="3rem"
											stroke={1.5}
											color={theme.colors.gray[5]}
										/>
										<Text c="dimmed" size="lg" fw={500}>
											Select a conversation to view details
										</Text>
									</Stack>
								</Group>
							)}
						</Paper>
					</Grid.Col>
				</Grid>
			</Container>
		</PageContainer>
	);
}
