import type { Metadata } from "next";
import { icons } from "@/constants";
import ChatCard from "@/components/ChatCard";
import Image from "next/image";

export const metadata: Metadata = {
	title: "Inbox • Chats",
	description:
		"Share your moments with Instagram, the app that lets you send private photos and messages to a friend or group. You can also explore millions of other photos and videos from people you follow or discover.",
	icons: {
		icon: "/images/instagram-logo.png",
	},
	twitter: {
		card: "summary_large_image",
		title: "Inbox • Chats",
		description:
			"Share your moments with Instagram, the app that lets you send private photos and messages to a friend or group. You can also explore millions of other photos and videos from people you follow or discover.",
		images: ["/images/instagram-logo.png"],
		creator: "@_stevecodes",
	},
	openGraph: {
		images: ["/images/instagram-logo.png"],
		type: "website",
		locale: "en_US",
		title: "Inbox • Chats",
		description:
			"Share your moments with Instagram, the app that lets you send private photos and messages to a friend or group. You can also explore millions of other photos and videos from people you follow or discover.",
		siteName: "Inbox • Chats",
		url: "https://instaglone.vercel.app/message",
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

const page = () => {
	return (
		<main className="main-content">
			<section className="w-full h-screen flex justify-center absolute">
				<section className="flex items-center justify-center w-full min-h-screen">
					<section className=" w-1/3 h-full flex flex-col max-[768px]:w-full">
						<section className="flex items-center justify-between pb-[10px] px-6 pt-[14px]">
							<h1 className="text-base font-bold text-primary-text">Messages</h1>

							<button>
								<Image
									className="icons"
									src={icons.newMessage}
									alt="New message icon"
								/>
							</button>
						</section>

						<ChatCard />
					</section>

					<article className="general-chat-display max-[768px]:hidden">
						<Image
							className="icons"
							src={icons.nodm}
							alt=""
						/>

						<h3 className="mt-5 text-xl font-light text-primary-text">Your Messages</h3>
						<p className="mt-[10px] text-sm font-normal text-secondary-text w-1/2 text-center">
							Send private photos and messages to a friend or group, and have fun conversations.
						</p>
					</article>
				</section>
			</section>
		</main>
	);
};

export default page;
