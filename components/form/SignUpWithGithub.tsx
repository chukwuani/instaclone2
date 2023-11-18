"use client";

import Image from "next/image";

import { useSignUp } from "@clerk/nextjs";
import { type OAuthStrategy } from "@clerk/types";

import { icons } from "@/constants";
import { toast } from "react-hot-toast";

const SignUpWithGithub = () => {
	const { signUp, isLoaded } = useSignUp();

	const OAuthSignUp = async (provider: OAuthStrategy) => {
		if (!isLoaded) return null;

		try {
			await signUp.authenticateWithRedirect({
				strategy: provider,
				redirectUrl: "/sso-callback",
				redirectUrlComplete: "/",
			});
		} catch (error: any) {
			error?.errors?.map((msg: { message: string }) => {
				toast.error(msg.message);
			});
		}
	};

	return (
		<button
			onClick={() => OAuthSignUp("oauth_github")}
			className="google-login-btn"
			type="button">
			<Image
				className="w-4 h-4 mr-2"
				src={icons.github}
				alt="github logo"
			/>
			Sign up with Github
		</button>
	);
};

export default SignUpWithGithub;
