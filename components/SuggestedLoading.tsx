import { Skeleton } from "./ui/skeleton";

const SuggestedLoading = () => {
	return (
		<aside className="w-[319px] mt-9 ml-16 flex flex-col max-[999px]:hidden">
			<section className="flex items-center px-4">
				<Skeleton className="rounded-full w-11 h-11 bg-highlight" />

				<article className="flex-auto flex flex-col text-sm ml-3">
					<Skeleton className="h-[10px] mb-3 w-3/4 rounded-none" />

					<Skeleton className="h-[10px] w-1/2 rounded-none" />
				</article>
			</section>

			<article className="my-2 mt-6">
				<Skeleton className="h-[10px] w-1/2 rounded-none mx-4 my-4" />

				{Array.from({ length: 5 }).map((_, i) => (
					<section
						key={i}
						className="flex items-center py-2 px-4">
						<Skeleton className="rounded-full w-11 h-11 mr-3 bg-highlight" />

						<article className="ml-3 flex-auto flex flex-col text-sm">
							<Skeleton className="h-[10px] w-3/4 rounded-none mb-3" />

							<Skeleton className="h-[10px] w-3/4 rounded-none" />
						</article>
					</section>
				))}
			</article>

			<Skeleton className="h-[10px] w-3/4 rounded-none mx-4" />
		</aside>
	);
};

export default SuggestedLoading;
