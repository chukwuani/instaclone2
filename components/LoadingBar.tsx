"use client";

import NextTopLoader from "nextjs-toploader";

const LoadingBar = () => {
	return (
		<NextTopLoader
			color="linear-gradient(
		to right,
		rgb(211, 0, 197),
		rgb(255, 1, 105),
		rgb(255, 122, 0),
		rgb(255, 214, 0),
		rgb(255, 122, 0),
		rgb(255, 1, 105),
		rgb(211, 0, 197)
	)"
			initialPosition={0.08}
			crawlSpeed={200}
			height={3}
			crawl={true}
			showSpinner={false}
			easing="ease"
			speed={200}
		/>
	);
};

export default LoadingBar;
