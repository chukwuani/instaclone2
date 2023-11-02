const Share = () => {
	return (
		<div className="flex flex-col gap-4 my-[60px] mx-11 items-center justify-center text-center">
			<div className="camera-icon" />

			<h1 className="font-black text-3xl">Share Photos</h1>
			<p className="font-normal text-sm w-[70%]">
				When you share photos, they will appear on your profile.
			</p>
			<a
				className="text-primary-button text-sm font-semibold"
				href="#">
				Share your first photo
			</a>
		</div>
	);
};

export default Share;
