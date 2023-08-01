"use client";

import Terms from "./Terms";
import Image from "next/image";

import { icons } from "@/constants";
import { useState } from "react";

const SignupForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const [userName, setUserName] = useState("");

	const handleSignUp = async () => {
		console.log("Doing stuff");
	};

	return (
		<form
			method="post"
			onSubmit={handleSignUp}
			className="flex flex-col justify-center w-full mb-6 !mt-0 signin-form">
			<button className="google-login-btn" type="button">
				<Image className="w-4 h-4 mr-2" src={icons.googleWithBg} alt="Google logo" />
				Log in with Google
			</button>

			<div className="or-seperator">
				<div className="left-seperator" />
				<p>OR</p>
				<div className="right-seperator" />
			</div>

			<div className="form-col">
				<label htmlFor="email" className={email.length > 0 ? "login-label" : undefined}>
					Email
				</label>
				<input
					className={email.length > 0 ? "login-input" : undefined}
					type="email"
					id="email"
					name="email"
					required
					autoComplete="true"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>

			<div className="form-col">
				<label htmlFor="fullname" className={fullName.length > 0 ? "login-label" : undefined}>
					Full Name
				</label>
				<input
					className={fullName.length > 0 ? "login-input" : undefined}
					type="text"
					id="fullname"
					required
					name="fullname"
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
				/>
			</div>

			<div className="form-col">
				<label htmlFor="username" className={userName.length > 0 ? "login-label" : undefined}>
					Username
				</label>
				<input
					className={userName.length > 0 ? "login-input" : undefined}
					type="text"
					id="username"
					required
					name="username"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
			</div>

			<div className="form-col">
				<label htmlFor="password" className={password.length > 0 ? "login-label" : undefined}>
					Password
				</label>
				<input
					className={password.length > 0 ? "login-input" : undefined}
					type="password"
					id="password"
					required
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			<Terms />

			<button className="!opacity-70" type="submit">
				Sign up
			</button>
		</form>
	);
};

export default SignupForm;
