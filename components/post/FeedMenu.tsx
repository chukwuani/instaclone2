"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import Link from "next/link";
import toast from "react-hot-toast";

import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction, useState } from "react";
import { firestore } from "@/firebase/firebaseConfig";

import { useRouter } from "next/navigation";
import { usePostContext } from "./PostCard";

type FeedMenuProps = {
	setOpen: Dispatch<SetStateAction<boolean>>;
};

const FeedMenu = ({ setOpen }: FeedMenuProps) => {
	const {
		post: { creatorId, id: postId },
		userId,
		isFollowingCreator,
		isUserPost,
	} = usePostContext();

	const router = useRouter();
	const [Following, setFollowing] = useState(isFollowingCreator);

	const handleFollow = async () => {
		const userRef = doc(firestore, "users", creatorId);
		const currentUserRef = doc(firestore, "users", userId);

		if (Following) {
			await updateDoc(userRef, {
				followers: arrayRemove(userId),
			});

			await updateDoc(currentUserRef, {
				following: arrayRemove(creatorId),
			});

			setFollowing(false);
		} else {
			await updateDoc(userRef, {
				followers: arrayUnion(userId),
			});

			await updateDoc(currentUserRef, {
				following: arrayUnion(creatorId),
			});

			setFollowing(true);
		}

		router.refresh();
	};

	const copyLink = () => {
		navigator.clipboard
			.writeText(`${window.origin}/post/${postId}`)
			.then(() => {
				toast.success("Link copied to clipboard");
			})
			.catch(() => {
				toast.error("Link not copied to clipboard");
			});
	};

	return (
		<section className="bg-banner w-[400px] max-h-[100vh - 40px] rounded-xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden max-[500px]:w-[260px]">
			<section className="flex flex-col">
				{isUserPost ? (
					<>
						<DialogClose asChild>
							<button
								onClick={() => setOpen(true)}
								className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 font-bold text-destructive border-t-0"
								type="button">
								Delete
							</button>
						</DialogClose>

						<Link
							className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 border-t"
							href="#">
							Edit
						</Link>
					</>
				) : (
					<>
						<Link
							className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 font-bold text-destructive border-t-0"
							href="#">
							Report
						</Link>

						<button
							className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 font-bold text-destructive border-t"
							onClick={handleFollow}>
							{Following ? "Unfollow" : "Follow"}
						</button>
					</>
				)}

				<Link
					className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 border-t"
					href={`${window.origin}/post/${postId}`}>
					Go to post
				</Link>

				<DialogClose asChild>
					<button
						className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 border-t"
						onClick={copyLink}>
						Copy link
					</button>
				</DialogClose>

				<Link
					className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 border-t"
					href="https://www.buymeacoffee.com/chukwuanise">
					Buy me a coffee
				</Link>

				<DialogClose asChild>
					<button
						className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 border-t"
						type="button">
						Cancel
					</button>
				</DialogClose>
			</section>
		</section>
	);
};

export default FeedMenu;
