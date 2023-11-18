"use client";
import Image from "next/image";
import Link from "next/link";

import { DocumentData, arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "@/firebase/firebaseConfig";
import { cn } from "@/lib/utils";

type SuggestedCardProps = {
	user: DocumentData;
	loggedInUserId: string | undefined;
};

const SuggestedCard = ({ user, loggedInUserId }: SuggestedCardProps) => {
	const [followText, setFollowText] = useState("Follow");
	const [followed, setFollowed] = useState(false);

	const handleFollow = async () => {
		const userRef = doc(firestore, "users", user?.userId);
		const currentUserRef = doc(firestore, "users", loggedInUserId as string);

		if (followed) {
			await updateDoc(userRef, {
				followers: arrayRemove(loggedInUserId as string),
			});

			await updateDoc(currentUserRef, {
				following: arrayRemove(user?.userId),
			});

			setFollowed(false);
			setFollowText("Follow");
		} else {
			await updateDoc(userRef, {
				followers: arrayUnion(loggedInUserId as string),
			});

			await updateDoc(currentUserRef, {
				following: arrayUnion(user?.userId),
			});

			setFollowed(true);
			setFollowText("Following");
		}
	};

	return (
		<section className="flex items-center py-2 px-4">
			<Link href={`${user?.username}`}>
				<Image
					className="rounded-full object-cover mr-3 bg-highlight cursor-pointer"
					src={user?.imageUrl}
					alt="avatar"
					width={44}
					height={44}
					quality={100}
				/>
			</Link>

			<article className="ml-3 flex-auto flex flex-col text-sm">
				<Link
					className="font-semibold"
					href={`${user?.username}`}>
					{user?.username}
				</Link>

				<p className="text-[12px] text-secondary-text font-normal">Suggested for you</p>
			</article>

			<button
				className={cn(
					"text-[12px] ml-2 no-underline capitalize text-primary-button hover:text-link transition-colors duration-300 font-semibold",
					followed && "text-link hover:opacity-50"
				)}
				onClick={handleFollow}>
				{followText}
			</button>
		</section>
	);
};

export default SuggestedCard;
