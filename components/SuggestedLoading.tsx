import { Skeleton } from "./ui/skeleton";

const SuggestedLoading = () => {
	return (
		<section className="flex items-center py-2 px-4">
			<Skeleton className="rounded-full w-11 h-11 mr-3 bg-highlight" />

			<article className="ml-3 gap-3 flex-auto flex flex-col text-sm">
				<Skeleton className="font-semibold h-3 rounded-full w-1/2 bg-highlight" />

				<Skeleton className="text-[12px] h-3 rounded-full w-3/4 bg-highlight" />
			</article>
		</section>
	);
};

export default SuggestedLoading;
