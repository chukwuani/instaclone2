import "../globals.css";

import ThemeProvider from "@/utils/ThemeProvider";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/utils/Toaster";

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
		<ClerkProvider>
			<html
				lang="en"
				suppressHydrationWarning>
				<body>
					<ThemeProvider>{children}</ThemeProvider>
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
