"use server";

import { revalidatePath } from "next/cache";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "./firebaseConfig";

type CreatePostType = {
	caption: string;
	downloadURLs: string[];
	altTexts: any[] | undefined;
	user: { id: any; imageUrl: any; username: any; firstName: any; lastName: any };
};

export default async function createPost(
	caption: string,
	downloadURLs: string[],
	altTexts: any[] | undefined,
	user: { id: any; imageUrl: any; username: any; firstName: any; lastName: any }
) {
	await addDoc(collection(firestore, "posts"), {
		caption: caption,
		createdAt: serverTimestamp(),
		images: downloadURLs,
		altTexts: altTexts,
		comments: [],
		creatorId: user?.id,
		likes: [],
		saves: [],
		user: {
			imageUrl: user?.imageUrl,
			username: user?.username,
			name: `${user?.firstName} ${user?.lastName ?? ""}`,
			isVerified: false,
		},
	});
    
	revalidatePath("/");
}
