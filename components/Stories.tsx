"use client";
import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import useEmblaCarousel, {
	type EmblaCarouselType,
	type EmblaOptionsType,
} from "embla-carousel-react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";

type story = {
	id: number;
	username: string;
	image: string;
};

const Stories = ({ options }: { options?: EmblaOptionsType }) => {
	const random = Math.floor(Math.random() * 20);

	const { isLoading, error, data } = useQuery({
		queryKey: ["storyData"],
		queryFn: () =>
			fetch(`https://dummyjson.com/users?limit=${random}&skip=30&select=username,image,id`).then(
				(res) => res.json()
			),
	});

	const [emblaRef, emblaApi] = useEmblaCarousel(options);

	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

	const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);

	const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLButtonElement>) => {
			if (event.key === "ArrowLeft") {
				scrollPrev();
			} else if (event.key === "ArrowRight") {
				scrollNext();
			}
		},
		[scrollNext, scrollPrev]
	);

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setPrevBtnDisabled(!emblaApi.canScrollPrev());
		setNextBtnDisabled(!emblaApi.canScrollNext());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect(emblaApi);
		emblaApi.on("reInit", onSelect);
		emblaApi.on("select", onSelect);
	}, [emblaApi, onSelect]);

	if (isLoading)
		return (
			<section className="story-section">
				<ul className="story-slides">
					{Array.from({ length: 6 }).map((_, i) => (
						<li key={i}>
							<Skeleton className="w-[66px] h-[66px] bg-highlight rounded-full" />
						</li>
					))}
				</ul>
			</section>
		);

	return (
		<section className="story-section">
			<section
				ref={emblaRef}
				className="w-full flex">
				<ul className="story-slides">
					{data?.users?.map((story: story) => (
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
				</ul>
			</section>

			<button
				onKeyDown={handleKeyDown}
				disabled={prevBtnDisabled}
				onClick={scrollPrev}
				className="back-btn"
				aria-label="Go back">
				<span className="sr-only">Previous slide</span>
			</button>

			<button
				onKeyDown={handleKeyDown}
				disabled={nextBtnDisabled}
				onClick={scrollNext}
				className="next-btn"
				aria-label="See next">
				<span className="sr-only">Next slide</span>
			</button>
		</section>
	);
};

export default Stories;
