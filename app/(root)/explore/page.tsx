import ExploreCard from "@/components/ExploreCard";

const page = async () => {
	const data = await fetch(
		`https://api.unsplash.com/search/photos/?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&query=street-photography,people`
	).then((res) => res.json());

	const RANDOM_IMAGES = data.results.map((item: any) => item.urls.regular);

	return (
		<main className="main-content">
			<section className="discover-page">
				<ExploreCard />
			</section>
		</main>
	);
};

export default page;
