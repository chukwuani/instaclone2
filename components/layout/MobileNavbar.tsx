import { icons } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../Avatar";

interface Props {
	activeLink: string;
	toggleSearch: () => void;
}

const MobileNavbar = ({ activeLink, toggleSearch }: Props) => {
	return (
		<nav className="w-screen h-[50px] hidden items-center justify-evenly fixed bottom-0 z-[1000] divider !border-x-0 !border-b-0 primary-bg max-[768px]:flex">
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

			<button
				onClick={toggleSearch}
				className="p-3">
				<Image
					className="icons"
					src={icons.search}
					alt="Search"
					title="Search"
				/>
			</button>

			<Link
				href="#"
				className="p-3">
				<Image
					className="icons"
					src={icons.create}
					alt="Create"
					title="Create"
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