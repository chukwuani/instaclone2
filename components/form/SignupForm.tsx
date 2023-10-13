"use client";

import Image from "next/image";
import Terms from "./Terms";
import SignUpWithGoogle from "./SignUpWithGoogle";
import FormDivider from "./FormDivider";

import { useSignUp } from "@clerk/nextjs";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { icons } from "@/constants";
import { cn } from "@/lib/utils";

const SignupForm = () => {
	const router = useRouter();

	const { signUp, isLoaded } = useSignUp();
	const [user, setUser] = useState({
		email: "",
		password: "",
		username: "",
		fullname: "",
	});

	const [isPending, startTransition] = useTransition();

	const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
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

				localStorage.setItem("userData", JSON.stringify(user));

				router.push("/signup/verify-email");
				toast.success("Check your email. We sent you a 6-digit verification code.");
			} catch (err: any) {
				err.errors.map((msg: { message: string }) => {
					toast.error(msg.message);
				});
			}
		});
	};

	return (
		<form
			method="post"
			onSubmit={handleSignUp}
			className="flex flex-col justify-center w-full mb-6 !mt-0 signin-form">
			<SignUpWithGoogle />

			<FormDivider />

			<section className="min-h-[38px] border border-transparent md:border-separator bg-secondary-background rounded-[3px] flex flex-col mx-10 mb-[6px] w-auto text-sm leading-normal relative">
				<label
					htmlFor="email"
					className={cn("form-label", user.email && "login-label")}>
					Email
				</label>

				<input
					className={cn("form-input", user.email && "login-input")}
					type="email"
					id="email"
					name="email"
					required
					autoComplete="true"
					value={user.email}
					onChange={(e) => setUser({ ...user, email: e.target.value })}
				/>
			</section>

			<section className="min-h-[38px] border border-separator-divider bg-secondary-background rounded-[3px] flex flex-col mx-10 mb-[6px] w-auto text-sm leading-normal relative">
				<label
					htmlFor="fullname"
					className={cn("form-label", user.fullname && "login-label")}>
					Full Name
				</label>

				<input
					className={cn("form-input", user.fullname && "login-input")}
					type="text"
					id="fullname"
					required
					name="fullname"
					maxLength={50}
					value={user.fullname}
					onChange={(e) => setUser({ ...user, fullname: e.target.value })}
				/>
			</section>

			<section className="min-h-[38px] border border-separator-divider bg-secondary-background rounded-[3px] flex flex-col mx-10 mb-[6px] w-auto text-sm leading-normal relative">
				<label
					htmlFor="username"
					className={cn("form-label", user.username && "login-label")}>
					Username
				</label>

				<input
					className={cn("form-input", user.username && "login-input")}
					type="text"
					id="username"
					required
					name="username"
					maxLength={50}
					spellCheck={false}
					value={user.username}
					onChange={(e) => setUser({ ...user, username: e.target.value })}
				/>
			</section>

			<section className="min-h-[38px] border border-separator-divider bg-secondary-background rounded-[3px] flex flex-col mx-10 mb-[6px] w-auto text-sm leading-normal relative">
				<label
					htmlFor="password"
					className={cn("form-label", user.password && "login-label")}>
					Password
				</label>

				<input
					type="password"
					id="password"
					required
					name="password"
					minLength={8}
					className={cn("form-input", user.password && "login-input")}
					value={user.password}
					onChange={(e) => setUser({ ...user, password: e.target.value })}
				/>
			</section>

			<Terms />

			<button
				disabled={isPending}
				className="!opacity-70 login-btn"
				type="submit">
				{isPending && (
					<Image
						className="mr-2 w-4 h-4 animate-spin"
						src={icons.spinner}
						alt="Loading spinner"
					/>
				)}
				Sign up
			</button>
		</form>
	);
};

export default SignupForm;
