import { DialogClose } from "@radix-ui/react-dialog";
import Link from "next/link";

const FeedMenu = ({ isUserPost }: { isUserPost: boolean }) => {
	return (
		<section className="bg-banner w-[400px] max-h-[100vh - 40px] rounded-xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden max-[500px]:w-[260px]">
			<section className="flex flex-col">
				{isUserPost ? (
					<>
						<Link
							className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 font-bold text-destructive border-t-0"
							href="#">
							Delete
						</Link>

						<Link
							className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 border-t"
							href="#">
							Edit
						</Link>
					</>
				) : (
					<>
						<Link
							className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 font-bold text-destructive border-t-0"
							href="#">
							Report
						</Link>

						<Link
							className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 font-bold text-destructive border-t"
							href="#">
							Unfollow
						</Link>
					</>
				)}

				<Link
					className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 border-t"
					href="#">
					Go to post
				</Link>

				<Link
					className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 border-t"
					href="#">
					Share to...
				</Link>

				<Link
					className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 border-t"
					href="#">
					Copy link
				</Link>

				<Link
					className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 border-t"
					href="#">
					About this account
				</Link>

				<DialogClose asChild>
					<button
						className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 border-t"
						type="button">
						Cancel
					</button>
				</DialogClose>
			</section>
		</section>
	);
};

export default FeedMenu;
