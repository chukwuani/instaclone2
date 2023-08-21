import Link from "next/link";
import { RefObject } from "react";

const FeedMenu = ({ dialog }: { dialog: RefObject<HTMLDialogElement> }) => {
	return (
		<dialog
			ref={dialog}
			className="more-list-option">
			<section className="flex flex-col">
				<Link
					className="more-list-items important-option report"
					href="#">
					Report
				</Link>

				<Link
					className="more-list-items important-option unfollow-btn"
					href="#">
					Unfollow
				</Link>

				<Link
					className="more-list-items"
					href="#">
					Add to favourites
				</Link>

				<Link
					className="more-list-items"
					href="#">
					Go to post
				</Link>

				<Link
					className="more-list-items"
					href="#">
					Share to...
				</Link>

				<Link
					className="more-list-items"
					href="#">
					Copy link
				</Link>

				<Link
					className="more-list-items"
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
