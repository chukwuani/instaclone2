import { Skeleton } from "../ui/skeleton";

const FeedSkeleton = () => {
	return (
		<>
			{Array.from({ length: 3 }).map((_, i) => (
				<article
					key={i}
					className="max-w-[470px] mb-8 w-full h-auto overflow-hidden flex flex-col bg-primary-background border border-transparent">
					<section className="gap-3 flex flex-col">
						<section className="flex items-center justify-between my-2 mx-2">
							<section className="flex gap-[3px] items-center">
								<Skeleton className="h-11 w-11 rounded-full" />

								<section className="flex flex-col gap-2">
									<section className="flex items-center ml-[10px]">
										<Skeleton className="h-2 w-20" />
									</section>

									<Skeleton className="h-2 w-20 ml-[10px]" />
								</section>
							</section>

							<Skeleton className="w-6 h-1" />
						</section>

						<Skeleton className="max-w-[470px] w-full h-[370px] md:h-[470px] rounded-none" />

						<section className="flex items-center justify-between mt-1">
							<section className="flex items-center">
								<Skeleton className="h-6 w-6 rounded-full m-2" />

								<Skeleton className="h-6 w-6 rounded-full m-2" />

								<Skeleton className="h-6 w-6 rounded-full m-2" />
							</section>

							<Skeleton className="h-6 w-6 rounded-full m-2" />
						</section>

						<section className="gap-3 flex flex-col py-2 px-3">
							<Skeleton className="h-[10px] w-1/2 rounded-none" />

							<Skeleton className="h-[10px] w-3/4 rounded-none" />

							<Skeleton className="h-[10px] w-3/4 rounded-none" />

							<Skeleton className="h-[10px] w-20 rounded-none" />
						</section>
					</section>
				</article>
			))}
		</>
	);
};

export default FeedSkeleton;
