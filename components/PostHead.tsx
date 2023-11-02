import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { icons } from "@/constants";
import FeedMenu from "./FeedMenu";

// no-post-story-ring;
// 👆🏼 style for removing story ring in feed

const PostHead = ({ user, verified }: { user: any; verified: boolean }) => {
	return (
		<section className="flex items-center justify-between my-2 mx-2">
			<Link
				href={`/profile/${user?.username}`}
				className="flex gap-[3px] items-center">
				<span className="post-story-ring no-post-story-ring">
					<span className="post-profile-pic">
						<Image
							src={user?.image ?? "/images/placeholder.png"}
							alt="profile-pic"
							width={32}
							height={32}
							quality={100}
						/>
					</span>
				</span>

				<section className="flex flex-col">
					<section className="flex items-center gap-[2px] ml-[10px]">
						<p className="text-primary-text text-ellipsis text-sm leading-[18px] font-semibold">
							{user?.username}
						</p>

						{verified ? (
							<Image
								className="ml-1"
								src={icons.verifiedBadge}
								alt="verified badge"
								title="Verified user"
							/>
						) : null}
					</section>

					<p className="text-xs font-normal ml-[10px] text-secondary-text">{user?.fullname}</p>
				</section>
			</Link>

			<Dialog>
				<DialogTrigger asChild>
					<button type="button">
						<Image
							className="icons"
							src={icons.dotMenu}
							alt="menu"
						/>
					</button>
				</DialogTrigger>

				<DialogContent className="p-0">
					<FeedMenu />
				</DialogContent>
			</Dialog>
		</section>
	);
};

export default PostHead;
