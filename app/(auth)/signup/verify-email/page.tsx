import VerifyForm from "@/components/form/VerifyForm";
import Link from "next/link";
import type { Metadata } from "next";
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
	if (user) redirect("/");

	return (
		<section className="w-full min-h-full flex flex-col justify-center items-center">
			<section className="border border-separator max-md:border-transparent rounded-[1px] mb-[10px] mt-3 py-[10px] flex flex-col items-center max-w-[350px] w-full">
				<section className="flex flex-col py-2 px-7 items-center justify-center">
					<span className="verify-email" />

					<h2 className="text-[14px] text-primary-text font-semibold mt-2 mb-4">
						Enter Confirmation Code
					</h2>

					<span className="text-[14px] text-center text-primary-text font-normal mt-2 mb-4">
						Enter the confirmation code we sent to chukwuanisteven78@gmail.com.{" "}
						<button className="text-sm text-primary-button font-semibold hover:text-link">
							Resend Code.
						</button>
					</span>
				</section>

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
