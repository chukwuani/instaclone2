const Share = () => {
	return (
		<div className="flex flex-col gap-4 my-11 mx-[60px] items-center justify-center text-center">
			<div className="camera-icon" />

			<h1 className="font-black text-3xl">Share Photos</h1>
			<p className="font-normal text-sm">
				When you share photos, they will appear on your profile.
			</p>
			<a
				className="primary-btn text-sm font-semibold"
				href="#">
				Share your first photo
			</a>
		</div>
	);
};

export default Share;
