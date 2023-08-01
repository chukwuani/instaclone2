import Image from "next/image";
import Link from "next/link";
import { icons } from "@/constants";

const PostHead = ({ user }: { user: any }) => {
	return (
		<div className="flex items-center justify-between my-2 mx-2">
			<Link href="/profile" className="flex gap-[3px] items-center">
				<span className="post-story-ring">
					<span className="post-profile-pic">
						<Image src={user?.image} alt="profile-pic" width={32} height={32} quality={100} />
					</span>
				</span>

				<span className="flex items-center gap-[2px] ml-[10px]">
					<p className="post-username">{user?.username}</p>
					<Image className="ml-1" src={icons.verifiedBadge} alt="verified badge" />
				</span>
			</Link>

			<button>
				<Image src={icons.dotMenu} alt="menu" />
			</button>
		</div>
	);
};

export default PostHead;
