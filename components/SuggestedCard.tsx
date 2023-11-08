import Image from "next/image";
import Link from "next/link";

import { DocumentData } from "firebase/firestore";

const SuggestedCard = ({ user }: DocumentData) => {
	return (
		<section className="flex items-center py-2 px-4">
			<Link href={`${user?.username}`}>
				<Image
					className="rounded-full object-cover mr-3 bg-highlight cursor-pointer"
					src={user?.imageUrl}
					alt="avatar"
					width={44}
					height={44}
					quality={100}
				/>
			</Link>

			<article className="ml-3 flex-auto flex flex-col text-sm">
				<Link
					className="font-semibold"
					href={`${user?.username}`}>
					{user?.username}
				</Link>

				<p className="text-[12px] text-secondary-text font-normal">Suggested for you</p>
			</article>

			<Link
				className="text-[12px] ml-2 no-underline capitalize text-primary-button hover:text-link transition-colors duration-300 font-semibold"
				href="#">
				Follow
			</Link>
		</section>
	);
};

export default SuggestedCard;
