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
				className="more-option">
				<Image
					className="icons"
					src={icons.gear}
					alt=""
				/>
				<p>setting</p>
			</Link>

			<Link
				href="#"
				className="more-option">
				<Image
					className="icons"
					src={icons.clock}
					alt=""
				/>
				<p>Your activity</p>
			</Link>

			<Link
				href="#"
				className="more-option">
				<Image
					className="icons"
					src={icons.save}
					alt=""
				/>
				<p>saved</p>
			</Link>

			<span
				className="more-option"
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
				<p>Switch appearance</p>
			</span>

			<Link
				href="https://github.com/chukwuani"
				className="more-option">
				<Image
					className="icons"
					src={icons.report}
					alt=""
				/>
				<p>Report a problem</p>
			</Link>

			<span
				onClick={() => signOut()}
				className="more-option">
				<p>log out</p>
			</span>
		</nav>
	);
};

export default MoreOption;
