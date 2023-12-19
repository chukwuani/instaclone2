import React from "react";
import CommentLoading from "../CommentLoading";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query";
import Image from "next/image";

type CommentCardProps = {
	data: {
		body: string;
		imageUrl: string;
		username: string;
		userId: string;
		postId: string;
	}[];
	isLoading: boolean;
	error: unknown;
	refetch: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<any[], unknown>>;
};

const CommentCard = ({ data, isLoading, error, refetch }: CommentCardProps) => {
	return (
		<section className="flex flex-col overflow-y-auto h-full p-4">
			{data?.map((item, i) => (
				<section
					className="flex justify-start w-full pt-[5px] pr-4 pb-4"
					key={i}>
					<Image
						src={item.imageUrl}
						alt="User profile"
						width={32}
						height={32}
						className="w-8 h-8 rounded-full mr-[18px] aspect-square"
					/>

					<p className="text-sm text-primary-text leading-5">
						<span className="font-semibold">{item.username}</span> {item.body}
					</p>
				</section>
			))}

			{isLoading && <CommentLoading />}

			{error ? (
				<section className="m-auto flex flex-col gap-3 justify-center items-center h-full">
					<p className="text-sm text-primary-text max-w-[250px] text-center">
						Error while fetching comments.
					</p>

					<button
						onClick={() => refetch()}
						className="bg-secondary-button-background flex items-center justify-center text-primary-text rounded-[8px] py-[7px] px-4 text-sm font-semibold h-fi hover:bg-hover-secondary-button">
						Try again
					</button>
				</section>
			) : null}
		</section>
	);
};

export default CommentCard;
