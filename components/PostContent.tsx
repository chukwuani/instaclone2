import Image from "next/image";

const PostContent = ({ posts }: { posts: Array<string> }) => {
	return (
		<section className="overflow-hidden max-w-[470px] w-full h-auto flex relative">
			<button className="back-btn" aria-label="Go back" />

			<ul className="post-content">
				{posts.map((item, index) => (
					<li key={index} className="post-content-item">
						{item.endsWith("mp4") ? (
							<video src={item} width={470} height={"auto"} controls />
						) : (
							<Image src={item} alt="post" priority width={470} height={470} quality={100} />
						)}
					</li>
				))}
			</ul>

			<button className="next-btn" aria-label="See Next" />
		</section>
	);
};

export default PostContent;
