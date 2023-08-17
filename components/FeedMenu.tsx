import { RefObject } from "react";

const FeedMenu = ({ dialog }: { dialog: RefObject<HTMLDialogElement> }) => {
	return (
		<dialog
			ref={dialog}
			className="more-list-option">
			<section className="flex flex-col">
				<a
					className="more-list-items important-option report"
					href="#">
					Report
				</a>

				<a
					className="more-list-items important-option unfollow-btn"
					href="#">
					Unfollow
				</a>

				<a
					className="more-list-items"
					href="#">
					Add to favourites
				</a>

				<a
					className="more-list-items"
					href="#">
					Go to post
				</a>

				<a
					className="more-list-items"
					href="#">
					Share to...
				</a>

				<a
					className="more-list-items"
					href="#">
					Copy link
				</a>

				<a
					className="more-list-items"
					href="#">
					Embed
				</a>

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
