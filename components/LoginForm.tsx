"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginForm = () => {
	const router = useRouter();
	const { signIn, setActive, isLoaded } = useSignIn();
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
			} else {
				/*Investigate why the login hasn't completed */
				console.log(result);
			}
		} catch (err: any) {
			err.errors.map((msg: { message: string }) => {
				toast.error(msg.message);
			});
		}
	};

	return (
		<form onSubmit={handleLogin} method="post" className="signin-form">
			<section className="form-col">
				<label className={userName.length > 0 ? "login-label" : undefined} htmlFor="text">
					Username or email
				</label>

				<input
					type="text"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					id="text"
					name="text"
					autoComplete="true"
					className={userName.length > 0 ? "login-input" : undefined}
				/>
			</section>

			<section className="form-col">
				<label className={password.length > 0 ? "login-label" : undefined} htmlFor="password">
					Password
				</label>

				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					name="password"
					className={password.length > 0 ? "login-input" : undefined}
				/>
			</section>

			<button type="submit">Log in</button>
		</form>
	);
};

export default LoginForm;
