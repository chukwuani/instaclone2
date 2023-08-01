"use client";
import { useState } from "react";

const LoginForm = () => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	return (
		<form method="post" className="signin-form">
			<div className="form-col">
				<label className={userName.length > 0 ? "login-label" : undefined} htmlFor="email">
					Username or email
				</label>

				<input
					type="email"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					id="email"
					name="email"
					autoComplete="true"
					className={userName.length > 0 ? "login-input" : undefined}
				/>
			</div>

			<div className="form-col">
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
			</div>

			<button type="submit">Log in</button>
		</form>
	);
};

export default LoginForm;
