import React from "react";

const Tagged = () => {
	return (
		<div className="flex flex-col gap-4 mx-11 my-[60px] items-center justify-center text-center">
			<div className="tagged-icon" />

			<h1 className="font-black text-3xl">Photos of you</h1>
			<p className="font-normal text-sm">
				When people tag you in photos, they&apos;ll appear here.
			</p>
		</div>
	);
};

export default Tagged;
