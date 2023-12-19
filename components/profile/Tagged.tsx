import React from "react";
import { useProfileBottomContext } from "./ProfileBottom";

const Tagged = () => {
	const { showSaved } = useProfileBottomContext();

	return (
		<div className="flex flex-col gap-4 mx-11 my-[60px] items-center justify-center text-center">
			<div className="tagged-icon" />

			<h1 className="font-black text-3xl">Photos of {showSaved ? "you" : "user"}</h1>
			<p className="font-normal text-sm w-[70%]">
				When people tag {showSaved ? "you" : "user"} in photos, they&apos;ll appear here.
			</p>
		</div>
	);
};

export default Tagged;
