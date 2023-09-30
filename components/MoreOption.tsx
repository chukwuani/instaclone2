import Link from "next/link";
import Image from "next/image";

import { icons } from "@/constants";
import { useTheme } from "next-themes";

import { useClerk } from "@clerk/clerk-react";

const MoreOption = () => {
	const { signOut } = useClerk();
	const { setTheme, resolvedTheme } = useTheme();

	const toggleTheme = () => {
		if (resolvedTheme === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	};

	return (
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
				<p className="text-[14px] h-6 mr-1 font-normal capitalize no-underline">Buy me a coffee</p>
			</Link>

			<Link
				href="#"
				className="py-[9px] px-4 text-primary-text flex flex-row-reverse items-center justify-between gap-3 border-t border-separator grow-0 shrink-0 basis-auto hover:bg-hover-overlay">
				<Image
					className="icons"
					src={icons.clock}
					alt=""
				/>
				<p className="text-[14px] h-6 mr-1 font-normal capitalize no-underline">Your activity</p>
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

			<span
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
			</span>

			<Link
				href="https://github.com/chukwuani"
				className="py-[9px] px-4 text-primary-text flex flex-row-reverse items-center justify-between gap-3 border-t border-separator grow-0 shrink-0 basis-auto hover:bg-hover-overlay">
				<Image
					className="icons"
					src={icons.report}
					alt=""
				/>
				<p className="text-[14px] h-6 mr-1 font-normal capitalize no-underline">Report a problem</p>
			</Link>

			<span
				onClick={() => signOut()}
				className="py-[9px] px-4 text-primary-text flex items-center justify-between gap-3 border-t-[6px] border-stroke grow-0 shrink-0 basis-auto hover:bg-hover-overlay">
				<p className="text-[14px] h-6 mr-1 font-normal capitalize no-underline">log out</p>
			</span>
		</nav>
	);
};

export default MoreOption;
