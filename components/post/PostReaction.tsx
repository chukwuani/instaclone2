// million-ignore

import Image from "next/image";
import { icons } from "@/constants";
import { AnimatePresence, motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import AddComment from "../form/AddComment";
import { getPostComments } from "@/firebase/firebaseService";
import { useQuery } from "@tanstack/react-query";
import { usePostContext } from "./PostCard";
import CommentCard from "./CommentCard";

interface Props {
	saved: boolean;
	liked: boolean;
	likePost: () => void;
	savePost: () => void;
}

const PostReaction = ({ saved, liked, likePost, savePost }: Props) => {
	const {
		post: { id },
	} = usePostContext();

	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["commentData"],
		queryFn: async () => await getPostComments(id),
	});

	return (
		<section className="flex items-center justify-between mt-1">
			<section className="flex items-center">
				<AnimatePresence
					mode="popLayout"
					initial={false}>
					{liked && (
						<motion.button
							key="modal"
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0, opacity: 0 }}
							transition={{ type: "spring", stiffness: 100 }}
							className="like-btn p-2"
							onClick={likePost}>
							<Image
								title="Unlike"
								src={icons.liked}
								alt="Button for Unliking post"
							/>
						</motion.button>
					)}
				</AnimatePresence>

				<AnimatePresence
					mode="popLayout"
					initial={false}>
					{!liked && (
						<motion.button
							key="modal2"
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0, opacity: 0 }}
							transition={{ type: "spring", stiffness: 100 }}
							className="like-btn p-2"
							onClick={likePost}>
							<Image
								className="icons"
								title="Like"
								src={icons.like}
								alt="Button for liking post"
							/>
						</motion.button>
					)}
				</AnimatePresence>

				<Sheet>
					<SheetTrigger asChild>
						<button
							onClick={() => refetch()}
							className="comment-btn p-2">
							<Image
								className="icons"
								src={icons.comment}
								alt="Button for leaving a comment"
							/>
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

				<button className="share-btn p-2">
					<Image
						className="icons"
						src={icons.share}
						alt="Button for sharing post"
					/>
				</button>
			</section>

			<button
				onClick={savePost}
				className="save-btn p-2">
				<Image
					className="icons"
					src={saved ? icons.saved : icons.save}
					alt="Button for saving post"
				/>
			</button>
		</section>
	);
};

export default PostReaction;
