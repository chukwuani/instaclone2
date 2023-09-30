import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { icons } from "@/constants";
import Image from "next/image";
import React from "react";

export default function CreatePost() {
	const [open, setOpen] = React.useState(false);

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button className="nav-links">
					<span className="flex items-center gap-4">
						<Image
							className="icons"
							src={open ? icons.createActive : icons.create}
							alt="Create Post"
							title="Create Post"
						/>
						<p className={`nav-links-text ${open ? "font-bold" : ""}`}>Create</p>
					</span>
				</button>
			</DialogTrigger>

			<DialogContent className="w-[438px] max-[500px]:w-[340px] bg-banner p-0">
				<section className="flex flex-col items-center">
					<span className="border-b border-separator-elevated min-h-[43px] h-full flex items-center justify-center w-full">
						<p className="text-primary-text font-semibold">Create new post</p>
					</span>

					<section className="p-6 w-full h-full min-h-[348px] flex items-center justify-center flex-col gap-3">
						<Image
							className="icons"
							src={icons.media}
							title="Icon to represent media such as images or videos"
							alt="Icon to represent media such as images or videos"
							aria-label="Icon to represent media such as images or videos"
						/>

						<p className="text-[20px] font-normal leading-[25px]">Drag photos and videos here</p>
						<button className="px-4 py-[7px] bg-primary-button rounded-[8px] text-sm font-semibold">
							Select from computer
						</button>
					</section>
				</section>
			</DialogContent>
		</Dialog>
	);
}
