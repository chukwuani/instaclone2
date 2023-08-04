"use client";

import Image from "next/image";
import { useSignUp } from "@clerk/nextjs";
import { type OAuthStrategy } from "@clerk/types";
import { toast } from "sonner";
import { icons } from "@/constants";

const SignUpWithGoogle = () => {
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
			error.errors.map((msg: { message: string }) => {
				toast.error(msg.message);
			});
		}
	};

	return (
		<button onClick={() => OAuthSignUp("oauth_google")} className="google-login-btn" type="button">
			<Image className="w-4 h-4 mr-2" src={icons.googleWithBg} alt="Google logo" />
			Log in with Google
		</button>
	);
};

export default SignUpWithGoogle;
