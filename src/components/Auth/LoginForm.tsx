"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
	Button,
	Card,
	Paper,
	PasswordInput,
	Space,
	TextInput,
} from "@mantine/core";
import { useAuthStore } from "@/store/authStore";
import { notifications } from "@mantine/notifications";
import { createClient } from "@/utils/supabase/client";

interface FormData {
	email: string;
	password: string;
	rememberMe: boolean;
}

interface FormErrors {
	email?: string;
	password?: string;
}

export function LoginForm() {
	const router = useRouter();
	const signIn = useAuthStore((state: any) => state.signIn);
	const loading = useAuthStore((state: any) => state.loading);

	const [formData, setFormData] = useState<FormData>({
		email: "",
		password: "",
		rememberMe: false,
	});
	const [errors, setErrors] = useState<FormErrors>({});

	const validateForm = () => {
		const newErrors: FormErrors = {};

		if (!formData.email) {
			newErrors.email = "Email is required";
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
		) {
			newErrors.email = "Invalid email address";
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 8) {
			newErrors.password = "Password must be at least 8 characters";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			try {
				const res = await signIn(formData.email, formData.password);
				if (res) {
					notifications.show({
						title: "",
						message: `Login Successfully!`,
						position: "top-center",
						color: "green",
					});
					const supabase = createClient();
					router.push("/dashboard");
				} else
					notifications.show({
						title: "",
						message: `Invalid login credentials`,
						position: "top-center",
						color: "red",
					});
			} catch (error) {
				notifications.show({
					title: "",
					message: `Invalid login credentials`,
					position: "top-center",
					color: "red",
				});
				setErrors({ password: "Invalid email or password" });
			}
		}
	};

	return (
		<Card className="w-full max-w-md p-6">
			<form onSubmit={handleSubmit} className="space-y-4">
				<Paper withBorder shadow="md" p={30} mt={30} radius="md">
					<TextInput
						label="Email"
						placeholder="test@example.com"
						required
						value={formData.email}
						onChange={(e) =>
							setFormData({ ...formData, email: e.target.value })
						}
						className={errors.email ? "border-red-500" : ""}
					/>
					<PasswordInput
						label="Password"
						placeholder="Your password"
						required
						mt="md"
						value={formData.password}
						onChange={(e) =>
							setFormData({ ...formData, password: e.target.value })
						}
						className={errors.password ? "border-red-500" : ""}
					/>
					<Space h="md" />
					<Button
						fullWidth
						mt="xl"
						type="submit"
						loading={loading}
						disabled={loading}
					>
						Sign In
					</Button>
				</Paper>
			</form>
		</Card>
	);
}

export default LoginForm;
