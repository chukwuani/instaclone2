"use client";

import { icons } from "@/constants";
import { cn } from "@/lib/utils";
import { useSignUp } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

const VerifyForm = () => {
	const router = useRouter();
	const { isLoaded, signUp, setActive } = useSignUp();
	const [isPending, startTransition] = useTransition();

	const [code, setCode] = useState("");

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!isLoaded) return;

		startTransition(async () => {
			try {
				const completeSignUp = await signUp.attemptEmailAddressVerification({
					code,
				});
				if (completeSignUp.status !== "complete") {
					/*  investigate the response, to see if there was an error
             or if the user needs to complete more steps.*/
					toast(JSON.stringify(completeSignUp, null, 2));
				}
				if (completeSignUp.status === "complete") {
					await setActive({ session: completeSignUp.createdSessionId });

					router.push(`${window.location.origin}/`);
					localStorage.removeItem("userData");
				}
			} catch (err: any) {
				err.errors.map((msg: { message: string }) => {
					toast.error(msg.message);
				});
			}
		});
	}

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col justify-center w-full">
				<section className="min-h-[38px] border border-separator-divider bg-secondary-background rounded-[3px] flex flex-col mx-10 mb-[6px] w-auto text-sm leading-normal relative">
					<label
						className={cn("form-label", code && "login-label")}
						htmlFor="number">
						Confirmation Code
					</label>

					<input
						type="text"
						id="code"
						name="code"
						maxLength={8}
						minLength={6}
						autoComplete="false"
						className={cn("form-input", code && "login-input")}
						value={code}
						onChange={(e) => setCode(e.target.value)}
					/>
				</section>

				<button
					disabled={isPending}
					type="submit"
					className="login-btn">
					{isPending && (
						<Image
							className="mr-2 w-4 h-4 animate-spin"
							src={icons.spinner}
							alt="Loading spinner"
						/>
					)}
					Next
				</button>
			</form>
			<button
				onClick={router.back}
				className="mt-4 mb-2 text-sm text-primary-button font-semibold hover:text-link">
				Go Back
			</button>
		</>
	);
};

export default VerifyForm;
