import { icons } from "@/constants";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Saved = ({ saves }: { saves: DocumentData[] }) => {
	return (
		<section className="flex flex-col items-center relative gap-6 mt-5 mb-7 max-w-[950px] max-md:h-full max-md:mb-[70px]">
			<p className="font-normal text-[13px] text-secondary-text">
				Only you can see what you&apos;ve saved
			</p>

			<>
				{saves?.length > 0 ? (
					<section className="post-grid w-full h-auto">
						{saves.map((item, index) => (
							<Link
								href={`post/${item?.id}`}
								key={index}
								className="h-auto w-full relative">
								<Image
									src={item?.images[0]}
									alt={item?.altTexts[0]}
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
					<section className="saved-post-grid">
						<section className="max-w-[300px] w-full h-full pl-5 pb-[10px] text-white flex items-end bg-transparent">
							<h2 className="font-medium text-[1.3rem]">No Posts</h2>
						</section>
					</section>
				)}
			</>
		</section>
	);
};

export default Saved;
