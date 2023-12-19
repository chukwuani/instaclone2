"use client";

import { getFeedPost } from "@/firebase/firebaseService";
import PostCard from "./PostCard";
import { useQuery } from "@tanstack/react-query";
import FeedSkeleton from "./FeedSkeleton";

export type PostType = {
	id: string;
	altTexts: string[];
	caption: string;
	commentCount: number;
	createdAt: {
		seconds: number;
		nanoseconds: number;
	};
	creatorId: string;
	filePaths: string[];
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

type FeedProps = {
	username: string;
	id: string;
};

export default function Feed({ username, id }: FeedProps) {
	const { isLoading, data: posts } = useQuery<PostType[]>({
		queryKey: ["feedData"],
		queryFn: async () => await getFeedPost(username),
	});

	if (isLoading) return <FeedSkeleton />;

	return (
		<>
			{posts?.map((post) => {
				return (
					<PostCard
						key={post.id}
						post={JSON.parse(JSON.stringify(post))}
						userId={id}
						username={username}
					/>
				);
			})}
		</>
	);
}
