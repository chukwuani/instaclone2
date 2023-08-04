"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const ProfileAvatar = ({ size }: { size: number }) => {
	const { user } = useUser();

	return (
		<Image
			className="profile-pic"
			src={user?.imageUrl ?? "/images/placeholder.png"}
			alt="Profile picture"
			width={size}
			height={size}
			title="Profile"
		/>
	);
};

export default ProfileAvatar;
