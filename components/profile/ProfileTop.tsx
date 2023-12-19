"use client";

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
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { firestore } from "@/firebase/firebaseConfig";
import { cn } from "@/lib/utils";
import ProfileSuggested from "./ProfileSuggested";

export type UserType = {
	bio: string;
	createdAt: {
		seconds: number;
		nanoseconds: number;
	};
	followers: string[];
	following: string[];
	imageUrl: string;
	isVerified: boolean;
	name: string;
	username: string;
	userId: string;
};

interface ProfileTopProps {
	user: UserType;
	profileSuggestion: UserType[];
	postNumber: number;
	showFollow: boolean;
	loggedInUserId: string;
}

interface ProfileTopContextType {
	user: UserType;
	suggestion: UserType[];
	postNumber: number;
	showFollow: boolean;
	loggedInUserId: string;
	followers: string[];
	following: string[];
	isFollowing: boolean;
	setFollowing: Dispatch<SetStateAction<string[]>>;
}

const profileTopContext = createContext<ProfileTopContextType | null>(null);

const ProfileTop = ({
	user,
	profileSuggestion,
	postNumber,
	showFollow,
	loggedInUserId,
}: ProfileTopProps) => {
	const suggestion = profileSuggestion.filter((item) => item.username !== user.username);
	const [openSuggestion, setOpenSuggestion] = useState(false);

	const [followers, setFollowers] = useState<string[]>(user?.followers);

	const [isFollower, setIsFollower] = useState(followers.includes(loggedInUserId));

	const [following, setFollowing] = useState(user?.following);
	const isFollowing = following.includes(loggedInUserId);

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
		<profileTopContext.Provider
			value={{
				user,
				suggestion,
				postNumber,
				showFollow,
				loggedInUserId,
				followers,
				following,
				isFollowing,
				setFollowing,
			}}>
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

							<Dialog>
								<DialogTrigger asChild>
									<button className="p-2 icons cursor-pointer hidden max-[768px]:flex">
										<Image
											src={showFollow ? icons.dotMenu : icons.gear}
											alt={showFollow ? "Dot menu" : "gear icon"}
											className={cn(showFollow && "w-8 h-8")}
										/>
									</button>
								</DialogTrigger>

								<DialogContent className="p-0">
									<ProfileMenu />
								</DialogContent>
							</Dialog>
						</section>

						<section className="flex w-auto items-center">
							{showFollow ? (
								<>
									<button
										className={cn(
											isFollower
												? "edit-profile"
												: isFollowing
												? "!bg-primary-button !text-white edit-profile"
												: "!bg-primary-button !text-white edit-profile"
										)}
										onClick={handleFollow}>
										{isFollower ? "Following" : isFollowing ? "Follow Back" : "Follow"}
									</button>

									<button className="!ml-2 !mr-0 !w-fit edit-profile flex items-center justify-center">
										Message
									</button>
								</>
							) : (
								<Link
									className="edit-profile"
									href="#">
									Edit profile
								</Link>
							)}

							<button
								onClick={() => setOpenSuggestion(!openSuggestion)}
								className="!p-2 !rounded-[8px] !ml-2 !mr-0 !w-fit edit-profile flex items-center justify-center">
								<Image
									className="max-w-none icons"
									src={openSuggestion ? "/icons/userFilled.svg" : "/icons/user.svg"}
									width={16}
									height={16}
									alt=""
								/>
							</button>

							<Dialog>
								<DialogTrigger asChild>
									<button className="p-2 cursor-pointer icons max-[768px]:hidden">
										<Image
											src={showFollow ? icons.dotMenu : icons.gear}
											alt={showFollow ? "dot menu" : "gear icon"}
											className={cn(showFollow && "w-8 h-8")}
										/>
									</button>
								</DialogTrigger>

								<DialogContent className="p-0">
									<ProfileMenu />
								</DialogContent>
							</Dialog>
						</section>
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

			<section className={cn("hidden", openSuggestion && "flex")}>
				<ProfileSuggested
					options={{
						slidesToScroll: "auto",
					}}
				/>
			</section>

			<MobileStats />
		</profileTopContext.Provider>
	);
};

export default ProfileTop;

export const useProfileTopContext = () => {
	const context = useContext(profileTopContext);

	if (!context) {
		throw new Error("useProfileToptContext must be used within a profileTopContextProvider");
	}

	return context;
};
