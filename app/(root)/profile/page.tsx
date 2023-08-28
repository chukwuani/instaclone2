// million-ignore

import { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import ProfileBottom from "@/components/profile/ProfileBottom";
import ProfileTop from "@/components/profile/ProfileTop";

export const metadata: Metadata = {
	title: "Profile • Instagram photos and videos",
	description: "See Instagram photos and videos from user",
	icons: {
		icon: "/images/instagram-logo.png",
	},
};

export default function Page() {
	return (
		<main className="main-content">
			<section className="user-profile">
				<ProfileTop />
				<ProfileBottom />

				<Footer />
			</section>
		</main>
	);
}
