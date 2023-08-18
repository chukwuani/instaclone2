"use client";

import { useEffect, useRef } from "react";

const ExploreCard = () => {
	const video = useRef<HTMLVideoElement>(null);

	const toggleVideo = () => {
		if (video.current?.paused === true) {
			video.current?.play();
		} else {
			video.current?.pause();
		}
	};

	return (
		<article className="max-w-[470px] w-full h-auto flex flex-col primary-bg relative">
			<div className="reel-video relative">
				<video
					onClick={toggleVideo}
					ref={video}
					width={470}
					height={"auto"}
					loop
					autoPlay
					title="Rick Astley - Never Gonna Give You Up (Official Music Video)">
					<source
						src="https://res.cloudinary.com/deghol0i0/video/upload/v1691379653/Rick_Astley_-_Never_Gonna_Give_You_Up_Official_Music_Video_1_i0ywl7.mp4"
						type="video/mp4"
					/>
				</video>
			</div>

			<p className="left-0 bottom-0 absolute text-base leading-[25px] text-white py-4 px-3">
				How do you rickroll someone who knows about rickrolling? You don&apos;t. You just give them
				up, let them down, run around and desert them. No discover page or reels at the moment.
			</p>
		</article>
	);
};

export default ExploreCard;
