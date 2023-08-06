"use client";

import { useEffect, useState } from "react";

const LoadingBar = () => {
	const [width, setWidth] = useState(0);

	useEffect(() => {
		const increment = setInterval(() => {
			if (width < 100) {
				setWidth((prev) => prev + 1);
			}
		}, 1000);

		switch (window.document.readyState) {
			case "loading":
				increment;
				console.log("loading");

				break;
			case "interactive": {
				increment;
				console.log("interective");

				break;
			}
			case "complete":
				clearInterval(increment);
				console.log("complete");

				setWidth(0);
				break;
		}
	}, [width]);

	return <div style={{ width: `${width}%` }} className="loading-bar" />;
};

export default LoadingBar;
