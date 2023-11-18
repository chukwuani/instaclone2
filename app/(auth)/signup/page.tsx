import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";

import SignupForm from "@/components/form/SignupForm";
import { icons } from "@/constants";

export const metadata: Metadata = {
	title: "Sign up • Instagram",
	description:
		"Join Instagram! Sign up to see photos, videos, stories & messages from your friends, family & interests around the world.",
	icons: {
		icon: "/images/instagram-logo.png",
	},
	twitter: {
		card: "summary_large_image",
		title: "Sign up • Instagram",
		description:
			"Join Instagram! Sign up to see photos, videos, stories & messages from your friends, family & interests around the world.",
		images: ["/images/instagram-logo.png"],
		creator: "@_stevecodes",
	},
	openGraph: {
		images: ["/images/instagram-logo.png"],
		type: "website",
		locale: "en_US",
		title: "Sign up • Instagram",
		description:
			"Join Instagram! Sign up to see photos, videos, stories & messages from your friends, family & interests around the world.",
		siteName: "Sign up • Instagram",
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

const Home = async () => {
	const user = await currentUser();

	if (user) redirect("/");

	return (
		<section className="w-full min-h-full flex flex-col justify-center items-center">
			<section className="border border-separator max-md:border-transparent rounded-[1px] mb-[10px] mt-3 py-[10px] flex flex-col items-center max-w-[350px] w-full">
				<Image
					className="w-[175px] h-auto mt-9 mb-3 icons"
					src={icons.textLogo}
					alt="Instagram"
					priority
				/>

				<p className="text-secondary-text text-[17px] font-semibold leading-5 mt-0 mx-10 mb-[10px] text-center">
					Sign up to see photos and videos from your friends.
				</p>

				<SignupForm />
			</section>

			<section className="flex justify-center max-w-[350px] w-full items-center border border-separator max-md:border-transparent rounded-[1px] mb-[10px] py-[5px]">
				<p className="text-sm leading-normal text-center m-[15px]">
					Have an account?{" "}
					<Link
						className="text-primary-button font-semibold"
						href="/login">
						Log in
					</Link>
				</p>
			</section>
		</section>
	);
};

export default Home;
