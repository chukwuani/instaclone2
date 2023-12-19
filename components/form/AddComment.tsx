"use client";

import { useRef, useState } from "react";
import EmojiPicker from "../EmojiPicker";
import useAutosizeTextArea from "@/utils/useAutosizeTextArea";
import { useQueryClient } from "@tanstack/react-query";
import { addComment } from "@/firebase/firebaseService";
import { usePostContext } from "../post/PostCard";
import { useUser } from "@clerk/nextjs";

const AddComment = () => {
	const { post } = usePostContext();
	const { user } = useUser();
	const queryClient = useQueryClient();

	const [text, setText] = useState("");
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	useAutosizeTextArea(textAreaRef.current, text);

	const onCreateComment = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await addComment(
				text,
				user?.imageUrl as string,
				post.id,
				user?.id as string,
				user?.username as string
			);

			setText("");

			queryClient.invalidateQueries({ queryKey: ["commentData"] });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form
			onSubmit={onCreateComment}
			className="px-3 py-[6px] flex items-center justify-between border-separator-divider border-y">
			<EmojiPicker onChange={setText} />

			<label
				className="flex items-center justify-between flex-auto"
				htmlFor="comment">
				<textarea
					ref={textAreaRef}
					value={text}
					onChange={(e) => setText(e.target.value)}
					className="border-none bg-transparent outline-none w-full resize-none h-5 text-sm leading-[initial] text-primary-text placeholder:text-secondary-text"
					required
					name="comment"
					id="comment"
					placeholder="Add a comment..."
				/>

				<button
					className=" bg-transparent border-none block text-[14px] font-semibold py-[5px] px-[9px] text-center w-auto m-0 text-primary-button capitalize"
					type="submit">
					post
				</button>
			</label>
		</form>
	);
};

export default AddComment;
