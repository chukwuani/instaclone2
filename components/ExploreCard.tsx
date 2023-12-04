import { icons } from "@/constants";
import { DocumentData } from "firebase/firestore";
import { HeartIcon, MessageCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ExploreCard = ({ post }: { post: DocumentData }) => {
	return (
		<Link
			href={`post/${post.id}`}
			className="h-auto w-full relative group">
			<Image
				src={post.images[0]}
				alt={post.altTexts[0]}
				width={309}
				height={309}
				className="w-full h-full object-cover aspect-square"
			/>

			{post?.images?.length > 1 && (
				<Image
					className="absolute invert top-2 right-2"
					src={icons.collection}
					alt="Post has many images"
				/>
			)}

			<span className="hidden group-hover:flex items-center justify-center gap-6 flex-wrap bg-black/30 w-full h-full absolute top-0 left-0 max-md:flex-col max-md:gap-2">
				<p className="text-white font-bold text-lg uppercase flex items-center gap-2 max-md:text-sm">
					<HeartIcon className="fill-white w-5" />
					{post.likes?.length}
				</p>

				<p className="text-white font-bold text-lg uppercase flex items-center gap-2 max-md:text-sm">
					<MessageCircleIcon className="rotate-[270deg] fill-white w-5" />
					{post.comments?.length}
				</p>
			</span>
		</Link>
	);
};

export default ExploreCard;
