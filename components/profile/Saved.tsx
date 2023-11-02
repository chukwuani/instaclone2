import Link from "next/link";
import React from "react";

const Saved = () => {
	return (
		<section className="flex flex-col justify-center items-center relative gap-6 mt-5 mb-7 max-w-[950px] max-md:h-full max-md:mb-[70px]">
			<p className="font-normal text-[13px] text-secondary-text">
				Only you can see what you&apos;ve saved
			</p>

			<section className="saved-post-grid">
				<section className="max-w-[300px] w-full h-full pl-5 pb-[10px] text-white flex items-end bg-transparent">
					<h2 className="font-medium text-[1.3rem]">All Posts</h2>
				</section>
			</section>
		</section>
	);
};

export default Saved;
