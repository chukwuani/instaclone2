import Image from "next/image";
import Link from "next/link";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface User {
	id: number;
	image: string;
	username: string;
}

const SuggestedCard = ({ user }: { user: User }) => {
	return (
		<section className="flex items-center py-2 px-4">
			<HoverCard>
				<HoverCardTrigger asChild>
					<Image
						className="rounded-full object-cover mr-3 bg-highlight cursor-pointer"
						src={user?.image}
						alt="avatar"
						width={44}
						height={44}
						quality={100}
					/>
				</HoverCardTrigger>
				<HoverCardContent className="w-80 bg-primary-background border-0">
					<div className="flex justify-between space-x-4">
						<div className="space-y-1">
							<h4 className="text-sm font-semibold">@nextjs</h4>
							<p className="text-sm">The React Framework - created and maintained by @vercel.</p>
							<div className="flex items-center pt-2">
								<span className="text-xs text-muted-foreground">Joined December 2021</span>
							</div>
						</div>
					</div>
				</HoverCardContent>
			</HoverCard>

			<article className="ml-3 flex-auto flex flex-col text-sm">
				<Link
					className="font-semibold"
					href="/profile">
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
