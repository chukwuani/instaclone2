"use client";

import NextNProgress from "nextjs-progressbar";

export function ProgressBar() {
	return (
		<NextNProgress
			color="#1877f2"
			startPosition={0.3}
			stopDelayMs={200}
			height={5}
			showOnShallow={true}
		/>
	);
}
