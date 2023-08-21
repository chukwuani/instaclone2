import Image from "next/image";

const ExploreCard = () => {
	return (
		<section className="discover-page-one">
			<section className="discover-item-span">
				<Image
					width={309}
					height={300}
					className="discover-item"
					id="image"
					src="https://source.unsplash.com/random?sig=1"
					alt="unsplash"
				/>
			</section>

			<section className="discover-item-span">
				<Image
					width={309}
					height={300}
					className="discover-item"
					alt="random"
					src="https://source.unsplash.com/random?sig=2"
				/>
			</section>

			<section className="discover-item-span">
				<Image
					width={309}
					height={300}
					className="discover-item"
					id="image"
					src="https://source.unsplash.com/random?sig=3"
					alt="unsplash"
				/>
			</section>

			<section className="discover-item-span">
				<Image
					width={309}
					height={300}
					className="discover-item"
					alt="random"
					src="https://source.unsplash.com/random?sig=4"
				/>
			</section>

			<section className="discover-item-span reel-1">
				<Image
					width={309}
					height={300}
					className="discover-item span-1"
					alt="random"
					src="https://source.unsplash.com/random?sig=5"
				/>
			</section>

			<section className="discover-item-span">
				<Image
					width={309}
					height={300}
					className="discover-item"
					alt="random"
					src="https://source.unsplash.com/random?sig=6"
				/>
			</section>

			<section className="discover-item-span">
				<Image
					width={309}
					height={300}
					className="discover-item"
					alt="random"
					src="https://source.unsplash.com/random?sig=7"
				/>
			</section>

			<section className="discover-item-span">
				<Image
					width={309}
					height={300}
					className="discover-item"
					alt="random"
					src="https://source.unsplash.com/random?sig=8"
				/>
			</section>

			<section className="discover-item-span">
				<Image
					width={309}
					height={300}
					className="discover-item"
					alt="random"
					src="https://source.unsplash.com/random?sig=9"
				/>
			</section>

			<section className="discover-item-span reel-2">
				<Image
					width={309}
					height={300}
					className="discover-item span-2"
					alt="random"
					src="https://source.unsplash.com/random?sig=10"
				/>
			</section>
		</section>
	);
};

export default ExploreCard;
