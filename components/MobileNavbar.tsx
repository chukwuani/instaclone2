import { icons } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "./ProfileAvatar";

const MobileNavbar = ({
	activeLink,
	toggleSearch,
}: {
	activeLink: string;
	toggleSearch: Function;
}) => {
	return (
		<nav className="w-screen h-[50px] flex items-center justify-evenly fixed bottom-0 z-[1000] divider primary-bg md:hidden">
			<Link href="/" className="p-3">
				{activeLink === "/" ? (
					<span className="flex items-center gap-4">
						<Image src={icons.homeActive} alt="Home" title="Home" />
					</span>
				) : (
					<span className="flex items-center gap-4">
						<Image src={icons.home} alt="Home" title="Home" />
					</span>
				)}
			</Link>

			<button onClick={() => toggleSearch()} className="p-3">
				{activeLink === "search" ? (
					<span className="flex items-center gap-4">
						<Image src={icons.searchActive} alt="Home" title="Search" />
					</span>
				) : (
					<span className="flex items-center gap-4">
						<Image src={icons.search} alt="Search" title="Search" />
					</span>
				)}
			</button>

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
				<span className="flex items-center gap-4">
					{activeLink === "/profile" ? (
						<span className="profile-active">
							<ProfileAvatar size={24} />
						</span>
					) : (
						<ProfileAvatar size={24} />
					)}
				</span>
			</Link>
		</nav>
	);
};

export default MobileNavbar;
