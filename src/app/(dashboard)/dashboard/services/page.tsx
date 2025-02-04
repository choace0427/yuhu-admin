// "use client";

// import { useState, type React } from "react";
// import {
// 	ActionIcon,
// 	Button,
// 	Card,
// 	Grid,
// 	Group,
// 	Modal,
// 	Paper,
// 	Text,
// 	TextInput,
// 	Title,
// 	Collapse,
// 	Stack,
// 	useMantineTheme,
// 	Box,
// } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
// import {
// 	IconEdit,
// 	IconPlus,
// 	IconTrash,
// 	IconChevronDown,
// 	IconChevronUp,
// } from "@tabler/icons-react";

// interface Category {
// 	id: string;
// 	name: string;
// 	subcategories: Subcategory[];
// }

// interface Subcategory {
// 	id: string;
// 	name: string;
// }

// export default function CategoryManagement() {
// 	const [categories, setCategories] = useState<Category[]>([
// 		{
// 			id: "1",
// 			name: "Electronics",
// 			subcategories: [
// 				{ id: "1", name: "Laptops" },
// 				{ id: "2", name: "Smartphones" },
// 			],
// 		},
// 		{
// 			id: "2",
// 			name: "Books",
// 			subcategories: [
// 				{ id: "3", name: "Fiction" },
// 				{ id: "4", name: "Non-fiction" },
// 			],
// 		},
// 	]);

// 	const [opened, { open, close }] = useDisclosure(false);
// 	const [editMode, setEditMode] = useState(false);
// 	const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
// 	const [currentSubcategory, setCurrentSubcategory] =
// 		useState<Subcategory | null>(null);
// 	const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

// 	const theme = useMantineTheme();

// 	const handleAddCategory = () => {
// 		setEditMode(false);
// 		setCurrentCategory(null);
// 		setCurrentSubcategory(null);
// 		open();
// 	};

// 	const handleEditCategory = (category: Category) => {
// 		setEditMode(true);
// 		setCurrentCategory(category);
// 		setCurrentSubcategory(null);
// 		open();
// 	};

// 	const handleDeleteCategory = (categoryId: string) => {
// 		setCategories(categories.filter((cat) => cat.id !== categoryId));
// 	};

// 	const handleAddSubcategory = (categoryId: string) => {
// 		setEditMode(false);
// 		setCurrentCategory(categories.find((cat) => cat.id === categoryId) || null);
// 		setCurrentSubcategory(null);
// 		open();
// 	};

// 	const handleEditSubcategory = (
// 		categoryId: string,
// 		subcategory: Subcategory
// 	) => {
// 		setEditMode(true);
// 		setCurrentCategory(categories.find((cat) => cat.id === categoryId) || null);
// 		setCurrentSubcategory(subcategory);
// 		open();
// 	};

// 	const handleDeleteSubcategory = (
// 		categoryId: string,
// 		subcategoryId: string
// 	) => {
// 		setCategories(
// 			categories.map((cat) =>
// 				cat.id === categoryId
// 					? {
// 							...cat,
// 							subcategories: cat.subcategories.filter(
// 								(sub) => sub.id !== subcategoryId
// 							),
// 					  }
// 					: cat
// 			)
// 		);
// 	};

// 	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
// 		event.preventDefault();
// 		const formData = new FormData(event.currentTarget);
// 		const name = formData.get("name") as string;

// 		if (currentSubcategory) {
// 			// Edit subcategory
// 			setCategories(
// 				categories.map((cat) =>
// 					cat.id === currentCategory?.id
// 						? {
// 								...cat,
// 								subcategories: cat.subcategories.map((sub) =>
// 									sub.id === currentSubcategory.id ? { ...sub, name } : sub
// 								),
// 						  }
// 						: cat
// 				)
// 			);
// 		} else if (currentCategory && editMode) {
// 			// Edit category
// 			setCategories(
// 				categories.map((cat) =>
// 					cat.id === currentCategory.id ? { ...cat, name } : cat
// 				)
// 			);
// 		} else if (currentCategory) {
// 			// Add subcategory
// 			setCategories(
// 				categories.map((cat) =>
// 					cat.id === currentCategory.id
// 						? {
// 								...cat,
// 								subcategories: [
// 									...cat.subcategories,
// 									{ id: Date.now().toString(), name },
// 								],
// 						  }
// 						: cat
// 				)
// 			);
// 		} else {
// 			// Add category
// 			setCategories([
// 				...categories,
// 				{ id: Date.now().toString(), name, subcategories: [] },
// 			]);
// 		}

