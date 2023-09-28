import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

const Loading = () => {
	return (
		// <section className="flex bg-primary-background flex-col items-center justify-between p-[60px] fixed top-0 left-0 h-full w-screen z-[99999999]">
		// 	<div />

		// 	<Image
		// 		width={70}
		// 		height={70}
		// 		src="/images/loader-logo.png"
		// 		alt="Instagram"
		// 		aria-label="Instagram"
		// 	/>

		// 	<Image
		// 		width={80}
		// 		height={80}
		// 		src="/images/from-meta.png"
		// 		alt="from meta"
		// 		aria-label="from meta"
		// 	/>
		// </section>
		<main className="main-content pt-[76px] md:pt-[22px]">
			<section className="flex flex-col items-center max-w-[470px] w-full mt-4">
				<section className="story-section">
					<ul className="story-slides">
						{Array.from({ length: 4 }).map((_, i) => (
							<Skeleton
								key={i}
								className=" h-[66px] w-[66px] rounded-full"
							/>
						))}
					</ul>
				</section>

				{Array.from({ length: 3 }).map((_, i) => (
					<article
						key={i}
						className="max-w-[470px] mb-8 w-full h-auto overflow-hidden flex flex-col bg-primary-background">
						<section className="gap-3 flex flex-col">
							<Skeleton className="w-[470px] h-[370px] rounded-none" />

							<section
								className="gap-3
								flex
								flex-col-reverse">
								<Skeleton className=" h-3 w-full rounded-none" />
								<Skeleton className=" h-3 w-3/4 rounded-none" />
								<Skeleton className=" h-3 w-1/2 rounded-none" />
							</section>
						</section>
					</article>
				))}
			</section>

			<aside className="w-[319px] mt-9 ml-16 flex flex-col max-[999px]:hidden">
				<section className="flex items-center px-4">
					<Skeleton className=" h-11 w-11 rounded-full" />

					<article className="flex-auto flex flex-col text-sm ml-3 gap-2">
						<Skeleton className=" h-3 w-1/2 rounded-none" />
						<Skeleton className=" h-3 w-1/2 rounded-none" />
					</article>
				</section>

				<article className="my-2 mt-6">
					<Skeleton className="my-2 mx-4 h-3 w-full rounded-none" />

					{Array.from({ length: 5 }).map((_, i) => (
						<section
							key={i}
							className="flex items-center py-2 px-4">
							<Skeleton
								key={i}
								className=" h-[44px] w-[44px] rounded-full"
							/>

							<article className="ml-3 flex-auto flex flex-col text-sm gap-2">
								<Skeleton className="h-3 w-1/2 rounded-none" />

								<Skeleton className="h-3 w-full rounded-none" />
							</article>
						</section>
					))}
				</article>

				<Skeleton className="mt-[11px] mx-4 h-3 w-full rounded-none" />
			</aside>
		</main>
	);
};

export default Loading;
