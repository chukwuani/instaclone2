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
			<p className="text-sm leading-normal font-semibold primary-text">
				{likeCount?.toLocaleString()} likes
			</p>

			<p className="text-sm leading-[23px] primary-text">
				<Link
					className="mr-1 caption-username"
					href="#">
					{user?.username}
				</Link>
				{caption}
			</p>

			<Link
				className="text-sm leading-normal no-underline secondary-text"
				href="/post/comment">
				View all 42,958 comments
			</Link>

			<time
				dateTime="03-07-2023"
				className="secondary-text text-[10px]">
				{createdAt?.toUpperCase()}
			</time>
		</article>
	);
};

export default PostStat;
