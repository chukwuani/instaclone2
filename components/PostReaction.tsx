import Image from "next/image";
import { icons } from "@/constants";

const PostReaction = () => {
	return (
		<section className="flex items-center justify-between mt-1">
			<section className="flex items-center">
				<button className="like-btn p-2">
					<Image className="icons" src={icons.like} alt="Button for liking post" />
				</button>

				<button className="comment-btn p-2">
					<Image className="icons" src={icons.comment} alt="Button for leaving a comment" />
				</button>

				<button className="share-btn p-2">
					<Image className="icons" src={icons.share} alt="Button for sharing post" />
				</button>
			</section>

			<button className="save-btn p-2">
				<Image className="icons" src={icons.saved} alt="Button for saving post" />
			</button>
		</section>
	);
};

export default PostReaction;
