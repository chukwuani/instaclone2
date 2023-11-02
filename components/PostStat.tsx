import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Comments from "./Comments";
import { formatTimeDifference } from "@/lib/utils";

interface Props {
	likeCount: number;
	caption: string;
	createdAt: number;
	user: any;
}

const PostStat = ({ likeCount, user, caption, createdAt }: Props) => {
	return (
		<article className="flex flex-col gap-[13px] py-2 px-3">
			<p className="text-sm leading-normal font-semibold text-primary-text">
				{likeCount?.toLocaleString()} {likeCount > 0 ? "likes" : "like"}
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
				dateTime={`${createdAt}`}
				className="text-secondary-text text-[10px] uppercase">
				{formatTimeDifference(createdAt)}
			</time>
		</article>
	);
};

export default PostStat;
