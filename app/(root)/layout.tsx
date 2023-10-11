import "../globals.css";

import ThemeProvider from "../../utils/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/utils/Toaster";
import type { Metadata } from "next";
import ReactQuery from "@/utils/ReactQuery";
import LoadingBar from "@/components/LoadingBar";

export const metadata: Metadata = {
	title: "Instagram",
	description:
		"Create an account or log into Instagram - A simple, fun & creative way to capture, edit & share photos, videos & messages with friends & family.",
	icons: {
		icon: "/images/instagram-logo.png",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ReactQuery>
			<ClerkProvider>
				<html
					lang="en"
					suppressHydrationWarning>
					<body>
						<ThemeProvider>
							<Navbar />
							<LoadingBar />
							{children}
						</ThemeProvider>
						<Toaster />
					</body>
				</html>
			</ClerkProvider>
		</ReactQuery>
	);
}
