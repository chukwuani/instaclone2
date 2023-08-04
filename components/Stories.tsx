"use client";
import Link from "next/link";
import Image from "next/image";

const Stories = () => {
	const stories = [
		{
			id: crypto.randomUUID(),
			image: "/images/alessia-russo.jpg",
			username: "alessiarusso99",
			link: "/",
		},
		{
			id: crypto.randomUUID(),
			image: "/images/alessia-russo.jpg",
			username: "alessiarusso99",
			link: "/",
		},
		{
			id: crypto.randomUUID(),
			image: "/images/alessia-russo.jpg",
			username: "alessiarusso99",
			link: "/",
		},
		{
			id: crypto.randomUUID(),
			image: "/images/alessia-russo.jpg",
			username: "alessiarusso99",
			link: "/",
		},
		{
			id: crypto.randomUUID(),
			image: "/images/alessia-russo.jpg",
			username: "alessiarusso99",
			link: "/",
		},
		{
			id: crypto.randomUUID(),
			image: "/images/alessia-russo.jpg",
			username: "alessiarusso99",
			link: "/",
		},
		{
			id: crypto.randomUUID(),
			image: "/images/alessia-russo.jpg",
			username: "alessiarusso99",
			link: "/",
		},
	];

	return (
		<section className="story-section">
			<button className="back-btn" aria-label="Go back" />

			<ul className="story-slides">
				{stories.map((story) => (
					<li key={story.id}>
						<Link href={story.link} className="slide">
							<span className="story-ring relative">
								<span className="slide-profile">
									<Image src={story.image} alt="profile-pic" width={56} height={56} quality={100} />
								</span>
							</span>

							<p>{story.username}</p>
						</Link>
					</li>
				))}
			</ul>

			<button className="next-btn" aria-label="See next" />
		</section>
	);
};

export default Stories;
