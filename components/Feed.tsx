import FeedSkeleton from "./FeedSkeleton";
import { getPost } from "@/lib/firebaseService";
import PostCard from "./PostCard";
import { currentUser } from "@clerk/nextjs";

export default async function Feed() {
	const posts = await getPost();
	const user = await currentUser();

	if (!posts) return <FeedSkeleton />;

	return (
		<>
			{posts?.map((post, index) => {
				return (
					<PostCard
						key={index}
						post={post}
						currentUser={user?.id}
					/>
				);
			})}
		</>
	);
}
