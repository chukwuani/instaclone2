import type { Metadata } from "next";
import { icons } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import LoginWithGoogle from "@/components/LoginWithGoogle";
import FormDivider from "@/components/FormDivider";

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
			<section className="border-seperator rounded-[1px] mb-[10px] mt-3 py-[10px] flex flex-col items-center max-w-[350px] w-full">
				<Image className="w-[175px] h-auto mt-9 mb-3" src={icons.textLogo} alt="Instagram" />

				<LoginForm />

				<FormDivider />

				<section className="flex flex-col items-center justify-center gap-[10px] mb-[10px] py-[10px]">
					<LoginWithGoogle />

					<Link href="#" className="text-xs font-normal link">
						Forgot password?
					</Link>
				</section>
			</section>

			<section className="flex justify-center max-w-[350px] w-full items-center border-seperator rounded-[1px] mb-[10px] py-[5px]">
				<p className="text-sm leading-normal text-center m-[15px]">
					Don&apos;t have an account?{" "}
					<Link className="primary-btn font-semibold" href="/signup">
						Sign up
					</Link>
				</p>
			</section>
		</section>
	);
}
