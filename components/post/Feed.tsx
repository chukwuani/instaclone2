import FeedSkeleton from "./FeedSkeleton";
import { getPost } from "@/firebase/firebaseService";
import PostCard from "./PostCard";
import { currentUser } from "@clerk/nextjs";

export default async function Feed() {
	const posts = await getPost();
	const user = await currentUser();

	if (!posts && !user) return <FeedSkeleton />;

	//Warning: Only plain objects can be passed to Client Components from Server Components. Convert it manually to a simple value before passing it to props. Solution: JSON.parse(JSON.stringify(post)).

	return (
		<>
			{posts?.map((post) => {
				return (
					<PostCard
						key={post.id}
						post={JSON.parse(JSON.stringify(post))}
						currentUserId={user?.id}
					/>
				);
			})}
		</>
	);
}
