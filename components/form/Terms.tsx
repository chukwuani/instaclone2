import Link from "next/link";

const Terms = () => {
	return (
		<article className="text-center leading-4 my-[10px] mx-10">
			<p className="text-xs secondary-text min-w-full">
				People who use our service may have uploaded your contact information to Instagram.
				<Link className="link" href="#">
					{" "}
					Learn More
				</Link>
			</p>

			<br />

			<p className="text-xs secondary-text min-w-full">
				By signing up, you agree to our{" "}
				<Link className="link" href="#">
					Terms
				</Link>{" "}
				,
				<Link className="link" href="#">
					Privacy Policy
				</Link>{" "}
				and{" "}
				<Link className="link" href="#">
					Cookies Policy .
				</Link>
			</p>
		</article>
	);
};

export default Terms;
