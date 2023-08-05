"use client";
import { useState } from "react";
import PostHead from "./PostHead";
import PostContent from "./PostContent";
import PostReaction from "./PostReaction";
import PostStat from "./PostStat";
import AddComment from "./AddComment";

export default function Feed() {
	const [feed, setFeed] = useState([
		{
			id: crypto.randomUUID(),
			caption:
				"Disappointed with the result, but we stay focused on our season and the games ahead.💪🏼Thank you Al Nassr fans for your support, we know we can count on you!🙌🏼💛💙",
			createdAt: "1 month ago",
			likeCount: 5787888,
			user: {
				image: "/images/cristiano.jpg",
				username: "cristiano",
			},
			posts: ["/images/post1.jpg", "/images/post2.jpg"],
			isVerified: true,
			isLikedByYou: false,
			isSaved: false,
			replies: [],
		},
	]);

	return (
		<>
			{feed.map((item) => (
				<article
					key={item.id}
					className="max-w-[470px] w-full h-auto overflow-hidden flex flex-col primary-bg rounded-[8px] border-seperator mb-3">
					<PostHead user={item.user} />

					<PostContent posts={item.posts} />

					<PostReaction />

					<PostStat
						user={item.user}
						likeCount={item.likeCount}
						caption={item.caption}
						createdAt={item.createdAt}
					/>

					<AddComment />
				</article>
			))}
		</>
	);
}
