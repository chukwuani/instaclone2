import { currentUser } from "@clerk/nextjs";

import Link from "next/link";
import Avatar from "./Avatar";
import SuggestedCard from "./SuggestedCard";

interface suggestion {
	id: number;
	username: string;
	image: string;
	following: string[];
	followers: string[];
	posts: string[];
}

const Suggested = async () => {
	const user = await currentUser();

	const userName = user?.username ?? `${user?.firstName ?? "no "}${user?.lastName ?? "username"}`;

	const fullName = `${user?.firstName ?? "no"} ${user?.lastName ?? "fullname"}`;

	const currentYear = new Date().getFullYear();

	const data = await fetch(
		"https://dummyjson.com/users?limit=5&skip=20&select=username,image,id"
	).then((res) => res.json());

	const suggestion: suggestion[] = data?.users;

	return (
		<aside className="w-[319px] mt-9 ml-16 flex flex-col max-[999px]:hidden">
			<section className="flex items-center px-4">
				<Link href={`/profile/${userName}`}>
					<Avatar size={44} />
				</Link>

				<article className="flex-auto flex flex-col text-sm ml-3">
					<Link
						className="font-semibold lowercase"
						href="/profile">
						{userName}
					</Link>

					<p className="text-secondary-text">{fullName}</p>
				</article>
			</section>

			<article className="my-2 mt-6">
				<h4 className="flex-auto text-[14px] font-semibold text-secondary-text flex items-center py-2 px-4">
					Suggested for you
				</h4>

				{suggestion.map((list) => (
					<SuggestedCard
						user={list}
						key={list.id}
					/>
				))}
			</article>

			<p className="opacity-50 mt-[11px] text-secondary-text font-normal text-[12px] uppercase px-4">
				© {currentYear} Instagram clone from <Link href="https://twitter.com/_stevecodes">me</Link>
			</p>
		</aside>
	);
};

export default Suggested;
