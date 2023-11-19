"use client";

import PostHead from "./PostHead";
import PostContent from "./PostContent";
import PostReaction from "./PostReaction";
import PostStat from "./PostStat";
import { useState } from "react";

import {
	DocumentData,
	Timestamp,
	arrayRemove,
	arrayUnion,
	doc,
	onSnapshot,
	updateDoc,
} from "firebase/firestore";
import { firestore } from "@/firebase/firebaseConfig";

interface PostCardProps {
	post: DocumentData;
	currentUserId: string | undefined;
}

type PostType = {
	altTexts: string[];
	caption: string;
	comments: string[];
	createdAt: Timestamp;
	creatorId: string;
	images: string[];
	likes: string[];
	saves: string[];
	user: {
		imageUrl: string;
		isVerified: boolean;
		name: string;
		username: string;
	};
};

const PostCard = ({ post, currentUserId }: PostCardProps) => {
	const postId = post.id;
	const userId = currentUserId as string;

	const [likes, setLikes] = useState<string[]>(post.likes);
	const [isLikedByYou, setIsLikedByYou] = useState(likes.includes(userId));

	const [saves, setSaves] = useState<string[]>(post.saves);
	const [isSavedByYou, setIsSavedByYou] = useState(saves.includes(userId));

	const handleLikePost = async () => {
		const postRef = doc(firestore, "posts", postId);

		if (likes.includes(userId)) {
			setIsLikedByYou(false);
			await updateDoc(postRef, {
				likes: arrayRemove(userId),
			});
		} else {
			setIsLikedByYou(true);

			await updateDoc(postRef, {
				likes: arrayUnion(userId),
			});
		}

		onSnapshot(doc(firestore, "posts", postId), (doc) => {
			setLikes(doc.data()?.likes);
		});
	};

	const handleSavePost = async () => {
		const postRef = doc(firestore, "posts", postId);

		if (saves.includes(userId)) {
			setIsSavedByYou(false);

			await updateDoc(postRef, {
				saves: arrayRemove(userId),
			});
		} else {
			setIsSavedByYou(true);

			await updateDoc(postRef, {
				saves: arrayUnion(userId),
			});
		}

		onSnapshot(doc(firestore, "posts", postId), (doc) => {
			setSaves(doc.data()?.saves);
			console.log("Current data: ", doc.data()?.saves);
		});
	};

	return (
		<>
			<article className="max-w-[470px] w-full h-auto overflow-hidden flex flex-col bg-primary-background rounded-[4px] border border-separator max-md:border-transparent mb-3">
				<PostHead
					user={post.user}
					isUserPost={post.creatorId === userId}
				/>

				<PostContent
					images={post.images}
					alt={post.altTexts}
					likePost={handleLikePost}
				/>

				<PostReaction
					saved={isSavedByYou}
					liked={isLikedByYou}
					likePost={handleLikePost}
					savePost={handleSavePost}
				/>

				<PostStat
					user={post.user}
					likeCount={likes.length}
					caption={post.caption}
					comments={post.comments}
					createdAt={post.createdAt?.seconds}
				/>
			</article>
		</>
	);
};

export default PostCard;
