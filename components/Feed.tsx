"use client";

import PostHead from "./PostHead";
import PostContent from "./PostContent";
import PostReaction from "./PostReaction";
import PostStat from "./PostStat";
import { useQuery } from "@tanstack/react-query";
import FeedSkeleton from "./FeedSkeleton";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "@/lib/firebaseConfig";

export default function Feed() {
	const { isLoading, data } = useQuery({
		queryKey: ["postData"],
		queryFn: () => getPost(),
	});

	const getPost = async () => {
		const postsRef = collection(firestore, "posts");
		const q = query(postsRef, orderBy("createdAt", "desc"));

		const doc = await getDocs(q).then((querySnapshot) => {
			const newData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
			return newData;
		});

		return doc;

		// The code below gets the realtime update
		// const postsRef = collection(firestore, "posts");
		// const q = query(postsRef, orderBy("createdAt", "desc"));

		// return new Promise<DocumentData[]>((resolve) => {
		// 	const unsubscribe = onSnapshot(q, (snapshot) => {
		// 		const updatedPosts: DocumentData[] = [];
		// 		snapshot.forEach((doc) => {
		// 			updatedPosts.push({ id: doc.id, ...doc.data() });
		// 		});

		// 		resolve(updatedPosts);
		// 	});

		// 	// Return a cleanup function to unsubscribe when the component unmounts
		// 	return () => {
		// 		unsubscribe();
		// 	};
		// });
	};

	if (isLoading) return <FeedSkeleton />;

	return (
		<>
			{data?.map((item, index) => (
				<article
					key={index}
					className="max-w-[470px] w-full h-auto overflow-hidden flex flex-col bg-primary-background rounded-[4px] border border-separator max-md:border-transparent mb-3">
					<PostHead
						user={item?.user}
						verified={item?.isVerified}
					/>

					<PostContent
						images={item?.images}
						alt={item?.altTexts}
					/>

					<PostReaction
						saved={item?.isSaved}
						liked={item?.isLikedByYou}
					/>

					<PostStat
						user={item.user}
						likeCount={item?.likes?.length}
						caption={item?.caption}
						createdAt={item?.createdAt?.seconds}
					/>
				</article>
			))}
		</>
	);
}
