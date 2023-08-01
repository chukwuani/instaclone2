import Link from "next/link";

const Terms = () => {
	return (
		<article className="conditions">
			<p className="terms">
				People who use our service may have uploaded your contact information to Instagram.
				<Link href="#"> Learn More</Link>
			</p>

			<br />

			<p className="terms">
				By signing up, you agree to our <Link href="#">Terms</Link> ,
				<Link href="#">Privacy Policy</Link> and <Link href="#">Cookies Policy .</Link>
			</p>
		</article>
	);
};

export default Terms;
