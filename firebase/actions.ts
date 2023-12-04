"use server";

import { revalidatePath } from "next/cache";
import { addDoc, collection,  serverTimestamp } from "firebase/firestore";
import { firestore } from "./firebaseConfig";

export default async function createPost(
	caption: string,
	downloadURLs: string[],
	altTexts: any[] | undefined,
	user: { id: any; imageUrl: any; username: any; firstName: any; lastName: any },
	filePaths: string[]
) {
	await addDoc(collection(firestore, "posts"), {
		caption: caption,
		createdAt: serverTimestamp(),
		images: downloadURLs,
		filePaths,
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
