"use client";

import Image from "next/image";
import Link from "next/link";

import MoreOption from "../MoreOption";
import Avatar from "../Avatar";
import MobileNavbar from "./MobileNavbar";
import NotificationBar from "./NotificationBar";
import SearchSideBar from "./SearchSideBar";
import TopMobileNavbar from "./TopMobileNavbar";

import { icons } from "@/constants";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

const Navbar = () => {
	const { user } = useUser();
	const pathname = usePathname();

	const [activeLink, setActiveLink] = useState(pathname);

	const sideBarIsActive = activeLink === "search" || activeLink === "notification";

	useEffect(() => {
		// Reset the activeLink because usestate persist through route change
		setActiveLink(pathname);
	}, [pathname]);

	const toggleSearchbar = () => {
		if (activeLink === "search") {
			setActiveLink(pathname);
		} else {
			setActiveLink("search");
		}
	};

	const toggleNotification = () => {
		if (activeLink === "notification") {
			setActiveLink(pathname);
		} else {
			setActiveLink("notification");
		}
	};

	return (
		<header>
			<nav className={cn("nav", sideBarIsActive && "sidebar-is-active")}>
				<Link
					href="/"
					className="logo-wrapper h-[73px]">
					<Image
						className="logo textlogo icons"
						src={icons.textLogo}
						alt="Instagram"
						priority
					/>
					<Image
						className="logo camlogo icons"
						src={icons.camLogo}
						alt="Instagram camera logo"
					/>
				</Link>

				<span className="flex-auto flex flex-col">
					<Link
						className="nav-links"
						href="/"
						scroll>
						<span className="flex items-center gap-4">
							<Image
								className="icons"
								src={activeLink === "/" ? icons.homeActive : icons.home}
								alt="Home"
								title="Home"
							/>
							<p className={`nav-links-text ${activeLink === "/" ? "font-bold" : ""}`}>Home</p>
						</span>
					</Link>

					<button
						onClick={toggleSearchbar}
						className="nav-links">
						{activeLink === "search" ? (
							<span className="flex items-center gap-4">
								<Image
									className="icons"
									src={icons.searchActive}
									alt="Home"
									title="Search"
								/>
								<p className="nav-links-text">Search</p>
							</span>
						) : (
							<span className="flex items-center gap-4">
								<Image
									className="icons"
									src={icons.search}
									alt="Search"
									title="Search"
								/>
								<p className="nav-links-text">Search</p>
							</span>
						)}
					</button>

					<Link
						className="nav-links"
						href="/explore">
						<span className="flex items-center gap-4">
							<Image
								className="icons"
								src={activeLink === "/explore" ? icons.exploreActive : icons.explore}
								alt="Explore"
								title="Explore"
							/>
							<p className={`nav-links-text ${activeLink === "/explore" ? "font-bold" : ""}`}>
								Explore
							</p>
						</span>
					</Link>

					<Link
						className="nav-links"
						href="/reels">
						<span className="flex items-center gap-4">
							<Image
								className="icons"
								src={activeLink === "/reels" ? icons.reelsActive : icons.reels}
								alt="Reels"
								title="Reels"
							/>
							<p className={`nav-links-text ${activeLink === "/reels" ? "font-bold" : ""}`}>
								Reels
							</p>
						</span>
					</Link>

					<Link
						className="nav-links"
						href="/message">
						<span className="flex items-center gap-4">
							<Image
								className="icons"
								src={activeLink === "/message" ? icons.messageActive : icons.message}
								alt="Messages"
								title="Messages"
							/>
							<p className={`nav-links-text ${activeLink === "/message" ? "font-bold" : ""}`}>
								Messages
							</p>
						</span>
					</Link>

					<button
						onClick={toggleNotification}
						className="nav-links">
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

					<CreatePost />

					<Link
						className="nav-links"
						href={`${user?.username}`}>
						{pathname === `/${user?.username}` ? (
							<span className="flex items-center gap-4">
								<span className="profile-active">
									<Avatar size={24} />
								</span>

								<p className="font-bold nav-links-text">Profile</p>
							</span>
						) : (
							<span className="flex items-center gap-4">
								<Avatar size={24} />
								<p className="nav-links-text">Profile</p>
							</span>
						)}
					</Link>
				</span>

				<MoreOption />
			</nav>

			<NotificationBar activeLink={activeLink} />
			<SearchSideBar activeLink={activeLink} />

			{pathname === "/" ? <TopMobileNavbar /> : null}

			<MobileNavbar activeLink={pathname} />
		</header>
	);
};

export default Navbar;
