import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ResetPasswordForm from "@/components/ResetPasswordForm";

export const metadata: Metadata = {
	title: "Reset Password • Instagram",
	description:
		"Create an account or log in to Instagram - A simple, fun & creative way to capture, edit & share photos, videos & messages with friends & family.",
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
				<section className="flex flex-col py-2 px-7 items-center justify-center">
					<span className="reset-password" />

					<h2 className="text-[16px] text-primary-text font-semibold mt-2 mb-4">
						Trouble logging in?
					</h2>

					<span className="text-[14px] text-center text-primary-text font-normal mb-4">
						Enter your email, and we&apos;ll send you a code to get back into your account
					</span>
				</section>

				<ResetPasswordForm />
			</section>
		</section>
	);
};

export default Home;
