import Image from "next/image";
import Link from "next/link";
import { icons } from "@/constants";
import { RefObject } from "react";

type Person = {
	image: string;
	username: string;
};

// no-post-story-ring;
// 👆🏼 style for removing story ring in feed

const PostHead = ({
	user,
	dialog,
	verified,
}: {
	user: Person;
	dialog: RefObject<HTMLDialogElement>;
	verified: boolean;
}) => {
	return (
		<section className="flex items-center justify-between my-2 mx-2">
			<Link
				href="/profile"
				className="flex gap-[3px] items-center">
				<span className="post-story-ring">
					<span className="post-profile-pic">
						<Image
							src={user?.image}
							alt="profile-pic"
							width={32}
							height={32}
							quality={100}
						/>
					</span>
				</span>

				<section className="flex items-center gap-[2px] ml-[10px]">
					<p className="text-primary-text text-ellipsis text-sm leading-[18px] font-semibold">
						{user?.username}
					</p>

					{verified ? (
						<Image
							className="ml-1"
							src={icons.verifiedBadge}
							alt="verified badge"
						/>
					) : null}
				</section>
			</Link>

			<button
				type="button"
				onClick={() => {
					dialog.current?.showModal();
					document.body.classList.add("modal-open");
				}}>
				<Image
					className="icons"
					src={icons.dotMenu}
					alt="menu"
				/>
			</button>
		</section>
	);
};

export default PostHead;