// 		close();
// 	};

// 	const toggleCategory = (categoryId: string) => {
// 		setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
// 	};

// 	return (
// 		<Paper p="xl" radius="md" withBorder>
// 			<Group position="apart" mb="xl">
// 				<Title order={2}>Category Management</Title>
// 				<Button
// 					leftIcon={<IconPlus size="1rem" />}
// 					onClick={handleAddCategory}
// 					variant="gradient"
// 					gradient={{ from: "indigo", to: "cyan" }}
// 				>
// 					Add Category
// 				</Button>
// 			</Group>

// 			<Stack spacing="md">
// 				{categories.map((category) => (
// 					<Card key={category.id} shadow="sm" p="lg" radius="md" withBorder>
// 						<Group position="apart">
// 							<Text weight={500} size="lg">
// 								{category.name}
// 							</Text>
// 							<Group spacing="xs">
// 								<ActionIcon
// 									size="md"
// 									color="blue"
// 									variant="light"
// 									onClick={() => handleEditCategory(category)}
// 								>
// 									<IconEdit size="1rem" />
// 								</ActionIcon>
// 								<ActionIcon
// 									size="md"
// 									color="red"
// 									variant="light"
// 									onClick={() => handleDeleteCategory(category.id)}
// 								>
// 									<IconTrash size="1rem" />
// 								</ActionIcon>
// 								<ActionIcon
// 									size="md"
// 									variant="light"
// 									onClick={() => toggleCategory(category.id)}
// 								>
// 									{expandedCategory === category.id ? (
// 										<IconChevronUp size="1rem" />
// 									) : (
// 										<IconChevronDown size="1rem" />
// 									)}
// 								</ActionIcon>
// 							</Group>
// 						</Group>

// 						<Collapse in={expandedCategory === category.id}>
// 							<Box mt="md">
// 								<Grid gutter="md">
// 									{category.subcategories.map((subcategory) => (
// 										<Grid.Col key={subcategory.id} span={12} sm={6} md={4}>
// 											<Card shadow="sm" p="sm" radius="md" withBorder>
// 												<Group position="apart">
// 													<Text size="sm">{subcategory.name}</Text>
// 													<Group spacing="xs">
// 														<ActionIcon
// 															size="sm"
// 															color="blue"
// 															variant="subtle"
// 															onClick={() =>
// 																handleEditSubcategory(category.id, subcategory)
// 															}
// 														>
// 															<IconEdit size="0.8rem" />
// 														</ActionIcon>
// 														<ActionIcon
// 															size="sm"
// 															color="red"
// 															variant="subtle"
// 															onClick={() =>
// 																handleDeleteSubcategory(
// 																	category.id,
// 																	subcategory.id
// 																)
// 															}
// 														>
// 															<IconTrash size="0.8rem" />
// 														</ActionIcon>
// 													</Group>
// 												</Group>
// 											</Card>
// 										</Grid.Col>
// 									))}
// 								</Grid>
// 								<Button
// 									variant="light"
// 									color="blue"
// 									leftIcon={<IconPlus size="1rem" />}
// 									onClick={() => handleAddSubcategory(category.id)}
// 									fullWidth
// 									mt="md"
// 								>
// 									Add Subcategory
// 								</Button>
// 							</Box>
// 						</Collapse>
// 					</Card>
// 				))}
// 			</Stack>

// 			<Modal
// 				opened={opened}
// 				onClose={close}
// 				title={
// 					<Text size="lg" weight={500}>
// 						{editMode
// 							? `Edit ${currentSubcategory ? "Subcategory" : "Category"}`
// 							: `Add ${currentCategory ? "Subcategory" : "Category"}`}
// 					</Text>
// 				}
// 				size="sm"
// 			>
// 				<form onSubmit={handleSubmit}>
// 					<TextInput
// 						label="Name"
// 						name="name"
// 						required
// 						defaultValue={
// 							editMode
// 								? currentSubcategory
// 									? currentSubcategory.name
// 									: currentCategory?.name
// 								: ""
// 						}
// 					/>
// 					<Group position="right" mt="md">
// 						<Button
// 							type="submit"
// 							variant="gradient"
// 							gradient={{ from: "teal", to: "blue" }}
// 						>
// 							{editMode ? "Save" : "Add"}
// 						</Button>
// 					</Group>
// 				</form>
// 			</Modal>
// 		</Paper>
// 	);
// }

