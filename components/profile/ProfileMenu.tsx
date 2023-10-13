import { useClerk } from "@clerk/nextjs";
import { DialogClose } from "@radix-ui/react-dialog";
import { useTheme } from "next-themes";
import Link from "next/link";
import toast from "react-hot-toast";

const ProfileMenu = () => {
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
		<section className="bg-banner w-[400px] max-h-[100vh - 40px] rounded-xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden max-[500px]:w-[260px]">
			<section className="flex flex-col">
				<Link
					className="bg-transparent border-t-0 border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10"
					href="https://www.buymeacoffee.com/chukwuanise">
					Buy me a coffee
				</Link>

				<Link
					className="bg-transparent border-t border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10"
					href="#">
					Settings
				</Link>

				<Link
					className="bg-transparent border-t border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10"
					href="#">
					QR Code
				</Link>

				<Link
					className="bg-transparent border-t border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10"
					href="#">
					Report A Problem
				</Link>

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
