import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Comments from "./Comments";
import { formatTimeDifference } from "@/lib/utils";

interface Props {
	likeCount: number;
	caption: string;
	createdAt: number;
	user: any;
	comments: string[];
}

const PostStat = ({ likeCount, user, caption, createdAt, comments }: Props) => {
	return (
		<article className="flex flex-col gap-[10px] py-2 px-3">
			<p className="text-sm leading-none font-semibold text-primary-text">
				{likeCount?.toLocaleString()} {likeCount > 1 ? "likes" : "like"}
			</p>

			{caption.length > 0 ? (
				<p className="text-sm leading-[23px] text-primary-text">
					<Link
						className="mr-1 no-underline text-secondary-button font-semibold fast hover:opacity-50"
						href={`${user?.username}`}>
						{user?.username}
					</Link>
					{caption}
				</p>
			) : null}

			{comments.length > 0 ? (
				<Sheet>
					<SheetTrigger asChild>
						<button className="w-fit text-sm leading-none no-underline hover:underline text-secondary-text">
							View {comments.length > 1 && "all"} {comments?.length}{" "}
							{comments?.length > 1 ? "comments" : "comment"}
						</button>
					</SheetTrigger>

					<SheetContent>
						<Comments />
					</SheetContent>
				</Sheet>
			) : null}

			<time
				dateTime={`${createdAt}`}
				className="text-secondary-text text-[10px] uppercase leading-none">
				{formatTimeDifference(createdAt)}
			</time>
		</article>
	);
};

export default PostStat;
