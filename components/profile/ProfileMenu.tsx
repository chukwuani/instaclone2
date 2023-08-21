import { useClerk } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";
import { RefObject } from "react";

const ProfileMenu = ({ dialog }: { dialog: RefObject<HTMLDialogElement> }) => {
	const { signOut } = useClerk();
	const { setTheme, resolvedTheme } = useTheme();

	const toggleTheme = () => {
		if (resolvedTheme === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	};

	return (
		<dialog
			ref={dialog}
			className="more-list-option">
			<section className="flex flex-col">
				<Link
					className="more-list-items report"
					href="#">
					Apps and Websites
				</Link>

				<Link
					className="more-list-items"
					href="#">
					Settings
				</Link>

				<Link
					className="more-list-items"
					href="#">
					QR Code
				</Link>

				<Link
					className="more-list-items"
					href="#">
					Report A Problem
				</Link>

				<button
					className="more-list-items"
					onClick={toggleTheme}>
					Switch Appearance
				</button>

				<button
					className="more-list-items"
					onClick={() => signOut()}>
					Log Out
				</button>

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

export default ProfileMenu;