// "use client";

// import { useState } from "react";
// import {
// 	ActionIcon,
// 	Button,
// 	Card,
// 	Grid,
// 	Group,
// 	Modal,
// 	Paper,
// 	Text,
// 	TextInput,
// 	Title,
// 	Collapse,
// 	Stack,
// 	useMantineTheme,
// 	Box,
// 	Badge,
// 	Divider,
// 	Tooltip,
// 	Container,
// 	Alert,
// } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
// import {
// 	IconEdit,
// 	IconPlus,
// 	IconTrash,
// 	IconChevronDown,
// 	IconChevronUp,
// 	IconCategory,
// 	IconFolders,
// 	IconAlertCircle,
// } from "@tabler/icons-react";

// interface Category {
// 	id: string;
// 	name: string;
// 	subcategories: Subcategory[];
// }

// interface Subcategory {
// 	id: string;
// 	name: string;
// }

// export default function CategoryManagement() {
// 	const [categories, setCategories] = useState<Category[]>([
// 		{
// 			id: "1",
// 			name: "Electronics",
// 			subcategories: [
// 				{ id: "1", name: "Laptops" },
// 				{ id: "2", name: "Smartphones" },
// 			],
// 		},
// 		{
// 			id: "2",
// 			name: "Books",
// 			subcategories: [
// 				{ id: "3", name: "Fiction" },
// 				{ id: "4", name: "Non-fiction" },
// 			],
// 		},
// 	]);

// 	const [opened, { open, close }] = useDisclosure(false);
// 	const [editMode, setEditMode] = useState(false);
// 	const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
// 	const [currentSubcategory, setCurrentSubcategory] =
// 		useState<Subcategory | null>(null);
// 	const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

// 	const theme = useMantineTheme();

// 	const handleAddCategory = () => {
// 		setEditMode(false);
// 		setCurrentCategory(null);
// 		setCurrentSubcategory(null);
// 		open();
// 	};

// 	const handleEditCategory = (category: Category) => {
// 		setEditMode(true);
// 		setCurrentCategory(category);
// 		setCurrentSubcategory(null);
// 		open();
// 	};

// 	const handleDeleteCategory = (categoryId: string) => {
// 		setCategories(categories.filter((cat) => cat.id !== categoryId));
// 	};

// 	const handleAddSubcategory = (categoryId: string) => {
// 		setEditMode(false);
// 		setCurrentCategory(categories.find((cat) => cat.id === categoryId) || null);
// 		setCurrentSubcategory(null);
// 		open();
// 	};

// 	const handleEditSubcategory = (
// 		categoryId: string,
// 		subcategory: Subcategory
// 	) => {
// 		setEditMode(true);
// 		setCurrentCategory(categories.find((cat) => cat.id === categoryId) || null);
// 		setCurrentSubcategory(subcategory);
// 		open();
// 	};

// 	const handleDeleteSubcategory = (
// 		categoryId: string,
// 		subcategoryId: string
// 	) => {
// 		setCategories(
// 			categories.map((cat) =>
// 				cat.id === categoryId
// 					? {
// 							...cat,
// 							subcategories: cat.subcategories.filter(
// 								(sub) => sub.id !== subcategoryId
// 							),
// 					  }
// 					: cat
// 			)
// 		);
// 	};

// 	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
// 		event.preventDefault();
// 		const formData = new FormData(event.currentTarget);
// 		const name = formData.get("name") as string;

// 		if (currentSubcategory) {
// 			setCategories(
// 				categories.map((cat) =>
// 					cat.id === currentCategory?.id
// 						? {
// 								...cat,
// 								subcategories: cat.subcategories.map((sub) =>
// 									sub.id === currentSubcategory.id ? { ...sub, name } : sub
// 								),
// 						  }
// 						: cat
// 				)
// 			);
// 		} else if (currentCategory && editMode) {
// 			setCategories(
// 				categories.map((cat) =>
// 					cat.id === currentCategory.id ? { ...cat, name } : cat
// 				)
// 			);
// 		} else if (currentCategory) {
// 			setCategories(
// 				categories.map((cat) =>
// 					cat.id === currentCategory.id
// 						? {
// 								...cat,
// 								subcategories: [
// 									...cat.subcategories,
// 									{ id: Date.now().toString(), name },
// 								],
// 						  }
// 						: cat
// 				)
// 			);
// 		} else {
// 			setCategories([
// 				...categories,
// 				{ id: Date.now().toString(), name, subcategories: [] },
// 			]);
// 		}

