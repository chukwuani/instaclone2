"use client";

const ExploreCard = () => {
	return (
		<article className="max-w-[470px] w-full h-auto overflow-hidden flex flex-col primary-bg rounded-[8px] border-seperator mb-3">
			<ul className="post-content">
				<li className="post-content-item">
					<video
						width={470}
						height={"auto"}
						autoPlay={true}
						loop
						controls
						title="Rick Astley - Never Gonna Give You Up (Official Music Video)">
						<source
							src="https://res.cloudinary.com/deghol0i0/video/upload/v1691379653/Rick_Astley_-_Never_Gonna_Give_You_Up_Official_Music_Video_1_i0ywl7.mp4"
							type="video/mp4"
						/>
					</video>
				</li>
			</ul>

			<article className="flex flex-col gap-[13px] py-4 px-3">
				<p className="text-sm leading-[23px] primary-text">
					How do you rickroll someone who knows about rickrolling? You don&apos;t. You just give
					them up, let them down, run around and desert them.
					<br />
					<span className="font-bold">No discover page or reels at the moment.</span>
				</p>
			</article>
		</article>
		// <section>

		// 	<p>No discover page or reels yet. Enjoy this for now.</p>
		// </section>
	);
};

export default ExploreCard;
