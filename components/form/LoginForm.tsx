"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { useSignIn } from "@clerk/nextjs";
import { toast } from "react-hot-toast";

import { icons } from "@/constants";
import { cn } from "@/lib/utils";

const LoginForm = () => {
	const router = useRouter();
	const { signIn, setActive, isLoaded } = useSignIn();
	const [isPending, startTransition] = useTransition();

	const [showPassword, setShowPassword] = useState(false);
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isLoaded) return;

		startTransition(async () => {
			try {
				const result = await signIn.create({
					identifier: userName,
					password,
				});

				if (result.status === "complete") {
					await setActive({ session: result.createdSessionId });

					router.push(`${window.location.origin}/`);
				}
			} catch (err: any) {
				err.errors.map((msg: { message: string }) => {
					toast.error(msg.message);
				});
			}
		});
	};

	return (
		<form
			onSubmit={handleLogin}
			method="post"
			className="flex flex-col justify-center w-full mt-6">
			<section className="min-h-[38px] border border-separator-divider bg-secondary-background rounded-[3px] flex flex-col mx-10 mb-[6px] w-auto text-sm leading-normal relative">
				<label
					className={cn("form-label", userName.length > 0 && "login-label")}
					htmlFor="text">
					Username or email
				</label>

				<input
					type="text"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					id="text"
					name="text"
					autoComplete="true"
					className={cn("form-input", userName.length > 0 && "login-input")}
				/>
			</section>

			<section className="min-h-[38px] border border-separator-divider bg-secondary-background rounded-[3px] flex flex-col mx-10 mb-[6px] w-auto text-sm leading-normal relative">
				<label
					className={cn("form-label", password.length > 0 && "login-label")}
					htmlFor="password">
					Password
				</label>

				<input
					type={showPassword ? "text" : "password"}
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					name="password"
					className={cn("form-input", password.length > 0 && "login-input")}
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

			<button
				aria-disabled={isPending}
				type="submit"
				className="login-btn disabled:opacity-70 disabled:cursor-auto">
				{isPending && (
					<Image
						className="mr-2 w-4 h-4 animate-spin"
						src={icons.spinner}
						alt="Loading spinner"
					/>
				)}
				Log in
			</button>
		</form>
	);
};

export default LoginForm;
