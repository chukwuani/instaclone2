import Image from "next/image";
import { icons } from "@/constants";

const AddComment = () => {
	return (
		<form className="comment-form">
			<button type="button" className="pt-2 pr-3 pb-2 pl-0">
				<Image src={icons.emoji} alt="Add emoji" />
			</button>

			<label className="flex items-center justify-between flex-auto" htmlFor="comment">
				<textarea
					className="comment-input"
					required
					name="comment"
					id="comment"
					placeholder="Add a comment..."
				/>

				<button className="post-comment-btn" type="submit">
					post
				</button>
			</label>
		</form>
	);
};

export default AddComment;
