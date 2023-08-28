"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const Avatar = ({ size }: { size: number }) => {
	const { user } = useUser();
	return (
		<Image
			className="rounded-full highlight-bg"
			src={user ? user?.imageUrl : "/images/placeholder.png"}
			alt="Profile picture"
			width={size}
			height={size}
			title="Profile"
		/>
	);
};

export default Avatar;
