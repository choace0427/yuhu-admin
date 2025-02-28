import "@mantine/core/styles.css";
import "mantine-react-table/styles.css";

import {
	ColorSchemeScript,
	DirectionProvider,
	MantineProvider,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { Analytics } from "@vercel/analytics/react";
import { inter } from "@/styles/fonts";
import { theme } from "@/styles/theme";
import { AppProvider } from "./provider";

import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dropzone/styles.css";

export const metadata = {
	metadataBase: new URL("https://mantine-admin.vercel.app/"),
	title: { default: "Yuhu Admin", template: "%s | Yuhu Admin" },
	description: "A Modern Dashboard with Next.js.",
	keywords: [
		"Next.js",
		"Mantine",
		"Admin",
		"Template",
		"Admin Template",
		"Admin Dashboard",
		"Admin Panel",
		"Admin UI",
	],
	authors: [
		{
			name: "jotyy",
			url: "https://jotyy.vercel.app",
		},
	],
	creator: "jotyy",
	manifest: "https://mantine-admin.vercel.app/site.webmanifest",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en-US">
			<head>
				<ColorSchemeScript />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
				/>
			</head>
			<body className={inter.className}>
				<DirectionProvider>
					<MantineProvider theme={theme}>
						<ModalsProvider>
							<AppProvider>{children}</AppProvider>
							<Analytics />
						</ModalsProvider>
						<Notifications />
					</MantineProvider>
				</DirectionProvider>
			</body>
		</html>
	);
}
