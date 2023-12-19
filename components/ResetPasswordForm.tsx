"use client";
import React, { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ResetPasswordForm = () => {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");

	const [successfulCreation, setSuccessfulCreation] = useState(false);
	const [complete, setComplete] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const { signIn, setActive } = useSignIn();

	async function create(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		await signIn
			?.create({
				strategy: "reset_password_email_code",
				identifier: email,
			})
			.then((_) => {
				setSuccessfulCreation(true);
				toast.success("Check your email. We sent you a 6-digit reset code.");
			})
			.catch((err) =>
				err?.errors?.map((msg: { message: string }) => {
					toast.error(msg.message);
				})
			);
	}

	async function reset(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		await signIn
			?.attemptFirstFactor({
				strategy: "reset_password_email_code",
				code,
				password,
			})
			.then((result) => {
				if (result.status === "needs_second_factor") {
					toast.success("Complete the multi factor authentication.");
				} else if (result.status === "complete") {
					setActive({ session: result.createdSessionId });
					setComplete(true);
					toast.success("Password reset successfully.");
					router.push("/login");
				} else {
					console.log(result);
				}
			})
			.catch((err) =>
				err?.errors?.map((msg: { message: string }) => {
					toast.error(msg.message);
				})
			);
	}

	return (
		<form
			className="flex flex-col justify-center w-full"
			onSubmit={!successfulCreation ? create : reset}>
			{!successfulCreation && !complete && (
				<>
					<section className="min-h-[38px] border border-separator-divider bg-secondary-background rounded-[3px] flex flex-col mx-10 mb-[6px] w-auto text-sm leading-normal relative">
						<label
							className={cn("form-label", email && "login-label")}
							htmlFor="email">
							e.g john@doe.com
						</label>

						<input
							type="email"
							id="email"
							className={cn("form-input", email && "login-input")}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</section>

					<button
						type="submit"
						className="login-btn disabled:opacity-70 disabled:cursor-auto">
						Next
					</button>

					<button
						type="button"
						onClick={router.back}
						className="mt-4 mb-2 text-sm text-primary-button font-semibold hover:text-link">
						Go Back
					</button>
				</>
			)}

			{successfulCreation && (
				<>
					<section className="min-h-[38px] border border-separator-divider bg-secondary-background rounded-[3px] flex flex-col mx-10 mb-[6px] w-auto text-sm leading-normal relative">
						<label
							className={cn("form-label", password && "login-label")}
							htmlFor="password">
							New password
						</label>

						<input
							type={showPassword ? "text" : "password"}
							id="password"
							autoComplete="new-password"
							className={cn("form-input", password && "login-input")}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						{password.length > 0 && (
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-0 top-0 text-[10px] text-primary-text bg-secondary-background h-full p-2 font-semibold">
								{showPassword ? "HIDE" : "SHOW"}
							</button>
						)}
					</section>

					<section className="min-h-[38px] border border-separator-divider bg-secondary-background rounded-[3px] flex flex-col mx-10 mb-[6px] w-auto text-sm leading-normal relative">
						<label
							className={cn("form-label", code && "login-label")}
							htmlFor="code">
							Reset password code
						</label>

						<input
							type="text"
							id="code"
							className={cn("form-input", code && "login-input")}
							value={code}
							onChange={(e) => setCode(e.target.value)}
						/>
					</section>

					<button
						type="submit"
						className="login-btn mb-2 disabled:opacity-70 disabled:cursor-auto">
						Reset Password
					</button>
				</>
			)}
		</form>
	);
};

export default ResetPasswordForm;
