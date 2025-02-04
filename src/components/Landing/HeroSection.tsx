"use client";

import { Button, Container, Group, Text, Title } from "@mantine/core";
import { IconArrowRight, IconStar } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import classes from "./HeroSection.module.css";

export function HeroSection() {
	const router = useRouter();

	return (
		<Container pt="sm" size="lg" className={classes.wrapper}>
			<div className={classes.inner}>
				<Title className={classes.title}>Yuhu Admin</Title>
				<Title className={classes.subtitle}>
					Modern Admin Dashboard Template Built with Next.js 14 and Mantine UI
				</Title>

				<Group mt={60}>
					<Button
						size="lg"
						variant="gradient"
						gradient={{ from: "primary", to: "pink" }}
						className={classes.control}
						onClick={() => {
							router.push("/dashboard");
						}}
						rightSection={<IconArrowRight size={16} />}
					>
						Get started
					</Button>
					<Button
						variant="default"
						color="dark"
						size="lg"
						className={classes.control}
						onClick={() => {
							// open github
							window.open("https://github.com/jotyy/mantine-admin");
						}}
						rightSection={<IconStar size={16} />}
					>
						Give a Star
					</Button>
				</Group>
			</div>
		</Container>
	);
}
