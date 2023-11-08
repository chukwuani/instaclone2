import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";

import { icons } from "@/constants";
import LoginForm from "@/components/form/LoginForm";
import LoginWithGithub from "@/components/form/LoginWithGithub";
import FormDivider from "@/components/form/FormDivider";

export const metadata: Metadata = {
	title: "Login • Instagram",
	description:
		"Welcome back to Instagram. Sign in to check out what your friends, family & interests have been capturing & sharing around the world.",
	icons: {
		icon: "/images/instagram-logo.png",
	},
	twitter: {
		card: "summary_large_image",
		title: "Login • Instagram",
		description:
			"Welcome back to Instagram. Sign in to check out what your friends, family & interests have been capturing & sharing around the world.",
		images: ["/images/instagram-logo.png"],
		creator: "@_stevecodes",
	},
	openGraph: {
		images: ["/images/instagram-logo.png"],
		type: "website",
		locale: "en_US",
		title: "Login • Instagram",
		description:
			"Welcome back to Instagram. Sign in to check out what your friends, family & interests have been capturing & sharing around the world.",
		siteName: "Login • Instagram",
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

export default async function Home() {
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

				<LoginForm />

				<FormDivider />

				<section className="flex flex-col items-center justify-center gap-[10px] mb-[10px] py-[10px]">
					<LoginWithGithub />

					<Link
						href="/login/reset-password"
						className="text-xs font-normal text-link">
						Forgot password?
					</Link>
				</section>
			</section>

			<section className="flex justify-center max-w-[350px] w-full items-center border border-separator max-md:border-transparent rounded-[1px] mb-[10px] py-[5px]">
				<p className="text-sm leading-normal text-center m-[15px]">
					Don&apos;t have an account?{" "}
					<Link
						className="text-primary-button font-semibold"
						href="/signup">
						Sign up
					</Link>
				</p>
			</section>
		</section>
	);
}
