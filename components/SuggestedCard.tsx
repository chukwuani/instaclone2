import Image from "next/image";
import Link from "next/link";

interface User {
	id: number;
	image: string;
	username: string;
}

const SuggestedCard = ({ user }: { user: User }) => {
	return (
		<section className="flex items-center py-2 px-4">
			<Image
				className="rounded-full object-cover mr-3 bg-highlight cursor-pointer"
				src={user?.image}
				alt="avatar"
				width={44}
				height={44}
				quality={100}
			/>

			<article className="ml-3 flex-auto flex flex-col text-sm">
				<Link
					className="font-semibold"
					href="/profile">
					{user?.username}
				</Link>

				<p className="text-[12px] text-secondary-text font-normal">Suggested for you</p>
			</article>

			<Link
				className="text-[12px] ml-2 no-underline capitalize text-primary-button font-semibold"
				href="#">
				Follow
			</Link>
		</section>
	);
};

export default SuggestedCard;
