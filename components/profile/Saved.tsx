import Link from "next/link";
import React from "react";

const Saved = () => {
	return (
		<section className="flex justify-between relative flex-row gap-6 my-5 max-w-[950px] max-md:flex-col max-md:items-center max-md:h-full max-md:justify-center">
			<p className="font-normal text-[13px] text-secondary-text">
				Only you can see what you&apos;ve saved
			</p>

			<section className="saved-post-grid">
				<section className="max-w-[300px] w-full h-full pl-5 pb-[10px] text-white flex items-end bg-transparent">
					<h2 className="font-medium text-[1.3rem]">All Posts</h2>
				</section>
			</section>

			<Link
				className="font-semibold text-sm text-primary-button mb-5"
				href="#">
				+ New Collection
			</Link>
		</section>
	);
};

export default Saved;
