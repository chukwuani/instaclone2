"use client";
// million-ignore
import Image from "next/image";
import { icons } from "@/constants";
import MobileStats from "@/components/MobileStats";
import ProfileMenu from "@/components/profile/ProfileMenu";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
	DocumentData,
	arrayRemove,
	arrayUnion,
	doc,
	onSnapshot,
	updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { firestore } from "@/firebase/firebaseConfig";
import { cn } from "@/lib/utils";

interface ProfileTopProps {
	user: DocumentData;
	postNumber: number;
	showFollow: boolean;
	loggedInUserId: string | undefined;
}

const ProfileTop = ({ user, postNumber, showFollow, loggedInUserId }: ProfileTopProps) => {
	const [followers, setFollowers] = useState<string[]>(user?.followers);
	const [isFollower, setIsFollower] = useState(followers.includes(loggedInUserId as string));

	const following = user?.following;
	const isFollowing = following.includes(loggedInUserId as string);

	const handleFollow = async () => {
		const userRef = doc(firestore, "users", user?.userId);
		const currentUserRef = doc(firestore, "users", loggedInUserId as string);

		if (isFollower) {
			setIsFollower(false);
			await updateDoc(userRef, {
				followers: arrayRemove(loggedInUserId as string),
			});

			await updateDoc(currentUserRef, {
				following: arrayRemove(user?.userId),
			});
		} else {
			setIsFollower(true);
			await updateDoc(userRef, {
				followers: arrayUnion(loggedInUserId as string),
			});

			await updateDoc(currentUserRef, {
				following: arrayUnion(user?.userId),
			});
		}

		onSnapshot(doc(firestore, "users", user?.userId), (doc) => {
			setFollowers(doc.data()?.followers);
		});
	};

	return (
		<>
			<section className="user-profile-head-container">
				<span className="user-profile-picture">
					<Image
						src={user?.imageUrl ?? "/images/placeholder.png"}
						width={150}
						height={150}
						alt="Profile Photo"
						title="Profile Photo"
					/>
				</span>

				<section className="flex flex-col basis-[30px] gap-5 grow-[2] max-w-[613px] w-full">
					<section className="flex items-center max-md:flex-col max-md:items-start max-md:gap-3">
						<section className="lowercase flex items-center gap-[5px]">
							<h1 className="font-normal h-min text-xl">{user?.username}</h1>

							{user?.isVerified && (
								<Image
									src={icons.verifiedBadge}
									width={18}
									height={18}
									alt="User is verified badge"
									className="ml-2"
								/>
							)}

							{showFollow ? (
								<Dialog>
									<DialogTrigger asChild>
										<button className="p-2 icons cursor-pointer hidden max-[768px]:flex">
											<Image
												src={icons.dotMenu}
												alt="gear icon"
												className="w-8 h-8"
											/>
										</button>
									</DialogTrigger>

									<DialogContent className="p-0">
										<ProfileMenu />
									</DialogContent>
								</Dialog>
							) : (
								<Dialog>
									<DialogTrigger asChild>
										<button className="p-2 icons cursor-pointer hidden max-[768px]:flex">
											<Image
												src={icons.gear}
												alt="gear icon"
											/>
										</button>
									</DialogTrigger>

									<DialogContent className="p-0">
										<ProfileMenu />
									</DialogContent>
								</Dialog>
							)}
						</section>

						{showFollow ? (
							<button
								className={cn(
									isFollower
										? "edit-profile"
										: isFollowing
										? "!bg-primary-button !text-white edit-profile"
										: "!bg-primary-button !text-white edit-profile"
								)}
								onClick={handleFollow}>
								{isFollower ? "Unfollow" : isFollowing ? "Follow Back" : "Follow"}
							</button>
						) : (
							<Link
								className="edit-profile"
								href="#">
								Edit profile
							</Link>
						)}

						{showFollow ? (
							<Dialog>
								<DialogTrigger asChild>
									<button className="p-2 cursor-pointer icons max-[768px]:hidden">
										<Image
											src={icons.dotMenu}
											alt="gear icon"
											className="w-8 h-8"
										/>
									</button>
								</DialogTrigger>

								<DialogContent className="p-0">
									<ProfileMenu />
								</DialogContent>
							</Dialog>
						) : (
							<Dialog>
								<DialogTrigger asChild>
									<button className="p-2 cursor-pointer icons max-[768px]:hidden">
										<Image
											src={icons.gear}
											alt="gear icon"
										/>
									</button>
								</DialogTrigger>

								<DialogContent className="p-0">
									<ProfileMenu />
								</DialogContent>
							</Dialog>
						)}
					</section>

					<article className="profile-stats-2">
						<p>
							<a
								className="cursor-auto"
								href="#">
								{postNumber}
							</a>{" "}
							{postNumber === 0 ? "posts" : postNumber === 1 ? "post" : "posts"}
						</p>

						<p>
							<a href="#">{followers?.length}</a>{" "}
							{followers.length === 0
								? "followers"
								: followers.length === 1
								? "follower"
								: "followers"}
						</p>

						<p>
							<a href="#">{following?.length}</a> following
						</p>
					</article>

					<article className="hidden md:flex flex-col leading-7">
						<span className="flex items-center gap-3">
							<p className="name">{user?.name}</p>
							{isFollowing && (
								<p className="text-xs text-secondary-text font-medium">Follows you</p>
							)}
						</span>

						<p>{user?.bio}</p>
					</article>
				</section>
			</section>

			<MobileStats
				postNumber={postNumber}
				user={user}
				followers={followers}
				following={following}
				isFollowing={isFollowing}
			/>
		</>
	);
};

export default ProfileTop;
