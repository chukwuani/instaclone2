import { Skeleton } from "./ui/skeleton";

const CommentLoading = () => {
	return (
		<>
			{Array.from({ length: 10 }).map((_, i) => (
				<section
					className="flex justify-start w-full py-2"
					key={i}>
					<Skeleton className="w-11 h-11 rounded-full mr-3 aspect-square" />

					<section className="flex gap-3 flex-col w-full justify-center items-start">
						<Skeleton className="h-[10px] w-1/2 rounded-none" />

						<Skeleton className="h-[10px] w-3/4 rounded-none" />
					</section>
				</section>
			))}
		</>
	);
};

export default CommentLoading;
