import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { formatTimeDifference } from "@/lib/utils";
import { usePostContext } from "./PostCard";
import AddComment from "../form/AddComment";
import { getPostComments } from "@/firebase/firebaseService";
import { useQuery } from "@tanstack/react-query";
import CommentCard from "./CommentCard";

const PostStat = ({ likeCount }: { likeCount: number }) => {
	const {
		post: { caption, user, createdAt, commentCount, id },
	} = usePostContext();

	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["commentData"],
		queryFn: async () => await getPostComments(id),
	});

	console.log(data, error, isLoading);

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

			{commentCount > 0 ? (
				<Sheet>
					<SheetTrigger asChild>
						<button
							onClick={() => refetch()}
							className="w-fit text-sm leading-none no-underline hover:underline text-secondary-text">
							View {commentCount > 1 && "all"} {commentCount}{" "}
							{commentCount > 1 ? "comments" : "comment"}
						</button>
					</SheetTrigger>

					<SheetContent className="p-0">
						<AddComment />

						<CommentCard
							data={data}
							isLoading={isLoading}
							error={error}
							refetch={refetch}
						/>
					</SheetContent>
				</Sheet>
			) : null}

			<time
				dateTime={`${createdAt.seconds}`}
				className="text-secondary-text text-[10px] uppercase leading-none">
				{formatTimeDifference(createdAt.seconds)}
			</time>
		</article>
	);
};

export default PostStat;
