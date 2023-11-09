import * as React from "react";
import Image from "next/image";
import useEmblaCarousel, {
	type EmblaCarouselType,
	type EmblaOptionsType,
} from "embla-carousel-react";
import { cn } from "@/lib/utils";

interface Props {
	images: Array<string>;
	alt: Array<string>;
	options?: EmblaOptionsType;
	likePost: () => void;
}

const PostContent = ({ images, options, alt, likePost }: Props) => {
	const [emblaRef, emblaApi] = useEmblaCarousel(options);

	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);

	const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);

	const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

	const handleKeyDown = React.useCallback(
		(event: React.KeyboardEvent<HTMLButtonElement>) => {
			if (event.key === "ArrowLeft") {
				scrollPrev();
			} else if (event.key === "ArrowRight") {
				scrollNext();
			}
		},
		[scrollNext, scrollPrev]
	);

	const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
		setSelectedIndex(emblaApi.selectedScrollSnap());
		setPrevBtnDisabled(!emblaApi.canScrollPrev());
		setNextBtnDisabled(!emblaApi.canScrollNext());
	}, []);

	React.useEffect(() => {
		if (!emblaApi) return;

		onSelect(emblaApi);
		emblaApi.on("reInit", onSelect);
		emblaApi.on("select", onSelect);
	}, [emblaApi, onSelect]);

	return (
		<section className="overflow-hidden max-w-[470px] w-full flex relative">
			<section
				ref={emblaRef}
				className="w-full flex max-h-[470px]">
				<ul className="post-content relative">
					{images.map((item, index) => (
						<li
							key={index}
							className="post-content-item relative group">
							<Image
								onDoubleClick={likePost}
								className="bg-highlight"
								src={item}
								alt={alt[index]}
								priority={index === 0}
								width={470}
								height={470}
								quality={100}
							/>

							<span className="md:hidden opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white absolute rounded-[24px] p-1 px-3 top-3 right-3 text-xs">
								{index + 1 + "/" + images.length}
							</span>
						</li>
					))}
				</ul>
			</section>

			{images.length > 1 && (
				<section className="absolute left-0 bottom-0 flex items-center justify-center w-full h-auto py-4">
					{images.map((_, index) => (
						<span
							key={index}
							className={cn("indicator", selectedIndex === index && "!opacity-100")}
						/>
					))}
				</section>
			)}

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

export default PostContent;
