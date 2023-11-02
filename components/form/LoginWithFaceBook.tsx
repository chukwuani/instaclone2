"use client";

import Image from "next/image";
import { useSignIn } from "@clerk/nextjs";
import { type OAuthStrategy } from "@clerk/types";
import { toast } from "react-hot-toast";
import { icons } from "@/constants";

const LoginWithFaceBook = () => {
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
			onClick={() => OAuthSignIn("oauth_facebook")}
			className="flex items-center justify-center font-semibold text-sm text-link">
			<svg
				className="w-4 h-4 mr-2 bg-[#4460A0] rounded-[1.5px]"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				id="facebook"
				aria-label="Facebook logo">
				<path
					className="translate-x-[3px] translate-y-[2px]"
					fill="#fff"
					d="M13.355 22v-9.123h3.062l.459-3.555h-3.52v-2.27c0-1.03.285-1.731 1.761-1.731L17 5.32V2.14A25.233 25.233 0 0 0 14.257 2c-2.715 0-4.573 1.657-4.573 4.7v2.622h-3.07v3.555h3.07V22h3.671Z"
					data-name="Facebook Brand Logo"></path>
			</svg>
			Log in with Facebook
		</button>
	);
};

export default LoginWithFaceBook;
