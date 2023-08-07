import Stories from "@/components/Stories";
import Suggested from "@/components/Suggested";
import Feed from "@/components/Feed";

export default async function Home() {
	return (
		<>
			<main className="main-content pt-[22px]">
				<section className="flex flex-col items-center max-w-[470px] w-full mt-4">
					<Stories />
					<Feed />
				</section>

				<Suggested />
			</main>
		</>
	);
}