// 		close();
// 	};

// 	const toggleCategory = (categoryId: string) => {
// 		setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
// 	};

// 	return (
// 		<Container size="xl">
// 			<Paper p="xl" shadow="md" withBorder>
// 				<Group ps="apart" mb="xl">
// 					<Group>
// 						<IconCategory size={32} color={theme.colors.blue[6]} />
// 						<Title order={2}>Category Management</Title>
// 					</Group>
// 					<Button
// 						leftSection={<IconPlus size="1.2rem" />}
// 						onClick={handleAddCategory}
// 						variant="gradient"
// 						gradient={{ from: "blue", to: "cyan" }}
// 						size="md"
// 					>
// 						Add Category
// 					</Button>
// 				</Group>

// 				<Divider mb="lg" />

// 				{categories.length === 0 ? (
// 					<Alert
// 						icon={<IconAlertCircle size="1.2rem" />}
// 						title="No Categories"
// 						color="blue"
// 					>
// 						No categories have been created yet. Click the "Add Category" button
// 						to get started.
// 					</Alert>
// 				) : (
// 					<Stack gap="md">
// 						{categories.map((category) => (
// 							<Card
// 								key={category.id}
// 								shadow="sm"
// 								p="lg"
// 								radius="md"
// 								withBorder
// 								style={{
// 									transition: "transform 200ms ease, box-shadow 200ms ease",
// 									"&:hover": {
// 										transform: "translateY(-2px)",
// 										boxShadow: theme.shadows.md,
// 									},
// 								}}
// 							>
// 								<Group ps="apart">
// 									<Group>
// 										<IconFolders size="1.5rem" color={theme.colors.blue[6]} />
// 										<Box>
// 											<Text fw={500} size="lg">
// 												{category.name}
// 											</Text>
// 											<Text size="sm" color="dimmed">
// 												{category.subcategories.length} subcategories
// 											</Text>
// 										</Box>
// 									</Group>
// 									<Group gap="xs">
// 										<Tooltip label="Edit Category">
// 											<ActionIcon
// 												size="lg"
// 												color="blue"
// 												variant="light"
// 												onClick={() => handleEditCategory(category)}
// 											>
// 												<IconEdit size="1.2rem" />
// 											</ActionIcon>
// 										</Tooltip>
// 										<Tooltip label="Delete Category">
// 											<ActionIcon
// 												size="lg"
// 												color="red"
// 												variant="light"
// 												onClick={() => handleDeleteCategory(category.id)}
// 											>
// 												<IconTrash size="1.2rem" />
// 											</ActionIcon>
// 										</Tooltip>
// 										<Tooltip
// 											label={
// 												expandedCategory === category.id ? "Collapse" : "Expand"
// 											}
// 										>
// 											<ActionIcon
// 												size="lg"
// 												variant="light"
// 												onClick={() => toggleCategory(category.id)}
// 											>
// 												{expandedCategory === category.id ? (
// 													<IconChevronUp size="1.2rem" />
// 												) : (
// 													<IconChevronDown size="1.2rem" />
// 												)}
// 											</ActionIcon>
// 										</Tooltip>
// 									</Group>
// 								</Group>

