import { icons } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopMobileNavbar = ({
	activeLink,
	toggleNotification,
}: {
	activeLink: string;
	toggleNotification: Function;
}) => {
	return (
		<div className="flex w-screen h-[60px] justify-between px-1 pl-4 primary-bg fixed top-0 z-[600] divider !border-x-0 !border-t-0 md:hidden">
			<Link
				href="/"
				className="flex items-center justify-center">
				<Image
					className="icons"
					src={icons.textLogo}
					alt="Instagram"
					priority
				/>
			</Link>

			<div className="flex items-center">
				<button
					onClick={() => toggleNotification()}
					className="p-3">
					{activeLink === "notification" ? (
						<span className="flex items-center gap-4">
							<Image
								className="icons"
								src={icons.notificationActive}
								alt="Notification"
								title="Notification"
							/>
						</span>
					) : (
						<span className="flex items-center gap-4">
							<Image
								className="icons"
								src={icons.notification}
								alt="Notification"
								title="Notification"
							/>
						</span>
					)}
				</button>

				<Link
					href="/message"
					className="p-3">
					{activeLink === "/message" ? (
						<span className="flex items-center gap-4">
							<Image
								className="icons"
								src={icons.messageActive}
								alt="Message"
								title="Message"
							/>
						</span>
					) : (
						<span className="flex items-center gap-4">
							<Image
								className="icons"
								src={icons.message}
								alt="Message"
								title="Message"
							/>
						</span>
					)}
				</Link>
			</div>
		</div>
	);
};

export default TopMobileNavbar;
