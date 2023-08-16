"use client";
import { ThemeProvider as Themes } from "next-themes";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<Themes
			enableSystem={true}
			disableTransitionOnChange={true}
			enableColorScheme={true}>
			{children}
		</Themes>
	);
};

export default ThemeProvider;
