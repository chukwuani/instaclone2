"use client";

import MobileStats from "@/components/MobileStats";
import ProfileMenu from "@/components/ProfileMenu";
import Image from "next/image";
import { icons } from "@/constants";
import { useUser } from "@clerk/nextjs";
// import { Metadata } from "next";
import { useRef, useState } from "react";
import Share from "@/components/Share";
import Saved from "@/components/Saved";
import Tagged from "@/components/Tagged";
import Footer from "@/components/Footer";

// export const metadata: Metadata = {
// 	title: "Profile • Instagram photos and videos",
// 	description: "See Instagram photos and videos from user",
// 	icons: {
// 		icon: "/images/instagram-logo.png",
// 	},
// };

export default function Page() {
	const dialog = useRef<HTMLDialogElement>(null);
	const { user } = useUser();
	const userName = user?.username
		? user?.username
		: `${user?.firstName ?? "no"}${user?.lastName ?? "username"}`;

	const [activeCta, setActivecta] = useState("Share");
	return (
		<main className="main-content">
			<section className="user-profile">
				<div className="user-profile-head-container">
					<span className="user-profile-picture">
						<Image
							src={user?.imageUrl ?? "/images/placeholder.png"}
							width={150}
							height={150}
							alt="Profile Photo"
						/>
					</span>

					<div className="user-profile-stats">
						<div className="profile-stats-1">
							<span className="lowercase flex items-center gap-[5px]">
								<h1>{userName}</h1>

								<span
									className="profile-setting icons cursor-pointer !hidden max-[768px]:!flex"
									onClick={() => {
										dialog.current?.showModal();
										document.body.classList.add("modal-open");
									}}>
									<Image
										src={icons.gear}
										alt="gear icon"
									/>
								</span>
							</span>

							<a
								className="edit-profile"
								href="#">
								Edit profile
							</a>

							<span
								className="profile-setting cursor-pointer icons"
								onClick={() => {
									dialog.current?.showModal();
									document.body.classList.add("modal-open");
								}}>
								<Image
									src={icons.gear}
									alt="gear icon"
								/>
							</span>
						</div>

						<div className="profile-stats-2">
							<p>
								<a
									className="number-post"
									href="#">
									0
								</a>{" "}
								posts
							</p>
							<p>
								<a href="#">0</a> followers
							</p>
							<p>
								<a href="#">0</a> following
							</p>
						</div>

						<div className="profile-stats-3">
							<p className="name">
								{user?.firstName} {user?.lastName}
							</p>
							<span className="bio">
								<p>
									I&apos;m a mysterious individual who has yet to fill out my bio. One thing&apos;s
									for certain: I will fill it out one day!
								</p>
							</span>
						</div>
					</div>
				</div>

				<MobileStats />

				<div className="user-profile-bottom-section-container">
					<div className="user-profile-bottom-cta">
						<ul className="user-profile-bottom-cta-list-item">
							<li
								className={activeCta === "Share" ? "active-bottom-cta user-cta" : "user-cta"}
								onClick={() => setActivecta("Share")}>
								<span>
									<svg
										aria-label=""
										className="_ab6-"
										color="#8e8e8e"
										fill="#8e8e8e"
										height="12"
										role="img"
										viewBox="0 0 24 24"
										width="12">
										<rect
											fill="none"
											height="18"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											width="18"
											x="3"
											y="3"></rect>
										<line
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											x1="9.015"
											x2="9.015"
											y1="3"
											y2="21"></line>
										<line
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											x1="14.985"
											x2="14.985"
											y1="3"
											y2="21"></line>
										<line
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											x1="21"
											x2="3"
											y1="9.015"
											y2="9.015"></line>
										<line
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											x1="21"
											x2="3"
											y1="14.985"
											y2="14.985"></line>
									</svg>
								</span>
								<p>POSTS</p>
							</li>
							<li
								className={activeCta === "Saved" ? "active-bottom-cta user-cta" : "user-cta"}
								onClick={() => setActivecta("Saved")}>
								<span>
									<svg
										aria-label=""
										className="_ab6-"
										color="#8e8e8e"
										fill="#8e8e8e"
										height="12"
										role="img"
										viewBox="0 0 24 24"
										width="12">
										<polygon
											fill="none"
											points="20 21 12 13.44 4 21 4 3 20 3 20 21"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"></polygon>
									</svg>
								</span>
								<p>SAVED</p>
							</li>
							<li
								className={activeCta === "Tagged" ? "active-bottom-cta user-cta" : "user-cta"}
								onClick={() => setActivecta("Tagged")}>
								<span>
									<svg
										aria-label=""
										className="_ab6-"
										color="#8e8e8e"
										fill="#8e8e8e"
										height="12"
										role="img"
										viewBox="0 0 24 24"
										width="12">
										<path
											d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z"
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"></path>
										<path
											d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603"
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"></path>
										<circle
											cx="12.072"
											cy="11.075"
											fill="none"
											r="3.556"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"></circle>
									</svg>
								</span>
								<p>TAGGED</p>
							</li>
						</ul>
					</div>

					{activeCta === "Share" && <Share />}
					{activeCta === "Saved" && <Saved />}
					{activeCta === "Tagged" && <Tagged />}
				</div>

				<Footer />
			</section>

			<ProfileMenu dialog={dialog} />
		</main>
	);
}
