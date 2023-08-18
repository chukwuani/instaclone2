import { useUser } from "@clerk/nextjs";
import React from "react";

const MobileStats = () => {
	const { user } = useUser();
	return (
		<>
			<div className="mobile-stats-one">
				<p className="name">
					{user?.firstName} {user?.lastName}
				</p>
				<span className="bio">
					<p>
						I&apos;m a mysterious individual who has yet to fill out my bio. One thing&apos;s for
						certain: I will fill it out one day!
					</p>
				</span>
			</div>

			<div className="mobile-stats-two">
				<p>
					<a
						className="number-post"
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
