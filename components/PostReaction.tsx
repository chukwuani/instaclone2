import Image from "next/image";
import { icons } from "@/constants";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
	saved: boolean;
	liked: boolean;
	toggleSave: () => void;
	toggleLike: () => void;
}

const PostReaction = ({ saved, liked, toggleSave, toggleLike }: Props) => {
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
							onClick={toggleLike}
							className="like-btn p-2">
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
							onClick={toggleLike}
							className="like-btn p-2">
							<Image
								className="icons"
								title="Like"
								src={icons.like}
								alt="Button for liking post"
							/>
						</motion.button>
					)}
				</AnimatePresence>

				<button className="comment-btn p-2">
					<Image
						className="icons"
						src={icons.comment}
						alt="Button for leaving a comment"
					/>
				</button>

				<button className="share-btn p-2">
					<Image
						className="icons"
						src={icons.share}
						alt="Button for sharing post"
					/>
				</button>
			</section>

			<button
				onClick={toggleSave}
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
