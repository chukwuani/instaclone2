"use client";

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";

interface user {
	email: string;
	password: string;
	fullname: string;
	username: string;
}
const ResendEmail = () => {
	const router = useRouter();

	const [user, setUser] = useState<user>({} as user);

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("userData") as string));
	}, []);

	const { signUp, isLoaded } = useSignUp();

	const [isPending, startTransition] = useTransition();

	const handleSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (!isLoaded) return;

		startTransition(async () => {
			try {
				await signUp?.create({
					emailAddress: user.email,
					password: user.password,
					username: user.username,
					firstName: user.fullname.split(" ")[0],
					lastName: user.fullname.split(" ")[1],
				});

				// Send email verification code
				await signUp.prepareEmailAddressVerification({
					strategy: "email_code",
				});

				toast.success("Check your email. We sent you a 6-digit verification code.");
			} catch (err: any) {
				err.errors.map((msg: { message: string }) => {
					toast.error(msg.message);
				});
			}
		});
	};

	return (
		<section className="flex flex-col py-2 px-7 items-center justify-center">
			<span className="verify-email" />

			<h2 className="text-[14px] text-primary-text font-semibold mt-2 mb-4">
				Enter Confirmation Code
			</h2>

			<span className="text-[14px] text-center text-primary-text font-normal mt-2 mb-4">
				Enter the confirmation code we sent to {user.email}.{" "}
				<button
					onClick={handleSignUp}
					className="text-sm text-primary-button font-semibold hover:text-link">
					Resend Code.
				</button>
			</span>
		</section>
	);
};

export default ResendEmail;
