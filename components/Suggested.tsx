// million-ignore
import { currentUser } from "@clerk/nextjs";

import Link from "next/link";
import Avatar from "./Avatar";
import SuggestedCard from "./SuggestedCard";

import { getSuggestedUsers } from "@/firebase/firebaseService";
import { DocumentData } from "firebase/firestore";

const Suggested = async () => {
	const user = await currentUser();
	const userId = user?.id as string;

	const currentYear = new Date().getFullYear();

	const suggestion: DocumentData[] = await getSuggestedUsers(userId, 5);

	return (
		<aside className="w-[319px] mt-9 ml-16 flex flex-col max-[999px]:hidden">
			<section className="flex items-center px-4">
				<Link href={`${user?.username}`}>
					<Avatar size={44} />
				</Link>

				<article className="flex-auto flex flex-col text-sm ml-3">
					<Link
						className="font-semibold lowercase"
						href={`${user?.username}`}>
						{user?.username}
					</Link>

					<p className="text-secondary-text">
						{user?.firstName} {user?.lastName}
					</p>
				</article>
			</section>

			<article className="my-2 mt-6">
				<h4 className="flex-auto text-[14px] font-semibold text-secondary-text flex items-center py-2 px-4">
					Suggested for you
				</h4>

				{suggestion.map((list) => (
					<SuggestedCard
						user={list}
						loggedInUserId={user?.id}
						key={list?.userId}
					/>
				))}

				{suggestion.length <= 0 && (
					<p className="opacity-50 mt-[11px] text-secondary-text font-normal text-[12px] uppercase px-4">
						No suggested users
					</p>
				)}
			</article>

			<p className="opacity-50 mt-[11px] text-secondary-text font-normal text-[12px] uppercase px-4">
				© {currentYear} Instagram clone from <Link href="https://twitter.com/_stevecodes">me</Link>
			</p>
		</aside>
	);
};

export default Suggested;
