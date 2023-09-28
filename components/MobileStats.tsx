import { useUser } from "@clerk/nextjs";
import React from "react";

const MobileStats = () => {
	const { user } = useUser();
	return (
		<>
			<article className="flex flex-col p-5 pt-0 text-sm text-primary-text md:hidden">
				<p className="name">
					{user?.firstName ?? "no"} {user?.lastName ?? "name"}
				</p>

				<p>
					I&apos;m a mysterious individual who has yet to fill out my bio. One thing&apos;s for
					certain: I will fill it out one day!
				</p>
			</article>

			<div className="mobile-stats-two">
				<p>
					<a
						className="cursor-auto"
						href="#">
						0
					</a>
					posts
				</p>
				<p>
					<a href="#">0</a> followers
				</p>
				<p>
					<a href="#">0</a> following
				</p>
			</div>
		</>
	);
};

export default MobileStats;
