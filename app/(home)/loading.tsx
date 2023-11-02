import Image from "next/image";

const Loading = () => {
	return (
		<section className="flex bg-primary-background flex-col items-center justify-between p-[60px] fixed top-0 left-0 h-full w-screen z-[99999999]">
			<div />

			<Image
				priority
				width={70}
				height={70}
				src="/images/loader-logo.png"
				alt="Instagram"
				aria-label="Instagram"
			/>

			<Image
				priority
				width={80}
				height={80}
				src="/images/from-meta.png"
				alt="from meta"
				aria-label="from meta"
			/>
		</section>
	);
};

export default Loading;
