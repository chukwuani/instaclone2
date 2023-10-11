"use client";
import Image from "next/image";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { icons } from "@/constants";
import { cn } from "@/lib/utils";

const LoginForm = () => {
	const router = useRouter();
	const { signIn, setActive, isLoaded } = useSignIn();
	const [loading, setLoading] = useState(false);
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isLoaded) return;
		try {
			const result = await signIn.create({
				identifier: userName,
				password,
			});

			if (result.status === "complete") {
				await setActive({ session: result.createdSessionId });

				router.push(`${window.location.origin}/`);
			}

			setLoading(true);
		} catch (err: any) {
			setLoading(false);
			err.errors.map((msg: { message: string }) => {
				toast.error(msg.message);
			});
		}
	};

	return (
		<form
			onSubmit={handleLogin}
			method="post"
			className="flex flex-col justify-center w-full mt-6">
			<section className="min-h-[38px] border border-transparent md:border-separator bg-secondary-background rounded-[3px] flex flex-col mx-10 mb-[6px] w-auto text-sm leading-normal relative">
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
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					name="password"
					className={cn("form-input", password.length > 0 && "login-input")}
				/>
			</section>

			<button
				disabled={loading}
				type="submit"
				className="login-btn">
				{loading && (
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
