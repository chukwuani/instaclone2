import Link from "next/link";
import { RefObject } from "react";

const FeedMenu = ({ dialog }: { dialog: RefObject<HTMLDialogElement> }) => {
	return (
		<dialog
			ref={dialog}
			className="bg-banner w-[400px] max-h-[100vh - 40px] rounded-xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden max-[500px]:w-[260px]">
			<section className="flex flex-col">
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

				<Link
					className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 border-t"
					href="#">
					Add to favourites
				</Link>

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
					Embed
				</Link>

				<button
					className="more-list-items cancel-more-option"
					type="button"
					onClick={() => {
						dialog.current?.close();
						document.body.classList.remove("modal-open");
					}}>
					Cancel
				</button>
			</section>
		</dialog>
	);
};

export default FeedMenu;
