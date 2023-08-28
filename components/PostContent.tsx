import { useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

interface Props {
	posts: Array<string>;
	toggleLike: () => void;
}

const PostContent = ({ posts, toggleLike }: Props) => {
	const wrapper = useRef<HTMLUListElement>(null);
	const [scroll, setScroll] = useState(0);

	const { scrollX, scrollXProgress } = useScroll({
		container: wrapper,
	});

	useMotionValueEvent(scrollX, "change", (latest) => {
		setScroll(latest);
	});

	return (
		<section className="overflow-hidden max-w-[470px] w-full h-auto flex relative">
			{scroll > 0 && (
				<button
					onClick={() => wrapper.current?.scrollBy(-wrapper.current?.offsetWidth, 0)}
					className="back-btn"
					aria-label="Go back"
				/>
			)}

			<ul
				ref={wrapper}
				className="post-content">
				{posts.map((item, index) => (
					<li
						key={index}
						className="post-content-item">
						{item.endsWith("mp4") ? (
							<video
								src={item}
								width={470}
								height={"auto"}
								controls
							/>
						) : (
							<Image
								onDoubleClick={toggleLike}
								src={item}
								alt="post"
								priority
								width={470}
								height={470}
								quality={100}
							/>
						)}
					</li>
				))}
			</ul>

			{scrollXProgress.get() < 0.99 && posts.length > 1 ? (
				<button
					onClick={() => wrapper.current?.scrollBy(wrapper.current?.offsetWidth, 0)}
					className="next-btn"
					aria-label="See next"
				/>
			) : null}
		</section>
	);
};

export default PostContent;
