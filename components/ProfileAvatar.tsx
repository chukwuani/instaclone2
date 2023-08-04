"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const ProfileAvatar = ({ size }: { size: number }) => {
	const { user } = useUser();
	console.log(user);

	return (
		<Image
			className="profile-pic"
			src={user ? user?.imageUrl : "/images/placeholder.png"}
			alt="Profile picture"
			width={size}
			height={size}
			title="Profile"
		/>
	);
};

export default ProfileAvatar;
