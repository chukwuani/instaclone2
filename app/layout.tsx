import ThemeProviders from "../utils/ThemeProviders";

import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

import type { Metadata } from "next";
import { Toaster } from "@/utils/Toaster";
import { ProgressBar } from "@/utils/ProgressBar";
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
			<html lang="en" suppressHydrationWarning>
				<body>
					<ThemeProviders>{children}</ThemeProviders>
					<Toaster />
					<ProgressBar />
				</body>
			</html>
		</ClerkProvider>
	);
}