// 								<Collapse in={expandedCategory === category.id}>
// 									<Box mt="md">
// 										<Grid gutter="md">
// 											{category.subcategories.map((subcategory) => (
// 												<Grid.Col key={subcategory.id} span={12} sm={6} md={4}>
// 													<Card
// 														shadow="sm"
// 														p="md"
// 														radius="md"
// 														withBorder
// 														style={{
// 															transition: "transform 200ms ease",
// 															"&:hover": {
// 																transform: "translateY(-2px)",
// 															},
// 														}}
// 													>
// 														<Group ps="apart" wrap="nowrap">
// 															<Text size="sm" fw={500}>
// 																{subcategory.name}
// 															</Text>
// 															<Group gap={4}>
// 																<Tooltip label="Edit Subcategory">
// 																	<ActionIcon
// 																		size="sm"
// 																		color="blue"
// 																		variant="subtle"
// 																		onClick={() =>
// 																			handleEditSubcategory(
// 																				category.id,
// 																				subcategory
// 																			)
// 																		}
// 																	>
// 																		<IconEdit size="0.9rem" />
// 																	</ActionIcon>
// 																</Tooltip>
// 																<Tooltip label="Delete Subcategory">
// 																	<ActionIcon
// 																		size="sm"
// 																		color="red"
// 																		variant="subtle"
// 																		onClick={() =>
// 																			handleDeleteSubcategory(
// 																				category.id,
// 																				subcategory.id
// 																			)
// 																		}
// 																	>
// 																		<IconTrash size="0.9rem" />
// 																	</ActionIcon>
// 																</Tooltip>
// 															</Group>
// 														</Group>
// 													</Card>
// 												</Grid.Col>
// 											))}
// 										</Grid>
// 										<Button
// 											variant="light"
// 											color="blue"
// 											leftSection={<IconPlus size="1rem" />}
// 											onClick={() => handleAddSubcategory(category.id)}
// 											fullWidth
// 											mt="md"
// 										>
// 											Add Subcategory
// 										</Button>
// 									</Box>
// 								</Collapse>
// 							</Card>
// 						))}
// 					</Stack>
// 				)}

// 				<Modal
// 					opened={opened}
// 					onClose={close}
// 					title={
// 						<Group>
// 							<IconCategory size="1.2rem" />
// 							<Text size="lg" fw={500}>
// 								{editMode
// 									? `Edit ${currentSubcategory ? "Subcategory" : "Category"}`
// 									: `Add ${currentCategory ? "Subcategory" : "Category"}`}
// 							</Text>
// 						</Group>
// 					}
// 					size="sm"
// 				>
// 					<form onSubmit={handleSubmit}>
// 						<TextInput
// 							label="Name"
// 							name="name"
// 							required
// 							placeholder="Enter name..."
// 							defaultValue={
// 								editMode
// 									? currentSubcategory
// 										? currentSubcategory.name
// 										: currentCategory?.name
// 									: ""
// 							}
// 						/>
// 						<Group ps="right" mt="xl">
// 							<Button variant="light" onClick={close}>
// 								Cancel
// 							</Button>
// 							<Button
// 								type="submit"
// 								variant="gradient"
// 								gradient={{ from: "blue", to: "cyan" }}
// 							>
// 								{editMode ? "Save Changes" : "Create"}
// 							</Button>
// 						</Group>
// 					</form>
// 				</Modal>
// 			</Paper>
// 		</Container>
// 	);
// }

"use client";

