"use client";
import { useState, useRef, useEffect } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";

interface story {
	id: number;
	username: string;
	image: string;
}

const Stories = () => {
	const wrapper = useRef<HTMLUListElement>(null);

	const [stories, setStories] = useState<story[]>([]);
	const [scroll, setScroll] = useState(0);
	const [scrollProgress, setScrollProgress] = useState(0);

	const { scrollX, scrollXProgress } = useScroll({
		container: wrapper,
	});

	useMotionValueEvent(scrollX, "change", (latest) => {
		setScroll(latest);
	});

	useMotionValueEvent(scrollXProgress, "change", () => {
		setScrollProgress(scrollXProgress.get());
	});

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetch(
				"https://dummyjson.com/users?limit=15&skip=30&select=username,image, id"
			).then((res) => res.json());

			setStories(data?.users);
		};

		fetchData();
	}, []);

	return (
		<section className="story-section">
			{scroll > 0 && (
				<button
					onClick={() => wrapper.current?.scrollBy(-wrapper.current?.offsetWidth, 0)}
					className="back-btn"
					aria-label="Go back"
				/>
			)}

			<ul
				ref={wrapper}
				className="story-slides">
				{stories.map((story) => (
					<li key={story.id}>
						<Link
							href="/"
							className="slide">
							<span className="story-ring relative">
								<span className="slide-profile">
									<Image
										src={story.image}
										alt="profile-pic"
										width={56}
										height={56}
										quality={100}
									/>
								</span>
							</span>

							<p>{story.username}</p>
						</Link>
					</li>
				))}

				<Skeleton className="w-[66px] h-[66px] rounded-full highlight-bg" />
				<Skeleton className="w-[66px] h-[66px] rounded-full highlight-bg" />
				<Skeleton className="w-[66px] h-[66px] rounded-full highlight-bg" />
				<Skeleton className="w-[66px] h-[66px] rounded-full highlight-bg" />
				<Skeleton className="w-[66px] h-[66px] rounded-full highlight-bg" />
				<Skeleton className="w-[66px] h-[66px] rounded-full highlight-bg" />
			</ul>

			{scrollProgress < 0.99 && stories.length > 6 ? (
				<button
					onClick={() => wrapper.current?.scrollBy(wrapper.current?.offsetWidth, 0)}
					className="next-btn"
					aria-label="See next"
				/>
			) : null}
		</section>
	);
};

export default Stories;
