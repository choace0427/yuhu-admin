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
	Pagination,
} from "@mantine/core";
import {
	IconSearch,
	IconFilter,
	IconDownload,
	IconPrinter,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { getSelectedConversation, useRoomList } from "@/services/chat_history";
import dayjs from "dayjs";

export default function AdminChatManagement() {
	const { data } = useRoomList();

	const [selectedConversation, setSelectedConversation] = useState<
		string | null
	>(null);
	const [selectedMessages, setSelectedMessages] = useState<any[]>([]);
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState<string | null>(null);

	const [opened, { open, close }] = useDisclosure(false);

	const filteredConversations: any = data
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
			<Grid>
				<Grid.Col span={4}>
					<Paper shadow="xs" p="md" style={{ height: "calc(100vh - 160px)" }}>
						<Group mb="md">
							<TextInput
								placeholder="Search conversations"
								leftSection={<IconSearch size="0.9rem" />}
								value={search}
								onChange={(event) => setSearch(event.currentTarget.value)}
								style={{ flex: 1 }}
							/>
							<Tooltip label="Advanced Filters">
								<ActionIcon onClick={open}>
									<IconFilter size="1.25rem" />
								</ActionIcon>
							</Tooltip>
						</Group>
						<ScrollArea>
							{filteredConversations &&
								filteredConversations.map((conv: any) => (
									<Card
										key={conv.id}
										mb="sm"
										padding="sm"
										onClick={() => {
											handleSelectChat(conv?.rooms_id);
											setSelectedConversation(conv?.customer_id);
										}}
										style={{
											cursor: "pointer",
											backgroundColor:
												selectedConversation === conv?.rooms_id
													? "#f1f3f5"
													: "white",
										}}
									>
										<Group>
											<Group>
												<Avatar
													src={conv?.customers_list.avatar_url}
													name={conv?.customers_list.name}
													color="initials"
													radius="xl"
												/>
												<div>
													<Text fw={500}>{conv?.customers_list.name}</Text>
													<Text size="sm" color="dimmed">
														Customer
													</Text>
												</div>
											</Group>
											{/* <Badge color={getStatusColor(conv?.status)}>
												{conv?.status}
											</Badge> */}
										</Group>
										<Text size="sm" mt="xs" lineClamp={1}>
											{conv?.lastChat?.messages}
										</Text>
										<Group mt="xs">
											<Text size="xs" color="dimmed">
												{dayjs(conv?.lastChat?.created_at).format(
													"YYYY-MM-DD, HH:MM"
												)}
											</Text>
										</Group>
									</Card>
								))}
						</ScrollArea>
					</Paper>
				</Grid.Col>
				<Grid.Col span={8}>
					<Paper shadow="xs" p="md" style={{ height: "calc(100vh - 160px)" }}>
						{selectedConversation ? (
							<>
								<Group mb="md">
									<Group>
										<Title order={4}>Conversation Details</Title>
										{/* <Badge
											color={getStatusColor(
												conversations.find((c) => c.id === selectedConversation)
													?.status || ""
											)}
										>
											{
												conversations.find((c) => c.id === selectedConversation)
													?.status
											}
										</Badge> */}
									</Group>
									<Group>
										<Tooltip label="Download Conversation">
											<ActionIcon>
												<IconDownload size="1.25rem" />
											</ActionIcon>
										</Tooltip>
										<Tooltip label="Print Conversation">
											<ActionIcon>
												<IconPrinter size="1.25rem" />
											</ActionIcon>
										</Tooltip>
									</Group>
								</Group>
								<ScrollArea
									style={{ height: "calc(100% - 180px)" }}
									mb="md"
									p={"md"}
								>
									{selectedMessages.map((message) => (
										<Paper
											key={message.conversation_id}
											p="xs"
											mb="xs"
											w={"fit-content"}
											style={{
												backgroundColor:
													message.sender_id === selectedConversation
														? "#000000"
														: "#E6E6E6",
												marginLeft:
													message.sender_id === selectedConversation
														? 0
														: "auto",
												marginRight:
													message.sender_id === selectedConversation
														? "auto"
														: 0,
												maxWidth: "80%",
											}}
										>
											<Text
												size="xs"
												fw={500}
												color={
													message.sender_id === selectedConversation
														? "white"
														: "black"
												}
											>
												{message.sender_id === selectedConversation
													? "Customer"
													: "Therapist"}
											</Text>
											<Text
												mt={4}
												color={
													message.sender_id === selectedConversation
														? "white"
														: "black"
												}
											>
												{message.messages}
											</Text>
											<Text
												size="xs"
												ta="right"
												color={
													message.sender_id === selectedConversation
														? "white"
														: "black"
												}
											>
												{dayjs(message.created_at).format("YYYY-MM-DD")}
											</Text>
										</Paper>
									))}
								</ScrollArea>
							</>
						) : (
							<Text ta="center" color="dimmed">
								Select a conversation to view details
							</Text>
						)}
					</Paper>
				</Grid.Col>
			</Grid>
		</PageContainer>
	);
}
