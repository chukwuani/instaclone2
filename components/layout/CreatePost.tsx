import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
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

			<DialogContent className="max-h-[855px] min-h-[348px] w-[438px] max-[500px]:w-[340px] bg-banner p-0">
				<section>
					<p className="text-primary-text border-b border-separator-divider">Create new post</p>

					<section>
						<Image
							className="icons"
							src={icons.media}
							title="Icon to represent media such as images or videos"
							alt="Icon to represent media such as images or videos"
							aria-label="Icon to represent media such as images or videos"
						/>

						<p>Drag photos and videos here</p>
					</section>

					<button>Select from computer</button>
				</section>
			</DialogContent>
		</Dialog>
	);
}
