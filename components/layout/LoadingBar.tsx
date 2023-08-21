"use client";

import { useState } from "react";

const LoadingBar = () => {
	const [width, setWidth] = useState(0);

	const increment = setInterval(() => {
		if (width < 100) {
			setWidth((prev) => prev + 10);
		}
	}, 1000);

	return (
		<div
			style={{ width: `${width}%` }}
			className="loading-bar"
		/>
	);
};

export default LoadingBar;
