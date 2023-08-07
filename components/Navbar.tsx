"use client";
import Image from "next/image";
import Link from "next/link";
import MoreOption from "./MoreOption";
import { usePathname } from "next/navigation";

import { icons } from "@/constants";
import { useState, useEffect } from "react";
import ProfileAvatar from "./ProfileAvatar";
import MobileNavbar from "./MobileNavbar";
import NotificationBar from "./NotificationBar";
import SearchSideBar from "./SearchSideBar";

const Navbar = () => {
	const pathname = usePathname();

	const [activeLink, setActiveLink] = useState(pathname);
	const [activeSideBar, setActiveSideBar] = useState("");
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		setActiveLink(pathname);
		setActiveSideBar("");
		// console.log(activeSideBar);
	}, [pathname]);

	const toggleSearchbar = () => {
		if (activeSideBar === "search") {
			setActiveSideBar("");
			setActiveLink(pathname);
		} else {
			setActiveSideBar("search");
			setActiveLink("search");
		}
	};

	const toggleNotification = () => {
		if (activeSideBar === "notification") {
			setActiveSideBar("");
			setActiveLink(pathname);
		} else {
			setActiveSideBar("notification");
			setActiveLink("notification");
		}
	};

	return (
		<header>
			<nav
				className={
					activeSideBar === "search" || activeSideBar === "notification"
						? "sidebar-is-active nav"
						: "nav"
				}>
				<Link href="/" className="logo-wrapper h-[73px]">
					<Image className="logo textlogo icons" src={icons.textLogo} alt="Instagram" priority />
					<Image className="logo camlogo icons" src={icons.camLogo} alt="Instagram camera logo" />
				</Link>

				<span className="flex-auto flex flex-col">
					<Link className="nav-links" href="/">
						{activeLink === "/" ? (
							<span className="flex items-center gap-4">
								<Image className="icons" src={icons.homeActive} alt="Home" title="Home" />
								<p className="font-bold nav-links-text">Home</p>
							</span>
						) : (
							<span className="flex items-center gap-4">
								<Image className="icons" src={icons.home} alt="Home" title="Home" />
								<p className="nav-links-text">Home</p>
							</span>
						)}
					</Link>

					<button onClick={toggleSearchbar} className="nav-links">
						{activeLink === "search" ? (
							<span className="flex items-center gap-4">
								<Image className="icons" src={icons.searchActive} alt="Home" title="Search" />
								<p className="nav-links-text">Search</p>
							</span>
						) : (
							<span className="flex items-center gap-4">
								<Image className="icons" src={icons.search} alt="Search" title="Search" />
								<p className="nav-links-text">Search</p>
							</span>
						)}
					</button>

					<Link className="nav-links" href="/explore">
						{activeLink === "/explore" ? (
							<span className="flex items-center gap-4">
								<Image className="icons" src={icons.exploreActive} alt="Explore" title="Explore" />
								<p className="font-bold nav-links-text">Explore</p>
							</span>
						) : (
							<span className="flex items-center gap-4">
								<Image className="icons" src={icons.explore} alt="Explore" title="Explore" />
								<p className="nav-links-text">Explore</p>
							</span>
						)}
					</Link>

					<Link className="nav-links" href="/explore">
						<span className="flex items-center gap-4">
							<Image className="icons" src={icons.reels} alt="Reels" title="Reels" />
							<p className="nav-links-text">Reels</p>
						</span>
					</Link>

					<Link className="nav-links" href="/message">
						{activeLink === "/message" ? (
							<span className="flex items-center gap-4">
								<Image
									className="icons"
									src={icons.messageActive}
									alt="Messages"
									title="Messages"
								/>
								<p className="font-bold nav-links-text">Messages</p>
							</span>
						) : (
							<span className="flex items-center gap-4">
								<Image className="icons" src={icons.message} alt="Messages" title="Messages" />
								<p className="nav-links-text">Messages</p>
							</span>
						)}
					</Link>

					<button onClick={toggleNotification} className="nav-links">
						{activeLink === "notification" ? (
							<span className="flex items-center gap-4">
								<Image
									className="icons"
									src={icons.notificationActive}
									alt="Home"
									title="Notification"
								/>
								<p className="nav-links-text">Notifications</p>
							</span>
						) : (
							<span className="flex items-center gap-4">
								<Image
									className="icons"
									src={icons.notification}
									alt="Notification"
									title="Notification"
								/>
								<p className="nav-links-text">Notifications</p>
							</span>
						)}
					</button>

					<Link className="nav-links" href="/create-post">
						<span className="flex items-center gap-4">
							<Image className="icons" src={icons.create} alt="Create" title="Create" />
							<p className="nav-links-text">Create</p>
						</span>
					</Link>

					<Link className="nav-links" href="/profile">
						{pathname === "/profile" ? (
							<span className="flex items-center gap-4">
								<span className="profile-active">
									<ProfileAvatar size={24} />
								</span>

								<p className="font-bold nav-links-text">Profile</p>
							</span>
						) : (
							<span className="flex items-center gap-4">
								<ProfileAvatar size={24} />
								<p className="nav-links-text">Profile</p>
							</span>
						)}
					</Link>
				</span>

				<button onClick={() => setMenuOpen((prev) => !prev)} className="nav-links relative">
					{menuOpen ? (
						<span className="flex items-center gap-4">
							<Image className="icons" src={icons.moreActive} alt="More" title="More" />
							<p className="font-bold nav-links-text">More</p>
						</span>
					) : (
						<span className="flex items-center gap-4">
							<Image className="icons" src={icons.more} alt="More" title="More" />
							<p className="nav-links-text">More</p>
						</span>
					)}

					{menuOpen && <MoreOption />}
				</button>
			</nav>

			<NotificationBar activeLink={activeLink} />

			<SearchSideBar activeLink={activeLink} />

			<MobileNavbar activeLink={pathname} toggleSearch={toggleSearchbar} />
		</header>
	);
};

export default Navbar;
