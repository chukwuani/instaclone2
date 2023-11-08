import { icons } from "@/constants";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

const Share = ({ posts, showSaved }: { posts: DocumentData[]; showSaved: boolean }) => {
	return (
		<>
			{posts?.length > 0 ? (
				<section className="post-grid w-full h-auto mb-5">
					{posts.map((item, index) => (
						<Link
							href={`post/${item.id}`}
							key={index}
							className="h-auto w-full relative">
							<Image
								src={item.images[0]}
								alt={item.altTexts[0]}
								width={309}
								height={309}
								className="w-full h-full object-cover aspect-square"
							/>

							{item?.images?.length > 1 && (
								<Image
									className="absolute invert top-2 right-2"
									src={icons.collection}
									alt="Post has many images"
								/>
							)}
						</Link>
					))}
				</section>
			) : (
				<section className="flex flex-col gap-4 my-[60px] mx-11 items-center justify-center text-center">
					<div className="camera-icon" />

					<h1 className="font-black text-3xl">Share Photos</h1>
					<p className="font-normal text-sm w-[70%]">
						When {showSaved ? "you" : "user"} share photos, they will appear{" "}
						{showSaved ? "on your profile" : "here"}.
					</p>
				</section>
			)}
		</>
	);
};

export default Share;
