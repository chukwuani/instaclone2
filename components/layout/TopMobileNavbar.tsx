import { icons } from "@/constants";
import Image from "next/image";
import Link from "next/link";

interface Props {
	activeLink: string;
	toggleNotification: () => void;
}

const TopMobileNavbar = ({ activeLink, toggleNotification }: Props) => {
	return (
		<section className="flex w-screen h-[60px] justify-between px-1 pl-4 bg-primary-background fixed top-0 z-[600] border-separator-divider border-b md:hidden">
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
