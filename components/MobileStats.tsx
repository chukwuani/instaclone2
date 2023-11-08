import { DocumentData } from "firebase/firestore";
import React from "react";

interface MobileStatsProps {
	user: DocumentData;
	following: DocumentData;
	followers: DocumentData;
	postNumber: number;
	isFollowing: boolean;
}

const MobileStats = ({ postNumber, user, followers, following, isFollowing }: MobileStatsProps) => {
	return (
		<>
			<article className="flex flex-col p-5 pt-0 text-sm text-primary-text md:hidden">
				<span className="flex items-center gap-3">
					<p className="name">
						{user?.firstName} {user?.lastName ?? ""}
					</p>
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
