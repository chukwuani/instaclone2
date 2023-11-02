import Link from "next/link";
import Image from "next/image";

import { icons } from "@/constants";
import { useTheme } from "next-themes";

import { useClerk } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";

const MoreOption = () => {
	const [open, setOpen] = useState(false);
	const { signOut } = useClerk();
	const { setTheme, resolvedTheme } = useTheme();

	const toggleTheme = () => {
		if (resolvedTheme === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	};

	const logOut = () => {
		signOut();
		toast.success("You have successfully logged out!");
	};

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button className="nav-links">
					<span className="flex items-center gap-4">
						<Image
							className="icons"
							src={open ? icons.moreActive : icons.more}
							alt="More"
							title="More"
						/>
						<p className={cn(" nav-links-text", open && "font-bold")}>More</p>
					</span>
				</button>
			</PopoverTrigger>
			<PopoverContent className="p-0 border-none w-fit shadow-none z-[1500] ml-6 bg-primary-background">
				<nav className="more-option-list">
					<Link
						href="#"
						className="py-[9px] px-4 text-primary-text flex flex-row-reverse items-center justify-between gap-3 grow-0 shrink-0 basis-auto hover:bg-hover-overlay">
						<Image
							className="icons"
							src={icons.gear}
							alt=""
						/>
						<p className="text-[14px] h-6 mr-1 font-normal capitalize no-underline">setting</p>
					</Link>

					<Link
						href="https://www.buymeacoffee.com/chukwuanise"
						className="py-[9px] px-4 text-primary-text flex flex-row-reverse items-center justify-between gap-3 border-t border-separator grow-0 shrink-0 basis-auto hover:bg-hover-overlay">
						<Image
							className="icons"
							src={icons.bmc}
							alt=""
						/>
						<p className="text-[14px] h-6 mr-1 font-normal capitalize no-underline">
							Buy me a coffee
						</p>
					</Link>

					<Link
						href="#"
						className="py-[9px] px-4 text-primary-text flex flex-row-reverse items-center justify-between gap-3 border-t border-separator grow-0 shrink-0 basis-auto hover:bg-hover-overlay">
						<Image
							className="icons"
							src={icons.clock}
							alt=""
						/>
						<p className="text-[14px] h-6 mr-1 font-normal capitalize no-underline">
							Your activity
						</p>
					</Link>

					<Link
						href="#"
						className="py-[9px] px-4 text-primary-text flex flex-row-reverse items-center justify-between gap-3 border-t border-separator grow-0 shrink-0 basis-auto hover:bg-hover-overlay">
						<Image
							className="icons"
							src={icons.save}
							alt=""
						/>
						<p className="text-[14px] h-6 mr-1 font-normal capitalize no-underline">saved</p>
					</Link>

					<button
						className="py-[9px] px-4 text-primary-text flex flex-row-reverse items-center justify-between gap-3 border-t border-separator grow-0 shrink-0 basis-auto hover:bg-hover-overlay"
						onClick={toggleTheme}>
						<Image
							className="icons sun"
							src={icons.sun}
							alt="Sun icon"
						/>
						<Image
							className="icons moon"
							src={icons.moon}
							alt="Moon icon"
						/>
						<p className="text-[14px] h-6 mr-1 font-normal capitalize no-underline">
							Switch appearance
						</p>
					</button>

					<Link
						href="https://github.com/chukwuani"
						className="py-[9px] px-4 text-primary-text flex flex-row-reverse items-center justify-between gap-3 border-t border-separator grow-0 shrink-0 basis-auto hover:bg-hover-overlay">
						<Image
							className="icons"
							src={icons.report}
							alt=""
						/>
						<p className="text-[14px] h-6 mr-1 font-normal capitalize no-underline">
							Report a problem
						</p>
					</Link>

					<button
						onClick={logOut}
						className="py-[9px] px-4 text-primary-text flex items-center justify-between gap-3 border-t-[6px] border-stroke grow-0 shrink-0 basis-auto hover:bg-hover-overlay">
						<p className="text-[14px] h-6 mr-1 font-normal capitalize no-underline">log out</p>
					</button>
				</nav>
			</PopoverContent>
		</Popover>
	);
};

export default MoreOption;
