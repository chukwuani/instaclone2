import { useClerk } from "@clerk/nextjs";
import { DialogClose } from "@radix-ui/react-dialog";
import { useTheme } from "next-themes";
import Link from "next/link";
import toast from "react-hot-toast";
import { useProfileTopContext } from "./ProfileTop";

const ProfileMenu = () => {
	const {
		showFollow,
		user: { username },
	} = useProfileTopContext();
	const { signOut } = useClerk();
	const { setTheme, resolvedTheme } = useTheme();

	const toggleTheme = () => {
		if (resolvedTheme === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	};

	const copyLink = () => {
		navigator.clipboard
			.writeText(`${window.origin}/${username}`)
			.then(() => {
				toast.success("Link copied to clipboard");
			})
			.catch(() => {
				toast.error("Link not copied to clipboard");
			});
	};

	return (
		<section className="bg-banner w-[400px] max-h-[100vh - 40px] rounded-xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden max-[500px]:w-[260px]">
			<section className="flex flex-col">
				{showFollow ? (
					<>
						<Link
							className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 font-bold text-destructive border-t-0"
							href="https://www.buymeacoffee.com/chukwuanise">
							Block
						</Link>

						<a
							target="_blank"
							href="https://twitter.com/_stevecodes"
							className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 font-bold text-destructive border-t">
							Report
						</a>

						<Link
							className="bg-transparent border-t border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10"
							href="#">
							QR Code
						</Link>

						<DialogClose asChild>
							<button
								className="bg-transparent border-t border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10"
								onClick={copyLink}>
								Copy link
							</button>
						</DialogClose>

						<button className="bg-transparent border-t border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10">
							About this account
						</button>
					</>
				) : (
					<>
						<a
							target="_blank"
							className="bg-transparent border-t-0 border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10"
							href="https://www.buymeacoffee.com/chukwuanise">
							Buy me a coffee
						</a>

						<a
							target="_blank"
							href="https://www.threads.net/"
							className="bg-transparent border-t border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10">
							Threads
						</a>

						<Link
							className="bg-transparent border-t border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10"
							href="#">
							QR Code
						</Link>

						<a
							target="_blank"
							href="https://twitter.com/_stevecodes"
							className="bg-transparent border-t border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10">
							Report A Problem
						</a>

						<button
							className="bg-transparent border-t border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10"
							onClick={toggleTheme}>
							Switch Appearance
						</button>

						<button
							className="bg-transparent border-t border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10"
							onClick={() => {
								signOut();
								toast.success("You have successfully logged out!");
							}}>
							Log Out
						</button>
					</>
				)}

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

export default ProfileMenu;
