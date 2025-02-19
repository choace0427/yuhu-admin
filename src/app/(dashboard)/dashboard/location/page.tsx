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
	IconWorld,
	IconMapPin,
	IconAlertCircle,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { createClient } from "@/utils/supabase/client";

export interface Country {
	id: string;
	country: string;
}

export interface City {
	id: string;
	city: string;
	country_id: string;
}

export default function LocationManagement() {
	const [countries, setCountries] = useState<Country[]>([]);
	const [cities, setCities] = useState<City[]>([]);
	const [loading, setLoading] = useState(true);
	const [opened, { open, close }] = useDisclosure(false);
	const [editMode, setEditMode] = useState(false);
	const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
	const [currentCity, setCurrentCity] = useState<City | null>(null);
	const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

	const theme = useMantineTheme();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			setLoading(true);

			const supabase = createClient();
			const { data: countriesData, error: countriesError } = await supabase
				.from("location_country")
				.select("*");

			if (countriesError) throw countriesError;

			const { data: citiesData, error: citiesError } = await supabase
				.from("location_city")
				.select("*");

			if (citiesError) throw citiesError;

			setCountries(countriesData);
			setCities(citiesData);
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

	const handleAddCountry = () => {
		setEditMode(false);
		setCurrentCountry(null);
		setCurrentCity(null);
		open();
	};

	const handleEditCountry = (country: Country) => {
		setEditMode(true);
		setCurrentCountry(country);
		setCurrentCity(null);
		open();
	};

	const handleDeleteCountry = async (countryId: string) => {
		try {
			const supabase = createClient();
			const { error } = await supabase
				.from("location_country")
				.delete()
				.eq("id", countryId);

			if (error) throw error;

			await fetchData();
			notifications.show({
				title: "Success",
				message: "Country deleted successfully",
				color: "green",
			});
		} catch (error) {
			notifications.show({
				title: "Error",
				message: "Failed to delete country",
				color: "red",
			});
		}
	};

	const handleAddCity = (countryId: string) => {
		setEditMode(false);
		setCurrentCountry(
			countries.find((country) => country.id === countryId) || null
		);
		setCurrentCity(null);
		open();
	};

	const handleEditCity = (city: City) => {
		setEditMode(true);
		setCurrentCountry(
			countries.find((country) => country.id === city.country_id) || null
		);
		setCurrentCity(city);
		open();
	};

	const handleDeleteCity = async (cityId: string) => {
		try {
			const supabase = createClient();
			const { error } = await supabase
				.from("location_city")
				.delete()
				.eq("id", cityId);

			if (error) throw error;

			await fetchData();
			notifications.show({
				title: "Success",
				message: "City deleted successfully",
				color: "green",
			});
		} catch (error) {
			notifications.show({
				title: "Error",
				message: "Failed to delete city",
				color: "red",
			});
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		try {
			const supabase = createClient();
			if (currentCity) {
				const { error } = await supabase
					.from("location_city")
					.update({
						city: formData.get("name") as string,
					})
					.eq("id", currentCity.id);

				if (error) throw error;
			} else if (currentCountry && editMode) {
				const { error } = await supabase
					.from("location_country")
					.update({
						country: formData.get("name") as string,
					})
					.eq("id", currentCountry.id);

				if (error) throw error;
			} else if (currentCountry) {
				const { error } = await supabase.from("location_city").insert({
					city: formData.get("name") as string,
					country_id: currentCountry.id,
				});

				if (error) throw error;
			} else {
				const { error } = await supabase.from("location_country").insert({
					country: formData.get("name") as string,
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

	const toggleCountry = (countryId: string) => {
		setExpandedCountry(expandedCountry === countryId ? null : countryId);
	};

	return (
		<Container size="xl">
			<Paper p="xl" shadow="md" withBorder pos="relative">
				<LoadingOverlay visible={loading} />

				<Group ps="apart" mb="xl">
					<Group>
						<IconWorld size={32} color={theme.colors.blue[6]} />
						<Title order={2}>Location Management</Title>
					</Group>
					<Button
						leftSection={<IconPlus size="1.2rem" />}
						onClick={handleAddCountry}
						variant="gradient"
						gradient={{ from: "blue", to: "cyan" }}
						size="md"
					>
						Add Country
					</Button>
				</Group>

				{countries.length === 0 ? (
					<Alert
						icon={<IconAlertCircle size="1.2rem" />}
						title="No Countries"
						color="blue"
					>
						No countries have been created yet. Click the "Add Country" button
						to get started.
					</Alert>
				) : (
					<Stack gap="md">
						{countries.map((country) => {
							const countryCities = cities.filter(
								(city) => city.country_id === country.id
							);

							return (
								<Card
									key={country.id}
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
											<IconMapPin size="1.5rem" color={theme.colors.blue[6]} />
											<Box>
												<Text fw={500} size="lg">
													{country.country}
												</Text>
												<Text size="sm" color="dimmed">
													{countryCities.length} cities
												</Text>
											</Box>
										</Group>
										<Group gap="xs">
											<ActionIcon
												size="lg"
												color="blue"
												variant="light"
												onClick={() => handleEditCountry(country)}
												title="Edit Country"
											>
												<IconEdit size="1.2rem" />
											</ActionIcon>
											<ActionIcon
												size="lg"
												color="red"
												variant="light"
												onClick={() => handleDeleteCountry(country.id)}
												title="Delete Country"
											>
												<IconTrash size="1.2rem" />
											</ActionIcon>
											<ActionIcon
												size="lg"
												variant="light"
												onClick={() => toggleCountry(country.id)}
												title={
													expandedCountry === country.id ? "Collapse" : "Expand"
												}
											>
												{expandedCountry === country.id ? (
													<IconChevronUp size="1.2rem" />
												) : (
													<IconChevronDown size="1.2rem" />
												)}
											</ActionIcon>
										</Group>
									</Group>

									<Collapse in={expandedCountry === country.id}>
										<Box mt="md">
											<Grid gutter="md">
												{countryCities.map((city) => (
													<Grid.Col key={city.id} span={12}>
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
																		{city.city}
																	</Text>
																	<Group gap={4}>
																		<ActionIcon
																			size="sm"
																			color="blue"
																			variant="subtle"
																			onClick={() => handleEditCity(city)}
																			title="Edit City"
																		>
																			<IconEdit size="0.9rem" />
																		</ActionIcon>
																		<ActionIcon
																			size="sm"
																			color="red"
																			variant="subtle"
																			onClick={() => handleDeleteCity(city.id)}
																			title="Delete City"
																		>
																			<IconTrash size="0.9rem" />
																		</ActionIcon>
																	</Group>
																</Group>
															</Stack>
														</Card>
													</Grid.Col>
												))}
											</Grid>
											<Button
												variant="light"
												color="blue"
												leftSection={<IconPlus size="1rem" />}
												onClick={() => handleAddCity(country.id)}
												fullWidth
												mt="md"
											>
												Add City
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
							<IconWorld size="1.2rem" />
							<Text size="lg" fw={500}>
								{editMode
									? `Edit ${currentCity ? "City" : "Country"}`
									: `Add ${currentCountry ? "City" : "Country"}`}
							</Text>
						</Group>
					}
					size="md"
				>
					<form onSubmit={handleSubmit}>
						<TextInput
							label={
								currentCity || currentCountry ? "City Name" : "Country Name"
							}
							name="name"
							required
							placeholder="Enter name..."
							defaultValue={
								editMode
									? currentCity
										? currentCity.city
										: currentCountry?.country
									: ""
							}
						/>

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
