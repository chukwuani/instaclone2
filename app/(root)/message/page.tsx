import type { Metadata } from "next";
import { icons } from "@/constants";
import ChatCard from "@/components/ChatCard";
import Image from "next/image";

export const metadata: Metadata = {
	title: "Inbox • Direct",
	description:
		"Share your moments with Instagram, the app that lets you send private photos and messages to a friend or group. You can also explore millions of other photos and videos from people you follow or discover.",
	icons: {
		icon: "/images/instagram-logo.png",
	},
};

const page = () => {
	return (
		<main className="main-content">
			<section className="w-full h-screen flex justify-center absolute">
				<section className="flex items-center justify-center w-full min-h-screen">
					<section className=" w-1/3 h-full flex flex-col max-[768px]:w-full">
						<h1 className=" text-base pb-[10px] px-6 pt-[14px] font-bold primary-text">Messages</h1>

						<ChatCard />
					</section>

					<article className="general-chat-display max-[768px]:hidden">
						<Image
							className="icons"
							src={icons.nodm}
							alt=""
						/>

						<h3 className="mt-5 text-xl font-light primary-text">Your Messages</h3>
						<p className="mt-[10px] text-sm font-normal secondary-text w-1/2 text-center">
							Send private photos and messages to a friend or group, and have fun conversations.
						</p>
					</article>
				</section>
			</section>
		</main>
	);
};

export default page;
