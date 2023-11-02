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
	twitter: {
		card: "summary_large_image",
		title: "Instagram",
		description:
			"Create an account or log into Instagram - A simple, fun & creative way to capture, edit & share photos, videos & messages with friends & family.",
		images: ["/images/instagram-logo.png"],
		creator: "@_stevecodes",
	},
	openGraph: {
		images: ["/images/instagram-logo.png"],
		type: "website",
		locale: "en_US",
		title: "Instagram",
		description:
			"Create an account or log into Instagram - A simple, fun & creative way to capture, edit & share photos, videos & messages with friends & family.",
		siteName: "Instagram",
	},
	keywords: [
		"Next.js",
		"React",
		"Tailwind CSS",
		"Server Components",
		"Server Actions",
		"Social Media App",
		"Photo Sharing App",
		"Instant Messaging App",
		"User Profiles",
		"Followers and Following",
		"Likes and Comments",
		"Explore Feed",
		"Direct Messaging",
		"Notifications",
		"User Authentication",
		"Customizable Profiles",
		"Activity Feed",
		"User Engagement",
		"User Interactions",
		"Search and Discover",
		"Social Networking",
	],
	authors: [
		{
			name: "Stephen Chukwuani",
			url: "https://github.com/chukwuani",
		},
	],
	creator: "Stephen Chukwuani",
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
