"use client";
import Image from "next/image";
import Link from "next/link";
import MoreOption from "./MoreOption";

import { icons } from "@/constants";
import { useState } from "react";
import ProfileAvatar from "./ProfileAvatar";

const Navbar = ({ active }: { active: string }) => {
	const [activeLink, setActiveLink] = useState(active);
	const [activeSideBar, setActiveSideBar] = useState("");
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleSearchbar = () => {
		if (activeSideBar === "search") {
			setActiveSideBar("");
			setActiveLink(active);
		} else {
			setActiveSideBar("search");
			setActiveLink("search");
		}
	};

	const toggleNotification = () => {
		if (activeSideBar === "notification") {
			setActiveSideBar("");
			setActiveLink(active);
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
				<Link href="/" className="logo-wrapper min-h-[77px]">
					<Image className="logo textlogo" src={icons.textLogo} alt="Instagram" priority />
					<Image className="logo camlogo" src={icons.camLogo} alt="Instagram camera logo" />
				</Link>

				<span className="flex-auto flex flex-col">
					<Link className="nav-links" href="/">
						{activeLink === "home" ? (
							<span className="flex items-center gap-4">
								<Image src={icons.homeActive} alt="Home" title="Home" />
								<p className="font-bold nav-links-text">Home</p>
							</span>
						) : (
							<span className="flex items-center gap-4">
								<Image src={icons.home} alt="Home" title="Home" />
								<p className="nav-links-text">Home</p>
							</span>
						)}
					</Link>

					<button onClick={toggleSearchbar} className="nav-links">
						{activeLink === "search" ? (
							<span className="flex items-center gap-4">
								<Image src={icons.searchActive} alt="Home" title="Search" />
								<p className="nav-links-text">Search</p>
							</span>
						) : (
							<span className="flex items-center gap-4">
								<Image src={icons.search} alt="Search" title="Search" />
								<p className="nav-links-text">Search</p>
							</span>
						)}
					</button>

					<Link className="nav-links" href="/explore">
						<span className="flex items-center gap-4">
							<Image src={icons.explore} alt="Explore" title="Explore" />
							<p className="nav-links-text">Explore</p>
						</span>
					</Link>

					<Link className="nav-links" href="/reels">
						<span className="flex items-center gap-4">
							<Image src={icons.reels} alt="Reels" title="Reels" />
							<p className="nav-links-text">Reels</p>
						</span>
					</Link>

					<Link className="nav-links" href="/messages">
						<span className="flex items-center gap-4">
							<Image src={icons.message} alt="Messages" title="Messages" />
							<p className="nav-links-text">Messages</p>
						</span>
					</Link>

					<button onClick={toggleNotification} className="nav-links">
						{activeLink === "notification" ? (
							<span className="flex items-center gap-4">
								<Image src={icons.notificationActive} alt="Home" title="Notification" />
								<p className="nav-links-text">Notifications</p>
							</span>
						) : (
							<span className="flex items-center gap-4">
								<Image src={icons.notification} alt="Notification" title="Notification" />
								<p className="nav-links-text">Notifications</p>
							</span>
						)}
					</button>

					<Link className="nav-links" href="/create-post">
						<span className="flex items-center gap-4">
							<Image src={icons.create} alt="Create" title="Create" />
							<p className="nav-links-text">Create</p>
						</span>
					</Link>

					<Link className="nav-links" href="/profile">
						<span className="flex items-center gap-4">
							<ProfileAvatar size={24} />
							<p className="nav-links-text">Profile</p>
						</span>
					</Link>
				</span>

				<button onClick={() => setMenuOpen((prev) => !prev)} className="nav-links relative">
					{menuOpen ? (
						<span className="flex items-center gap-4">
							<Image src={icons.moreActive} alt="More" title="More" />
							<p className="font-bold nav-links-text">More</p>
						</span>
					) : (
						<span className="flex items-center gap-4">
							<Image src={icons.more} alt="More" title="More" />
							<p className="nav-links-text">More</p>
						</span>
					)}

					{menuOpen && <MoreOption />}
				</button>
			</nav>
		</header>
	);
};

export default Navbar;
