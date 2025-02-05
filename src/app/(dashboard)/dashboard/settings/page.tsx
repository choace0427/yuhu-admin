"use client";

import { useState } from "react";
import {
	PasswordInput,
	Button,
	Paper,
	Title,
	Text,
	Container,
	Group,
	Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { createClient } from "@/utils/supabase/client";

export default function PasswordSettingsPage() {
	const [loading, setLoading] = useState(false);

	const form = useForm({
		initialValues: {
			newPassword: "",
			confirmPassword: "",
		},
		validate: {
			newPassword: (value) =>
				value.length < 6 ? "Password must be at least 6 characters" : null,
			confirmPassword: (value, values) =>
				value !== values.newPassword ? "Passwords do not match" : null,
		},
	});

	const handleSubmit = async (values: typeof form.values) => {
		setLoading(true);
		try {
			const supabase = createClient();
			const { data, error } = await supabase.auth.updateUser({
				password: values.newPassword,
			});

			if (!error)
				notifications.show({
					title: "Success",
					message: "Your password has been updated successfully.",
					color: "green",
				});
			form.reset();
		} catch (error) {
			notifications.show({
				title: "Error",
				message: "Failed to update password. Please try again.",
				color: "red",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container size="sm">
			<Paper radius="md" p="xl" withBorder>
				<Title order={2} mb="md">
					Change Password
				</Title>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<Stack>
						<PasswordInput
							label="New Password"
							placeholder="Enter your new password"
							required
							{...form.getInputProps("newPassword")}
						/>
						<PasswordInput
							label="Confirm New Password"
							placeholder="Confirm your new password"
							required
							{...form.getInputProps("confirmPassword")}
						/>
						<Group ps="apart" mt="lg" justify="space-between">
							<Text size="sm" color="dimmed">
								Password must be at least 6 characters long.
							</Text>
							<Button type="submit" loading={loading}>
								Update Password
							</Button>
						</Group>
					</Stack>
				</form>
			</Paper>
		</Container>
	);
}
