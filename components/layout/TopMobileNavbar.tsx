import { icons } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const TopMobileNavbar = () => {
	return (
		<section className="flex w-full h-[60px] justify-between px-1 pl-4 bg-primary-background fixed top-0 z-[600] border-separator-divider border-b md:hidden">
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
				<Link
					href="/notifications"
					className="p-3">
					<Image
						className="icons"
						src={icons.notification}
						alt="Notification"
						title="Notification"
					/>
				</Link>

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
