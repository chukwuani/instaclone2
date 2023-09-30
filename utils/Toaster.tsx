"use client";

import { Toaster as RadToaster } from "react-hot-toast";

export function Toaster() {
	return (
		<RadToaster
			position="top-center"
			toastOptions={{
				// Define default options
				style: {
					background: "rgb(var(--primary-background))",
					color: "rgb(var(--primary-text))",
					border: "1px solid rgb(var(--divider))",
				},
			}}
		/>
	);
}
