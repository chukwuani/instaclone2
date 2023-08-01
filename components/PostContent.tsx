import Image from "next/image";

const PostContent = ({ posts }: { posts: Array<string> }) => {
	return (
		<div className="post-content-wrapper">
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
		</div>
	);
};

export default PostContent;
