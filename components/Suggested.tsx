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
			<section className="flex items-center px-4">
				<Image
					src="/images/placeholder.png"
					alt="Profile picture"
					width={44}
					height={44}
					className="object-cover mr-3  cursor-pointer rounded-full"
				/>

				<article className="flex-auto flex flex-col text-sm">
					<Link className="font-semibold" href="/profile">
						the_wylde
					</Link>
					<p className="full-name">Allen Brown</p>
				</article>
			</section>

			<article className="my-2 mt-6">
				<h4 className="suggest flex items-center py-2 px-4">Suggested for you</h4>

				{suggestion.map((list) => (
					<section key={list.id} className="flex items-center py-2 px-4">
						<Image
							className="suggested-account-img"
							src={list.image}
							alt="avatar"
							width={38}
							height={38}
							quality={100}
						/>

						<article className="ml-3 flex-auto flex flex-col text-sm">
							<Link className="font-semibold" href="/profile">
								{list.username}
							</Link>

							<p className="followedby">{list.followedBy}</p>
						</article>

						<Link className="follow-suggested-account" href="#">
							Follow
						</Link>
					</section>
				))}
			</article>

			<p className="aside-footer-title px-4">© {currentYear} Instagram clone from me</p>
		</aside>
	);
};

export default Suggested;
