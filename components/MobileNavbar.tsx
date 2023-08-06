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
		<nav className="w-screen h-[50px] hidden items-center justify-evenly fixed bottom-0 z-[1000] divider !border-x-0 !border-b-0 primary-bg max-[768px]:flex">
			<Link href="/" className="p-3">
				{activeLink === "/" ? (
					<span className="flex items-center gap-4">
						<Image className="icons" src={icons.homeActive} alt="Home" title="Home" />
					</span>
				) : (
					<span className="flex items-center gap-4">
						<Image className="icons" src={icons.home} alt="Home" title="Home" />
					</span>
				)}
			</Link>

			<button onClick={() => toggleSearch()} className="p-3">
				{activeLink === "search" ? (
					<span className="flex items-center gap-4">
						<Image className="icons" src={icons.searchActive} alt="Home" title="Search" />
					</span>
				) : (
					<span className="flex items-center gap-4">
						<Image className="icons" src={icons.search} alt="Search" title="Search" />
					</span>
				)}
			</button>

			<Link href="/create" className="p-3">
				<span className="flex items-center gap-4">
					<Image className="icons" src={icons.create} alt="Reels" title="Reels" />
				</span>
			</Link>

			<Link href="/reels" className="p-3">
				<span className="flex items-center gap-4">
					<Image className="icons" src={icons.reels} alt="Reels" title="Reels" />
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
