import Link from "next/link";
type Person = {
	image: string;
	username: string;
};

const PostStat = ({
	likeCount,
	user,
	caption,
	createdAt,
}: {
	likeCount: number;
	user: Person;
	caption: string;
	createdAt: string;
}) => {
	return (
		<article className="flex flex-col gap-[13px] py-2 px-3">
			<h3 className="like-count">{likeCount?.toLocaleString()} likes</h3>

			<p className="caption">
				<Link className="mr-1" href="#">
					{user?.username}
				</Link>
				{caption}
			</p>

			<Link className="comment-count" href="/post/comment">
				View all 42,958 comments
			</Link>

			<time dateTime="03-07-2023" className="post-time">
				{createdAt?.toUpperCase()}
			</time>
		</article>
	);
};

export default PostStat;
