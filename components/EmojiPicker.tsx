"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { icons } from "@/constants";
import Image from "next/image";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data/sets/14/facebook.json";
import { useTheme } from "next-themes";
import { Dispatch, SetStateAction } from "react";

interface EmojiPickerProps {
	onChange: Dispatch<SetStateAction<string>>;
}

const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
	const { resolvedTheme } = useTheme();
	return (
		<Popover>
			<PopoverTrigger>
				<Image
					className="icons mt-2 mr-3 mb-2 ml-0"
					src={icons.emoji}
					alt="Add emoji"
				/>
			</PopoverTrigger>
			<PopoverContent
				side="right"
				className="bg-transparent border-none shadow-none drop-shadow-none mb-16">
				<Picker
					theme={resolvedTheme}
					data={data}
					onEmojiSelect={(emoji: any) => onChange((prev) => prev + emoji.native)}
					set="facebook"
				/>
			</PopoverContent>
		</Popover>
	);
};

export default EmojiPicker;
