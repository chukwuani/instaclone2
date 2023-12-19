import React from "react";
import { useProfileTopContext } from "./profile/ProfileTop";

const MobileStats = () => {
	const { isFollowing, user, postNumber, followers, following } = useProfileTopContext();
	return (
		<>
			<article className="flex flex-col p-5 pt-0 text-sm text-primary-text md:hidden">
				<span className="flex items-center gap-3">
					<p className="name">{user?.name}</p>
					{isFollowing && <p className="text-xs text-secondary-text font-medium">Follows you</p>}
				</span>

				<p>{user?.bio}</p>
			</article>

			<div className="mobile-stats-two">
				<p>
					<a
						className="cursor-auto"
						href="#">
						{postNumber}
					</a>
					posts
				</p>
				<p>
					<a href="#">{followers?.length}</a>{" "}
					{followers.length === 0 ? "followers" : followers.length === 1 ? "follower" : "followers"}
				</p>
				<p>
					<a href="#">{following?.length}</a> following
				</p>
			</div>
		</>
	);
};

export default MobileStats;
