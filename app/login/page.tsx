import type { Metadata } from "next";
import { icons } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import LoginWithGoogle from "@/components/LoginWithGoogle";

export const metadata: Metadata = {
	title: "Login • Instagram",
	description:
		"Welcome back to Instagram. Sign in to check out what your friends, family & interests have been capturing & sharing around the world.",
	icons: {
		icon: "/images/instagram-logo.png",
	},
};

export default async function Home() {
	const user = await currentUser();

	// if user manually enters this URL send them back to home if user exists
	if (user) {
		redirect("/");
	}

	return (
		<section className="w-full min-h-full flex flex-col justify-center items-center">
			<section className="signin-form-section">
				<Image className="w-[175px] h-auto mt-9 mb-3" src={icons.textLogo} alt="Instagram" />

				<LoginForm />

				<section className="or-seperator">
					<div className="left-seperator" />
					<p>OR</p>
					<div className="right-seperator" />
				</section>

				<section className="other-login-option">
					<LoginWithGoogle />

					<Link href="#" className="text-xs font-normal">
						Forgot password?
					</Link>
				</section>
			</section>

			<section className="switch-signin-method">
				<p>
					Don&apos;t have an account? <Link href="/signup">Sign up</Link>
				</p>
			</section>
		</section>
	);
}
