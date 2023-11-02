import VerifyForm from "@/components/form/VerifyForm";
import Link from "next/link";
import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ResendEmail from "@/components/form/ResendEmail";

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

	if (user) redirect("/");

	return (
		<section className="w-full min-h-full flex flex-col justify-center items-center">
			<section className="border border-separator max-md:border-transparent rounded-[1px] mb-[10px] mt-3 py-[10px] flex flex-col items-center max-w-[350px] w-full">
				<ResendEmail />

				<VerifyForm />
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
