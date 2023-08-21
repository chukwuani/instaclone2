import Image from "next/image";
import Link from "next/link";

const ChatCard = () => {
	return (
		<article className="flex flex-col items-center pt-2">
			<section className="w-full inline-flex flex-auto items-center py-2 px-5 cursor-pointer chat-list">
				<span className="online">
					<Image
						width={56}
						height={56}
						className="w-14 h-14 rounded-full mr-3"
						src="/images/placeholder.png"
						alt="avatar"
					/>
				</span>

				<Link
					className="no-underline"
					href="/message">
					<article>
						<h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal primary-text">
							Jacob Spinka
						</h3>
						<p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm secondary-text mt-1 font-normal">
							Active now
						</p>
					</article>
				</Link>
			</section>
		</article>
	);
};

export default ChatCard;
