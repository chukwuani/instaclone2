// million-ignore

import { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import ProfileBottom from "@/components/profile/ProfileBottom";
import ProfileTop from "@/components/profile/ProfileTop";
import { getUserByUsername, getUserPost, getUserSaves } from "@/lib/firebaseService";
import { currentUser } from "@clerk/nextjs";

export const metadata: Metadata = {
	title: "Profile • Instagram photos and videos",
	description: "See Instagram photos and videos from user",
	icons: {
		icon: "/images/instagram-logo.png",
	},
	twitter: {
		card: "summary_large_image",
		title: "Profile • Instagram photos and videos",
		description: "See Instagram photos and videos from user",
		images: ["/images/instagram-logo.png"],
		creator: "@_stevecodes",
	},
	openGraph: {
		images: ["/images/instagram-logo.png"],
		type: "website",
		locale: "en_US",
		title: "Profile • Instagram photos and videos",
		description: "See Instagram photos and videos from user",
		siteName: "Profile • Instagram photos and videos",
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

export default async function Page({ params }: { params: { username: string } }) {
	const loggedInUser = await currentUser();
	const user = await getUserByUsername(params.username);
	const posts = await getUserPost(user[0]?.userId);
	const saves = await getUserSaves(user[0]?.userId);

	return (
		<main className="main-content">
			<section className="user-profile">
				<ProfileTop
					user={user[0]}
					postNumber={posts.length}
					showFollow={loggedInUser?.id !== user[0]?.userId}
					loggedInUserId={loggedInUser?.id}
				/>

				<ProfileBottom
					posts={posts}
					saves={saves}
					showSaved={loggedInUser?.id === user[0]?.userId}
				/>

				<Footer />
			</section>
		</main>
	);
}
