import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Comments from "./Comments";

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
			<p className="text-sm leading-normal font-semibold text-primary-text">
				{likeCount?.toLocaleString()} likes
			</p>

			<p className="text-sm leading-[23px] text-primary-text">
				<Link
					className="mr-1 no-underline text-secondary-button font-semibold fast hover:opacity-50"
					href="#">
					{user?.username}
				</Link>
				{caption}
			</p>

			<Sheet>
				<SheetTrigger asChild>
					<button className="w-fit text-sm leading-normal no-underline hover:underline text-secondary-text">
						View all 42,958 comments
					</button>
				</SheetTrigger>

				<SheetContent>
					<Comments />
				</SheetContent>
			</Sheet>

			<time
				dateTime="03-07-2023"
				className="text-secondary-text text-[10px]">
				{createdAt?.toUpperCase()}
			</time>
		</article>
	);
};

export default PostStat;
