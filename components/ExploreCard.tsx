import { icons } from "@/constants";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

const ExploreCard = ({ post }: { post: DocumentData }) => {
	return (
		<Link
			href={`post/${post.id}`}
			className="h-auto w-full relative">
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
		</Link>
	);
};

export default ExploreCard;
