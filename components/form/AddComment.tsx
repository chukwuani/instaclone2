"use client";

import { useRef, useState } from "react";
import EmojiPicker from "../EmojiPicker";
import useAutosizeTextArea from "@/utils/useAutosizeTextArea";

const AddComment = () => {
	const [text, setText] = useState("");
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	useAutosizeTextArea(textAreaRef.current, text);

	return (
		<form className="px-3 py-[6px] flex items-center justify-between border-separator-divider border-y">
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
