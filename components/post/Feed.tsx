import { getFeedPost, getUserByUsername } from "@/firebase/firebaseService";
import PostCard from "./PostCard";
import { currentUser } from "@clerk/nextjs";

export default async function Feed() {
	const user = await currentUser();
	const posts = await getFeedPost(user?.username as string);
	const userProfile = await getUserByUsername(user?.username as string);

	//Warning: Only plain objects can be passed to Client Components from Server Components. Convert it manually to a simple value before passing it to props. Solution: JSON.parse(JSON.stringify(post)).

	return (
		<>
			{posts?.map((post) => {
				return (
					<PostCard
						key={post.id}
						post={JSON.parse(JSON.stringify(post))}
						currentUserId={user?.id}
						userProfile={userProfile[0]}
					/>
				);
			})}
		</>
	);
}
