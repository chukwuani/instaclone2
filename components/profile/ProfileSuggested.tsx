import * as React from "react";

import useEmblaCarousel, {
	type EmblaCarouselType,
	type EmblaOptionsType,
} from "embla-carousel-react";

import ProfileSuggestedCard from "./ProfileSuggestedCard";
import { useProfileTopContext } from "./ProfileTop";

const ProfileSuggested = ({ options }: { options?: EmblaOptionsType }) => {
	const { suggestion } = useProfileTopContext();
	const [emblaRef, emblaApi] = useEmblaCarousel(options);

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
		<section className="overflow-hidden w-full relative max-md:px-5 mb-10">
			<p className="text-sm text-secondary-text font-semibold mb-3">Suggested</p>

			<section ref={emblaRef}>
				<ul className="flex gap-3 items-center">
					{suggestion.map((item, i) => (
						<ProfileSuggestedCard
							key={i}
							suggestion={item}
						/>
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

export default ProfileSuggested;
