"use client";

import Image from "next/image";
import { useSignIn } from "@clerk/nextjs";
import { type OAuthStrategy } from "@clerk/types";
import { toast } from "react-hot-toast";
import { icons } from "@/constants";

const LoginWithGithub = () => {
	const { signIn, isLoaded } = useSignIn();

	const OAuthSignIn = async (provider: OAuthStrategy) => {
		if (!isLoaded) return null;
		try {
			await signIn.authenticateWithRedirect({
				strategy: provider,
				redirectUrl: "/sso-callback",
				redirectUrlComplete: "/",
			});
		} catch (error: any) {
			console.error(error);
			error.errors.map((msg: { message: string }) => {
				toast.error(msg.message);
			});
		}
	};
	return (
		<button
			onClick={() => OAuthSignIn("oauth_github")}
			className="flex items-center justify-center font-semibold text-sm text-link">
			<Image
				className="w-4 h-4 mr-2 icons"
				src={icons.github}
				alt="github logo"
			/>
			Log in with Github
		</button>
	);
};

export default LoginWithGithub;
