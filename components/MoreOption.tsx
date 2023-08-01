import Link from "next/link";
import Image from "next/image";

import { icons } from "@/constants";
import { useTheme } from "next-themes";

const MoreOption = () => {
	const { setTheme, resolvedTheme } = useTheme();

	const toggleTheme = () => {
		if (resolvedTheme === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	};

	return (
		<ul className="more-option-list">
			<li className="more-option">
				<Image src={icons.gear} alt="" />
				<Link href="/profile/setting">setting</Link>
			</li>

			<li className="more-option">
				<Image src={icons.clock} alt="" />
				<Link href="/notification">Your activity</Link>
			</li>

			<li className="more-option">
				<Image src={icons.saved} alt="" />
				<Link href="profile/saved">saved</Link>
			</li>

			<li className="more-option" onClick={toggleTheme}>
				<Image className="sun" src={icons.sun} alt="" />
				<Image className="moon" src={icons.moon} alt="" />
				<p>Switch appearance</p>
			</li>

			<li className="more-option">
				<Image src={icons.report} alt="" />
				<Link href="https://github.com/chukwuani">Report a problem</Link>
			</li>

			<li className="more-option">
				<p>log out</p>
			</li>
		</ul>
	);
};

export default MoreOption;
