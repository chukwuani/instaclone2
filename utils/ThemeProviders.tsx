"use client";
import { ThemeProvider } from "next-themes";

const ThemeProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider enableSystem={true} disableTransitionOnChange={true} enableColorScheme={true}>
			{children}
		</ThemeProvider>
	);
};

export default ThemeProviders;
