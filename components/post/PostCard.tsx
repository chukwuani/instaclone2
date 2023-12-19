"use client";

import PostHead from "./PostHead";
import PostContent from "./PostContent";
import PostReaction from "./PostReaction";
import PostStat from "./PostStat";
import { createContext, useContext, useEffect, useState } from "react";

import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebaseConfig";
import { PostType } from "./Feed";
import { getUserByUsername } from "@/firebase/firebaseService";

interface PostCardProps {
	post: PostType;
	userId: string;
	username: string;
}

type PostContextType = {
	post: PostType;
	isFollowingCreator: boolean;
	isUserPost: boolean;
	userId: string;
};

const PostContext = createContext<PostContextType | null>(null);

const PostCard = ({ post, userId, username }: PostCardProps) => {
	const postId = post?.id;

	const isUserPost = post?.creatorId === userId;

	const [isFollowingCreator, setIsFoolowingCreator] = useState(false);

	const [likes, setLikes] = useState<string[]>(post?.likes);
	const [isLikedByYou, setIsLikedByYou] = useState(likes?.includes(userId));

	const [saves, setSaves] = useState<string[]>(post?.saves);
	const [isSavedByYou, setIsSavedByYou] = useState(saves?.includes(userId));

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

	useEffect(() => {
		const getUserProfile = async () => {
			const userProfile = await getUserByUsername(username);
			setIsFoolowingCreator(userProfile[0]?.following.includes(post?.creatorId));
		};

		getUserProfile();
	});

	return (
		<PostContext.Provider value={{ post, isFollowingCreator, isUserPost, userId }}>
			<article className="max-w-[470px] w-full h-auto overflow-hidden flex flex-col bg-primary-background rounded-[4px] border border-separator max-md:border-transparent mb-3">
				<PostHead />

				<PostContent likePost={handleLikePost} />

				<PostReaction
					saved={isSavedByYou}
					liked={isLikedByYou}
					likePost={handleLikePost}
					savePost={handleSavePost}
				/>

				<PostStat likeCount={likes?.length} />
			</article>
		</PostContext.Provider>
	);
};

export const usePostContext = () => {
	const context = useContext(PostContext);

	if (!context) {
		throw new Error("usePostContext must be used within a PostContextProvider");
	}

	return context;
};

export default PostCard;
