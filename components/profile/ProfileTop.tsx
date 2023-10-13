"use client";
// million-ignore
import Image from "next/image";
import { icons } from "@/constants";
import { useUser } from "@clerk/nextjs";
import MobileStats from "@/components/MobileStats";
import ProfileMenu from "@/components/profile/ProfileMenu";
import { useRef } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

const ProfileTop = () => {
	const { user } = useUser();
	const userName = user?.username
		? user?.username
		: `${user?.firstName ?? "no "}${user?.lastName ?? "username"}`;

	return (
		<>
			<section className="user-profile-head-container">
				<span className="user-profile-picture">
					<Image
						src={user?.imageUrl ?? "/images/placeholder.png"}
						width={150}
						height={150}
						alt="Profile Photo"
						title="Profile Photo"
					/>
				</span>

				<section className="flex flex-col basis-[30px] gap-5 grow-[2] max-w-[613px] w-full">
					<section className="flex items-center max-md:flex-col max-md:items-start max-md:gap-3">
						<section className="lowercase flex items-center gap-[5px]">
							<h1 className="font-normal h-min text-xl">{userName}</h1>

							<Dialog>
								<DialogTrigger asChild>
									<button className="p-2 icons cursor-pointer hidden max-[768px]:flex">
										<Image
											src={icons.gear}
											alt="gear icon"
										/>
									</button>
								</DialogTrigger>

								<DialogContent className="p-0">
									<ProfileMenu />
								</DialogContent>
							</Dialog>
						</section>

						<Link
							className="edit-profile"
							href="#">
							Edit profile
						</Link>

						<Dialog>
							<DialogTrigger asChild>
								<button className="p-2 cursor-pointer icons max-[768px]:hidden">
									<Image
										src={icons.gear}
										alt="gear icon"
									/>
								</button>
							</DialogTrigger>

							<DialogContent className="p-0">
								<ProfileMenu />
							</DialogContent>
						</Dialog>
					</section>

					<article className="profile-stats-2">
						<p>
							<a
								className="cursor-auto"
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
					</article>

					<article className="hidden md:flex flex-col leading-7">
						<p className="name">
							{user?.firstName ?? "no"} {user?.lastName ?? "fullname"}
						</p>

						<p>
							I&apos;m a mysterious individual who has yet to fill out my bio. One thing&apos;s for
							certain: I will fill it out one day!
						</p>
					</article>
				</section>
			</section>

			<MobileStats />
		</>
	);
};

export default ProfileTop;
