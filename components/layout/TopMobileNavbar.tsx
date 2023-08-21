import { icons } from "@/constants";
import Image from "next/image";
import Link from "next/link";

interface Props {
	activeLink: string;
	toggleNotification: () => void;
}

const TopMobileNavbar = ({ activeLink, toggleNotification }: Props) => {
	return (
		<section className="flex w-screen h-[60px] justify-between px-1 pl-4 primary-bg fixed top-0 z-[600] divider !border-x-0 !border-t-0 md:hidden">
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

			<section className="flex items-center">
				<button
					onClick={toggleNotification}
					className="p-3">
					<Image
						className="icons"
						src={activeLink === "notification" ? icons.notificationActive : icons.notification}
						alt="Notification"
						title="Notification"
					/>
				</button>

				<Link
					href="/message"
					className="p-3">
					<Image
						className="icons"
						src={icons.message}
						alt="Message"
						title="Message"
					/>
				</Link>
			</section>
		</section>
	);
};

export default TopMobileNavbar;
