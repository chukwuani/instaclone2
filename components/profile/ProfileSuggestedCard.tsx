import Image from "next/image";
import React from "react";

import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebaseConfig";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UserType, useProfileTopContext } from "./ProfileTop";

const ProfileSuggestedCard = ({ suggestion }: { suggestion: UserType }) => {
	const { loggedInUserId: id, user, setFollowing } = useProfileTopContext();
	const [followText, setFollowText] = React.useState("Follow");
	const [followed, setFollowed] = React.useState(false);

	const handleFollow = async () => {
		const userRef = doc(firestore, "users", suggestion?.userId);
		const currentUserRef = doc(firestore, "users", id);

		if (followed) {
			await updateDoc(userRef, {
				followers: arrayRemove(id),
			});

			await updateDoc(currentUserRef, {
				following: arrayRemove(suggestion?.userId),
			});

			setFollowed(false);
			setFollowText("Follow");
		} else {
			await updateDoc(userRef, {
				followers: arrayUnion(id),
			});

			await updateDoc(currentUserRef, {
				following: arrayUnion(suggestion?.userId),
			});

			setFollowed(true);
			setFollowText("Following");
		}

		onSnapshot(doc(firestore, "users", user?.userId), (doc) => {
			setFollowing(doc.data()?.following);
		});
	};

	return (
		<li className="min-w-[160px] p-4 md:p-5 flex flex-col items-center justify-center bg-primary-background rounded border-separator-elevated border">
			<Image
				src={suggestion?.imageUrl ?? "/images/placeholder.png"}
				alt={suggestion?.name}
				width={77}
				height={77}
				className="rounded-full md:w-[54px] md:h-[54px] mb-2 md:mb-5"
			/>
			<Link
				href={suggestion.username}
				className="text-sm font-semibold text-primary-text pt-[6px] overflow-ellipsis whitespace-nowrap w-full overflow-hidden text-center">
				{suggestion?.username}
			</Link>
			<p className="py-1 text-sm text-secondary-text  overflow-ellipsis whitespace-nowrap w-full overflow-hidden text-center">
				{suggestion?.name}
			</p>

			<button
				onClick={handleFollow}
				className={cn(
					"max-w-[200px] w-full flex items-center justify-center font-semibold text-sm rounded-[8px] py-[7px] px-4 text-white bg-primary-button hover:bg-hover-primary-button",
					followed &&
						"text-primary-text bg-secondary-button-background hover:bg-hover-secondary-button"
				)}>
				{followText}
			</button>
		</li>
	);
};

export default ProfileSuggestedCard;
