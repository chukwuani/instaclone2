"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
	const router = useRouter();
	return (
		<main className="main-content max-md:!absolute h-full items-center justify-center">
			<header className="md:hidden h-11 border-b flex items-center justify-center px-4 border-separator-elevated w-full fixed top-0 right-0">
				<button
					onClick={() => router.back()}
					className="icons absolute left-4 -rotate-90">
					<svg
						aria-label="Back"
						color="black"
						fill="black"
						height="24"
						role="img"
						viewBox="0 0 24 24"
						width="24">
						<title>Back</title>
						<path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
					</svg>
				</button>

				<p className="font-semibold">Notifications</p>
			</header>
			<article className="max-w-[600px] w-full flex-auto flex flex-col items-center justify-center gap-4 py-5 px-10 text-center">
				<span className="notification-bg" />
				<p className="text-secondary-text text-sm">Activity On Your Posts</p>
				<p className="text-secondary-text text-sm max-w-[300px]">
					When someone likes or comments on one of your posts, you&apos;ll see it here.
				</p>
			</article>
		</main>
	);
};

export default Page;