import { useEffect, useState } from "react";
import {
	ActionIcon,
	Button,
	Card,
	Grid,
	Group,
	Modal,
	Paper,
	Text,
	TextInput,
	Title,
	Collapse,
	Stack,
	useMantineTheme,
	Box,
	Container,
	Alert,
	Textarea,
	LoadingOverlay,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
	IconEdit,
	IconPlus,
	IconTrash,
	IconChevronDown,
	IconChevronUp,
	IconCategory,
	IconFolders,
	IconAlertCircle,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { supabase } from "@/supabase";

export interface ServiceCategory {
	id: string;
	category: string;
}

export interface ServiceType {
	id: string;
	subcategory: string;
	category_id: string;
	service_content: string;
}

export default function CategoryManagement() {
	const [categories, setCategories] = useState<ServiceCategory[]>([]);
	const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
	const [loading, setLoading] = useState(true);
	const [opened, { open, close }] = useDisclosure(false);
	const [editMode, setEditMode] = useState(false);
	const [currentCategory, setCurrentCategory] =
		useState<ServiceCategory | null>(null);
	const [currentServiceType, setCurrentServiceType] =
		useState<ServiceType | null>(null);
	const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

	const theme = useMantineTheme();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			setLoading(true);

			const { data: categoriesData, error: categoriesError } = await supabase
				.from("service_category")
				.select("*");

			if (categoriesError) throw categoriesError;

			const { data: serviceTypesData, error: serviceTypesError } =
				await supabase.from("service_type").select("*");

			if (serviceTypesError) throw serviceTypesError;

			setCategories(categoriesData);
			setServiceTypes(serviceTypesData);
		} catch (error) {
			notifications.show({
				title: "Error",
				message: "Failed to fetch data",
				color: "red",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleAddCategory = () => {
		setEditMode(false);
		setCurrentCategory(null);
		setCurrentServiceType(null);
		open();
	};

	const handleEditCategory = (category: ServiceCategory) => {
		setEditMode(true);
		setCurrentCategory(category);
		setCurrentServiceType(null);
		open();
	};

	const handleDeleteCategory = async (categoryId: string) => {
		try {
			const { error } = await supabase
				.from("service_category")
				.delete()
				.eq("id", categoryId);

			if (error) throw error;

			await fetchData();
			notifications.show({
				title: "Success",
				message: "Category deleted successfully",
				color: "green",
			});
		} catch (error) {
			notifications.show({
				title: "Error",
				message: "Failed to delete category",
				color: "red",
			});
		}
	};

	const handleAddServiceType = (categoryId: string) => {
		setEditMode(false);
		setCurrentCategory(categories.find((cat) => cat.id === categoryId) || null);
		setCurrentServiceType(null);
		open();
	};

	const handleEditServiceType = (serviceType: ServiceType) => {
		setEditMode(true);
		setCurrentCategory(
			categories.find((cat) => cat.id === serviceType.category_id) || null
		);
		setCurrentServiceType(serviceType);
		open();
	};

	const handleDeleteServiceType = async (serviceTypeId: string) => {
		try {
			const { error } = await supabase
				.from("service_type")
				.delete()
				.eq("id", serviceTypeId);

			if (error) throw error;

			await fetchData();
			notifications.show({
				title: "Success",
				message: "Service type deleted successfully",
				color: "green",
			});
		} catch (error) {
			notifications.show({
				title: "Error",
				message: "Failed to delete service type",
				color: "red",
			});
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		try {
			if (currentServiceType) {
				const { error } = await supabase
					.from("service_type")
					.update({
						subcategory: formData.get("name") as string,
						service_content: formData.get("content") as string,
					})
					.eq("id", currentServiceType.id);

				if (error) throw error;
			} else if (currentCategory && editMode) {
				const { error } = await supabase
					.from("service_category")
					.update({
						category: formData.get("name") as string,
					})
					.eq("id", currentCategory.id);

				if (error) throw error;
			} else if (currentCategory) {
				const { error } = await supabase.from("service_type").insert({
					subcategory: formData.get("name") as string,
					category_id: currentCategory.id,
					service_content: formData.get("content") as string,
				});

				if (error) throw error;
			} else {
				const { error } = await supabase.from("service_category").insert({
					category: formData.get("name") as string,
				});

				if (error) throw error;
			}

			await fetchData();
			close();
			notifications.show({
				title: "Success",
				message: "Operation completed successfully",
				color: "green",
			});
		} catch (error) {
			notifications.show({
				title: "Error",
				message: "Operation failed",
				color: "red",
			});
		}
	};

	const toggleCategory = (categoryId: string) => {
		setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
	};

	return (
		<Container size="xl">
			<Paper p="xl" shadow="md" withBorder pos="relative">
				<LoadingOverlay visible={loading} />

				<Group ps="apart" mb="xl">
					<Group>
						<IconCategory size={32} color={theme.colors.blue[6]} />
						<Title order={2}>Category Management</Title>
					</Group>
					<Button
						leftSection={<IconPlus size="1.2rem" />}
						onClick={handleAddCategory}
						variant="gradient"
						gradient={{ from: "blue", to: "cyan" }}
						size="md"
					>
						Add Category
					</Button>
				</Group>

				{categories.length === 0 ? (
					<Alert
						icon={<IconAlertCircle size="1.2rem" />}
						title="No Categories"
						color="blue"
					>
						No categories have been created yet. Click the "Add Category" button
						to get started.
					</Alert>
				) : (
					<Stack gap="md">
						{categories.map((category) => {
							const categoryServiceTypes = serviceTypes.filter(
								(st) => st.category_id === category.id
							);

							return (
								<Card
									key={category.id}
									shadow="sm"
									p="lg"
									radius="md"
									withBorder
									style={{
										transition: "transform 200ms ease, box-shadow 200ms ease",
										"&:hover": {
											transform: "translateY(-2px)",
											boxShadow: theme.shadows.md,
										},
									}}
								>
									<Group ps="apart">
										<Group>
											<IconFolders size="1.5rem" color={theme.colors.blue[6]} />
											<Box>
												<Text fw={500} size="lg">
													{category.category}
												</Text>
												<Text size="sm" color="dimmed">
													{categoryServiceTypes.length} service types
												</Text>
											</Box>
										</Group>
										<Group gap="xs">
											<ActionIcon
												size="lg"
												color="blue"
												variant="light"
												onClick={() => handleEditCategory(category)}
												title="Edit Category"
											>
												<IconEdit size="1.2rem" />
											</ActionIcon>
											<ActionIcon
												size="lg"
												color="red"
												variant="light"
												onClick={() => handleDeleteCategory(category.id)}
												title="Delete Category"
											>
												<IconTrash size="1.2rem" />
											</ActionIcon>
											<ActionIcon
												size="lg"
												variant="light"
												onClick={() => toggleCategory(category.id)}
												title={
													expandedCategory === category.id
														? "Collapse"
														: "Expand"
												}
											>
												{expandedCategory === category.id ? (
													<IconChevronUp size="1.2rem" />
												) : (
													<IconChevronDown size="1.2rem" />
												)}
											</ActionIcon>
										</Group>
									</Group>

									<Collapse in={expandedCategory === category.id}>
										<Box mt="md">
											<Grid gutter="md">
												{categoryServiceTypes.map((serviceType) => (
													<Grid.Col key={serviceType.id} span={12}>
														<Card
															shadow="sm"
															p="md"
															radius="md"
															withBorder
															style={{
																transition: "transform 200ms ease",
																"&:hover": {
																	transform: "translateY(-2px)",
																},
															}}
														>
															<Stack gap="xs">
																<Group ps="apart" wrap="nowrap">
																	<Text size="sm" fw={500}>
																		{serviceType.subcategory}
																	</Text>
																	<Group gap={4}>
																		<ActionIcon
																			size="sm"
																			color="blue"
																			variant="subtle"
																			onClick={() =>
																				handleEditServiceType(serviceType)
																			}
																			title="Edit Service Type"
																		>
																			<IconEdit size="0.9rem" />
																		</ActionIcon>
																		<ActionIcon
																			size="sm"
																			color="red"
																			variant="subtle"
																			onClick={() =>
																				handleDeleteServiceType(serviceType.id)
																			}
																			title="Delete Service Type"
																		>
																			<IconTrash size="0.9rem" />
																		</ActionIcon>
																	</Group>
																</Group>
																<Text size="xs" color="dimmed">
																	{serviceType.service_content}
																</Text>
															</Stack>
														</Card>
													</Grid.Col>
												))}
											</Grid>
											<Button
												variant="light"
												color="blue"
												leftSection={<IconPlus size="1rem" />}
												onClick={() => handleAddServiceType(category.id)}
												fullWidth
												mt="md"
											>
												Add Service Type
											</Button>
										</Box>
									</Collapse>
								</Card>
							);
						})}
					</Stack>
				)}

				<Modal
					opened={opened}
					onClose={close}
					title={
						<Group>
							<IconCategory size="1.2rem" />
							<Text size="lg" fw={500}>
								{editMode
									? `Edit ${currentServiceType ? "Service Type" : "Category"}`
									: `Add ${currentCategory ? "Service Type" : "Category"}`}
							</Text>
						</Group>
					}
					size="md"
				>
					<form onSubmit={handleSubmit}>
						<TextInput
							label={
								currentServiceType || currentCategory
									? "Service Type Name"
									: "Category Name"
							}
							name="name"
							required
							placeholder="Enter name..."
							defaultValue={
								editMode
									? currentServiceType
										? currentServiceType.subcategory
										: currentCategory?.category
									: ""
							}
						/>

						{(currentServiceType || currentCategory) && (
							<Textarea
								label="Service Content"
								name="content"
								placeholder="Enter service content..."
								minRows={3}
								mt="md"
								defaultValue={currentServiceType?.service_content || ""}
							/>
						)}

						<Group ps="right" mt="xl">
							<Button variant="light" onClick={close}>
								Cancel
							</Button>
							<Button
								type="submit"
								variant="gradient"
								gradient={{ from: "blue", to: "cyan" }}
							>
								{editMode ? "Save Changes" : "Create"}
							</Button>
						</Group>
					</form>
				</Modal>
			</Paper>
		</Container>
	);
}
