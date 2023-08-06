import Image from "next/image";
import Link from "next/link";
import { icons } from "@/constants";

type Person = {
	image: string;
	username: string;
};

const PostHead = ({ user }: { user: Person }) => {
	return (
		<section className="flex items-center justify-between my-2 mx-2">
			<Link href="/profile" className="flex gap-[3px] items-center">
				<span className="post-story-ring">
					<span className="post-profile-pic">
						<Image src={user?.image} alt="profile-pic" width={32} height={32} quality={100} />
					</span>
				</span>

				<section className="flex items-center gap-[2px] ml-[10px]">
					<p className="primary-text text-ellipsis text-sm leading-[18px] font-semibold">
						{user?.username}
					</p>
					<Image className="ml-1" src={icons.verifiedBadge} alt="verified badge" />
				</section>
			</Link>

			<button>
				<Image className="icons" src={icons.dotMenu} alt="menu" />
			</button>
		</section>
	);
};

export default PostHead;
