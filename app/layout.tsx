import ThemeProviders from "../utils/ThemeProviders";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

import type { Metadata } from "next";
import { Toaster } from "@/utils/Toaster";
export const metadata: Metadata = {
	title: "Instagram",
	description:
		"Create an account or log into Instagram - A simple, fun & creative way to capture, edit & share photos, videos & messages with friends & family.",
	icons: {
		icon: "/images/instagram-logo.png",
	},
	// manifest: "/manifest.json",
};

const clerk_pub_key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body>
					<ThemeProviders>{children}</ThemeProviders>
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
