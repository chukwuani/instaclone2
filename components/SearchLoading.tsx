import { Skeleton } from "./ui/skeleton";

const SearchLoading = () => {
	return (
		<>
			{Array.from({ length: 5 }).map((_, i) => (
				<section
					className="flex justify-start w-full px-6 py-2"
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

export default SearchLoading;
