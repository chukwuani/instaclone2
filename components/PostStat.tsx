import Link from "next/link";

const PostStat = ({
	likeCount,
	user,
	caption,
	createdAt,
}: {
	likeCount: number;
	user: any;
	caption: string;
	createdAt: string;
}) => {
	return (
		<section className="flex flex-col gap-[13px] py-2 px-3">
			<p className="like-count">{likeCount?.toLocaleString()} likes</p>

			<p className="caption">
				<Link className="mr-1" href="#">
					{user?.username}
				</Link>
				{caption}
			</p>

			<Link className="comment-count" href="/post/comment">
				View all 42,958 comments
			</Link>

			<p className="post-time">{createdAt?.toUpperCase()}</p>
		</section>
	);
};

export default PostStat;
