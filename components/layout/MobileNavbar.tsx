import { icons } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../Avatar";
import CreatePost from "./CreatePost";

interface Props {
	activeLink: string;
	toggleSearch: () => void;
}

const MobileNavbar = ({ activeLink, toggleSearch }: Props) => {
	return (
		<nav className="w-screen h-[50px] hidden items-center justify-evenly fixed bottom-0 z-[1000] border-t border-separator-divider bg-primary-background max-[768px]:flex">
			<Link
				href="/"
				className="p-3">
				<Image
					className="icons"
					src={activeLink === "/" ? icons.homeActive : icons.home}
					alt="Home"
					title="Home"
				/>
			</Link>

			<Link
				href="/explore"
				className="p-3">
				<Image
					className="icons"
					src={activeLink === "/explore" ? icons.exploreActive : icons.explore}
					alt="Explore"
					title="Explore"
				/>
			</Link>

			<CreatePost />

			<Link
				href="/reels"
				className="p-3">
				<Image
					className="icons"
					src={activeLink === "/reels" ? icons.reelsActive : icons.reels}
					alt="Reels"
					title="Reels"
				/>
			</Link>

			<Link
				href="/profile"
				className="p-3">
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
