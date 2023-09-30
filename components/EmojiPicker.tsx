"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { icons } from "@/constants";
import Image from "next/image";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "next-themes";

interface EmojiPickerProps {
	onChange: (value: string) => void;
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
					onEmojiSelect={(emoji: any) => onChange(emoji.native)}
				/>
			</PopoverContent>
		</Popover>
	);
};

export default EmojiPicker;
