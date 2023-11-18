import ExploreCard from "@/components/ExploreCard";
import { icons } from "@/constants";
import { getExplorePost } from "@/firebase/firebaseService";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";

const Home = async () => {
	const user = await currentUser();
	const posts = await getExplorePost(user?.id as string);

	if (!posts) return <p>No post to explore</p>;

	return (
		<main className="main-content">
			{posts.length > 0 ? (
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

					<section className="discover-page-wrapper">
						{posts.map((item, index) => (
							<ExploreCard
								post={item}
								key={index}
							/>
						))}
					</section>
				</section>
			) : (
				<main className="max-h-[calc(100dvh - 50px)] h-full items-center justify-center">
					<article className="max-w-[600px] h-[100dvh] w-full flex-auto flex flex-col items-center justify-center gap-4 py-5 px-10 text-center">
						<Image
							src={icons.pose}
							className="icons"
							alt="Cartoon person posing for a photo"
						/>
						<h1 className="text-secondary-text text-sm">Explore the Void: No Suggestions Yet</h1>
						<p className="text-secondary-text text-sm max-w-[400px]">
							Oh no, it looks like the suggestion well is temporarily dry! Fear not, intrepid
							explorer.
						</p>
					</article>
				</main>
			)}
		</main>
	);
};

export default Home;
