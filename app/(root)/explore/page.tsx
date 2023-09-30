"use client";
import ExploreCard from "@/components/ExploreCard";

const Page = () => {
	return (
		<main className="main-content max-md:!absolute">
			<section className="discover-page">
				<section className="md:hidden flex w-full">
					<div className="search-container w-full m-4 relative">
						<span className="mr-3">
							<svg
								aria-label="Search"
								className="_ab6-"
								color="#8e8e8e"
								fill="#8e8e8e"
								height="16"
								role="img"
								viewBox="0 0 24 24"
								width="16">
								<path
									d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"></path>
								<line
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									x1="16.511"
									x2="22"
									y1="16.511"
									y2="22"></line>
							</svg>
						</span>

						<input
							className="search"
							type="search"
							name="search"
							id="search"
							placeholder="search"
						/>
					</div>
				</section>
				<ExploreCard />
			</section>
		</main>
	);
};

export default Page;
