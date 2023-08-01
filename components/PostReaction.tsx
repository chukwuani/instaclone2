import Image from "next/image";
import { icons } from "@/constants";

const PostReaction = () => {
	return (
		<div className="flex items-center justify-between mt-1">
			<div className="flex items-center">
				<button className="like-btn p-2">
					<Image src={icons.like} alt="Button for liking post" />
				</button>

				<button className="comment-btn p-2">
					<Image src={icons.comment} alt="Button for leaving a comment" />
				</button>

				<button className="share-btn p-2">
					<Image src={icons.share} alt="Button for sharing post" />
				</button>
			</div>

			<button className="save-btn p-2">
				<Image src={icons.saved} alt="Button for saving post" />
			</button>
		</div>
	);
};

export default PostReaction;
