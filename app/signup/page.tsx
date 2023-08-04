import Image from "next/image";
import Link from "next/link";
import SignupForm from "@/components/SignupForm";

import type { Metadata } from "next";
import { icons } from "@/constants";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Sign up • Instagram",
	description:
		"Join Instagram! Sign up to see photos, videos, stories & messages from your friends, family & interests around the world.",
	icons: {
		icon: "/images/instagram-logo.png",
	},
};

const Home = async () => {
	const user = await currentUser();

	// if user manually enters this URL send them back to home if user exists
	if (user) {
		redirect("/");
	}

	return (
		<section className="w-full min-h-full flex flex-col justify-center items-center">
			<section className="signin-form-section">
				<Image className="w-[175px] h-auto mt-9 mb-3" src={icons.textLogo} alt="Instagram" />

				<p className="signup-info">Sign up to see photos and videos from your friends.</p>

				<SignupForm />
			</section>

			<section className="switch-signin-method">
				<p>
					Have an account? <Link href="/login">Log in</Link>
				</p>
			</section>
		</section>
	);
};

export default Home;
