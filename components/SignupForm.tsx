"use client";

import Terms from "./Terms";
import Image from "next/image";
import { toast } from "sonner";
import { useSignUp } from "@clerk/nextjs";
import { icons } from "@/constants";
import { useState } from "react";
import { useRouter } from "next/navigation";

import SignUpWithGoogle from "./SignUpWithGoogle";
import FormDivider from "./FormDivider";

const SignupForm = () => {
	const router = useRouter();
	const { signUp, setActive, isLoaded } = useSignUp();
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const [userName, setUserName] = useState("");

	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!isLoaded) return;

		try {
			const result = await signUp?.create({
				emailAddress: email,
				password: password,
				username: userName,
				firstName: fullName.split(" ")[0],
				lastName: fullName.split(" ")[1],
			});

			setLoading(true);

			if (result?.status === "complete") {
				await setActive({ session: result.createdSessionId });

				router.push(`${window.location.origin}/`);
			} else {
				/*Investigate why the login hasn't completed */
				console.log(result);
			}
		} catch (err: any) {
			setLoading(false);
			err.errors.map((msg: { message: string }) => {
				toast.error(msg.message);
			});
		}
	};

	return (
		<form
			method="post"
			onSubmit={handleSignUp}
			className="flex flex-col justify-center w-full mb-6 !mt-0 signin-form">
			<SignUpWithGoogle />

			<FormDivider />

			<section className="min-h-[38px] divider secondary-bg rounded-[3px] flex flex-col mx-10 mb-[6px] w-auto text-sm leading-normal relative">
				<label
					htmlFor="email"
					className={email.length > 0 ? "login-label form-label" : "form-label"}>
					Email
				</label>

				<input
					className={email.length > 0 ? "login-input form-input" : "form-input"}
					type="email"
					id="email"
					name="email"
					required
					autoComplete="true"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</section>

			<section className="min-h-[38px] divider secondary-bg rounded-[3px] flex flex-col mx-10 mb-[6px] w-auto text-sm leading-normal relative">
				<label
					htmlFor="fullname"
					className={fullName.length > 0 ? "login-label form-label" : "form-label"}>
					Full Name
				</label>
				<input
					className={fullName.length > 0 ? "login-input form-input" : "form-input"}
					type="text"
					id="fullname"
					required
					name="fullname"
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
				/>
			</section>

			<section className="min-h-[38px] divider secondary-bg rounded-[3px] flex flex-col mx-10 mb-[6px] w-auto text-sm leading-normal relative">
				<label
					htmlFor="username"
					className={userName.length > 0 ? "login-label form-label" : "form-label"}>
					Username
				</label>
				<input
					className={userName.length > 0 ? "login-input form-input" : "form-input"}
					type="text"
					id="username"
					required
					name="username"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
			</section>

			<section className="min-h-[38px] divider secondary-bg rounded-[3px] flex flex-col mx-10 mb-[6px] w-auto text-sm leading-normal relative">
				<label
					htmlFor="password"
					className={password.length > 0 ? "login-label form-label" : "form-label"}>
					Password
				</label>
				<input
					className={password.length > 0 ? "login-input form-input" : "form-input"}
					type="password"
					id="password"
					required
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</section>

			<Terms />

			<button className="!opacity-70 login-btn" type="submit">
				{loading && (
					<Image className="mr-2 w-4 h-4 animate-spin" src={icons.spinner} alt="Google-logo" />
				)}
				Sign up
			</button>
		</form>
	);
};

export default SignupForm;
