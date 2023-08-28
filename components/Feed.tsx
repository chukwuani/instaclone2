"use client";
import { useRef, useState } from "react";
import PostHead from "./PostHead";
import PostContent from "./PostContent";
import PostReaction from "./PostReaction";
import PostStat from "./PostStat";
import AddComment from "./form/AddComment";
import FeedMenu from "./FeedMenu";

export default function Feed() {
	const dialog = useRef<HTMLDialogElement>(null);
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
			posts: ["/images/post1.jpg", "/images/post2.jpg", "/images/post1.jpg", "/images/post2.jpg"],
			isVerified: true,
			isLikedByYou: false,
			isSaved: false,
			replies: [],
		},
	]);

	const toggleSave = (id: string) => {
		setFeed(
			feed.map((item) => {
				if (item.id === id) {
					return { ...item, isSaved: !item.isSaved };
				} else {
					return item;
				}
			})
		);
		console.log("Saved");
	};

	const toggleLike = (id: string) => {
		setFeed(
			feed.map((item) => {
				if (item.id === id && item.isLikedByYou === false) {
					return { ...item, isLikedByYou: true, likeCount: item.likeCount + 1 };
				} else if (item.id === id && item.isLikedByYou === true) {
					return { ...item, isLikedByYou: false, likeCount: item.likeCount - 1 };
				} else {
					return item;
				}
			})
		);
		console.log("Liked");
	};

	return (
		<>
			{feed.map((item) => (
				<article
					key={item.id}
					className="max-w-[470px] w-full h-auto overflow-hidden flex flex-col primary-bg rounded-[8px] border-seperator mb-3">
					<PostHead
						user={item.user}
						verified={item.isVerified}
						dialog={dialog}
					/>

					<PostContent
						posts={item.posts}
						toggleLike={() => toggleLike(item.id)}
					/>

					<PostReaction
						toggleLike={() => toggleLike(item.id)}
						toggleSave={() => toggleSave(item.id)}
						saved={item.isSaved}
						liked={item.isLikedByYou}
					/>

					<PostStat
						user={item.user}
						likeCount={item.likeCount}
						caption={item.caption}
						createdAt={item.createdAt}
					/>

					<AddComment />

					<FeedMenu dialog={dialog} />
				</article>
			))}
		</>
	);
}
