import { icons } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "./ProfileAvatar";

const MobileNavbar = ({ activeLink }: { activeLink: string }) => {
	return (
		<nav className="mobile-nav">
			<Link href="/" className="p-3">
				{activeLink === "home" ? (
					<span className="flex items-center gap-4">
						<Image src={icons.homeActive} alt="Home" title="Home" />
					</span>
				) : (
					<span className="flex items-center gap-4">
						<Image src={icons.home} alt="Home" title="Home" />
					</span>
				)}
			</Link>

			<Link href="/explore" className="p-3">
				{activeLink === "search" ? (
					<span className="flex items-center gap-4">
						<Image src={icons.searchActive} alt="Home" title="Search" />
					</span>
				) : (
					<span className="flex items-center gap-4">
						<Image src={icons.search} alt="Search" title="Search" />
					</span>
				)}
			</Link>

			<Link href="/reels" className="p-3">
				<span className="flex items-center gap-4">
					<Image src={icons.reels} alt="Reels" title="Reels" />
				</span>
			</Link>

			<Link href="/message" className="p-3">
				<span className="flex items-center gap-4">
					<Image src={icons.message} alt="Message" title="Message" />
				</span>
			</Link>

			<Link href="/profile" className="p-3">
				<ProfileAvatar size={24} />
			</Link>
		</nav>
	);
};

export default MobileNavbar;
