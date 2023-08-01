"use client";

import Link from "next/link";
import Image from "next/image";

const Suggested = () => {
	const currentYear = new Date().getFullYear();

	const suggestion = [
		{
			id: crypto.randomUUID(),
			image: "/images/alessia-russo.jpg",
			username: "alessiarusso99",
			followedBy: "Followed by de_real_teddy",
		},
		{
			id: crypto.randomUUID(),
			image: "/images/alessia-russo.jpg",
			username: "alessiarusso99",
			followedBy: "Followed by de_real_teddy",
		},
		{
			id: crypto.randomUUID(),
			image: "/images/alessia-russo.jpg",
			username: "alessiarusso99",
			followedBy: "Followed by de_real_teddy",
		},
		{
			id: crypto.randomUUID(),
			image: "/images/alessia-russo.jpg",
			username: "alessiarusso99",
			followedBy: "Followed by de_real_teddy",
		},
		{
			id: crypto.randomUUID(),
			image: "/images/alessia-russo.jpg",
			username: "alessiarusso99",
			followedBy: "Followed by de_real_teddy",
		},
	];

	return (
		<aside>
			<div className="flex items-center px-4">
				<Image
					src="/images/placeholder.png"
					alt="Profile picture"
					width={44}
					height={44}
					className="object-cover mr-3  cursor-pointer rounded-full"
				/>

				<div className="account-info">
					<Link className="font-semibold" href="/profile">
						the_wylde
					</Link>
					<p className="full-name">Allen Brown</p>
				</div>
			</div>

			<span className="my-2 mt-6">
				<div className="flex items-center py-2 px-4">
					<p className="suggest">Suggested for you</p>
				</div>

				{suggestion.map((list) => (
					<div key={list.id} className="suggested-account">
						<Image src={list.image} alt="avatar" width={38} height={38} quality={100} />

						<div className="suggested-account-info">
							<p>{list.username}</p>
							<p className="suggested-account-cto">{list.followedBy}</p>
						</div>

						<Link className="follow-suggested-account" href="#">
							Follow
						</Link>
					</div>
				))}
			</span>

			<p className="aside-footer-title px-4">© {currentYear} Instagram clone from me</p>
		</aside>
	);
};

export default Suggested;
