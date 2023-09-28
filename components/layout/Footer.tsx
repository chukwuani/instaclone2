import Link from "next/link";

const Footer = () => {
	const currentYear = new Date().getFullYear();
	const footerLinks = [
		{ label: "Meta", href: "#" },
		{ label: "About", href: "#" },
		{ label: "Blog", href: "#" },
		{ label: "Jobs", href: "#" },
		{ label: "Help", href: "#" },
		{ label: "API", href: "#" },
		{ label: "Privacy", href: "#" },
		{ label: "Terms", href: "#" },
		{ label: "Top Accounts", href: "#" },
		{ label: "Hashtags", href: "#" },
		{ label: "Locations", href: "#" },
		{ label: "Instagram Lite", href: "#" },
		{ label: "Contact Uploading & Non-Users", href: "#" },
		{ label: "English", href: "#" },
	];

	return (
		<footer className="hidden md:flex w-auto mb-[52px] leading-5">
			<ul className="flex gap-5 text-center items-center justify-center flex-wrap break-words max-w-[982px] w-full leading-[45px]">
				{footerLinks.map((links) => (
					<li
						key={links.label}
						className="text-sm list-none">
						<Link
							className="text-secondary-text no-underline"
							href={links.href}>
							{links.label}
						</Link>
					</li>
				))}

				<li className="text-sm list-none">
					<p className="text-secondary-text text-sm">© {currentYear} Instagram clone from Me</p>
				</li>
			</ul>
		</footer>
	);
};

export default Footer;
