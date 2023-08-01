import ThemeProviders from "../utils/ThemeProviders";
import "./globals.css";

import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Instagram",
	description:
		"Create an account or log into Instagram - A simple, fun & creative way to capture, edit & share photos, videos & messages with friends & family.",
	icons: {
		icon: "/images/instagram-logo.png",
	},
	// manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemeProviders>{children}</ThemeProviders>
			</body>
		</html>
	);
}
