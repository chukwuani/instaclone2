import {
	Timestamp,
	addDoc,
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	serverTimestamp,
	startAt,
	where,
} from "firebase/firestore";
import { firestore } from "./firebaseConfig";

export const getFeedPost = async (userName: string) => {
	const postsRef = collection(firestore, "posts");

	const user = await getUserByUsername(userName);
	const following = user[0]?.following;

	let q = query(
		postsRef,
		where("creatorId", "in", [...following, "user_2Xo2K25HhOtJmLiIynPKoB4WIHt", user[0].userId]),
		orderBy("createdAt", "desc")
	);

	const doc: any = await getDocs(q).then((querySnapshot) => {
		const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

		return newData;
	});

	return doc;
};

export const getExplorePost = async (userName: string) => {
	const postsRef = collection(firestore, "posts");

	const user = await getUserByUsername(userName);
	const following = user[0]?.following;

	let q = query(
		postsRef,
		where("creatorId", "not-in", [...following, "user_2Xo2K25HhOtJmLiIynPKoB4WIHt", user[0].userId])
	);

	const doc = await getDocs(q).then((querySnapshot) => {
		const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
		return newData;
	});

	return doc;
};

export const getUserByUsername = async (username: string) => {
	const userRef = collection(firestore, "users");
	const q = query(userRef, where("username", "==", username));

	const doc: any = await getDocs(q).then((querySnapshot) => {
		const newData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
		return newData;
	});

	return doc;
};

export const getSearch = async (username: string) => {
	const searchRegex = new RegExp(`.*${username}.*`, "i");

	const userRef = collection(firestore, "users");
	const q = query(userRef, orderBy("username"));

	const doc = await getDocs(q).then((querySnapshot) => {
		const newData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
		return newData;
	});

	return doc.filter((item) => searchRegex.test(item.username));
};

export const getUserPost = async (userId: string) => {
	const postsRef = collection(firestore, "posts");
	const q = query(postsRef, where("creatorId", "==", userId));

	const doc: any = await getDocs(q).then((querySnapshot) => {
		const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		return newData;
	});

	return doc;
};

export const getUserSaves = async (userId: string) => {
	const savesRef = collection(firestore, "posts");
	const q = query(savesRef, where("saves", "array-contains", userId));

	const doc: any = await getDocs(q).then((querySnapshot) => {
		const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		return newData;
	});

	return doc;
};

export const getSuggestedUsers = async (userId: string, limit: number) => {
	const usersRef = collection(firestore, "users");

	let q = query(usersRef, where("userId", "!=", userId));

	const doc = await getDocs(q).then((querySnapshot) => {
		const newData: any[] = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

		return newData.filter((item) => !item?.followers.includes(userId));
	});

	return doc.sort(() => Math.random() - 0.5)?.splice(0, limit);
};

export const getPostComments = async (postId: string) => {
	const commentsRef = collection(firestore, "comments");
	const q = query(commentsRef, where("postId", "==", postId), limit(20));

	const doc: any[] = await getDocs(q).then((querySnapshot) => {
		const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		return newData;
	});

	return doc;
};

export async function addComment(
	body: string,
	imageUrl: string,
	postId: string,
	userId: string,
	username: string
) {
	 await addDoc(collection(firestore, "comments"), {
		body,
		createdAt: serverTimestamp(),
		imageUrl,
		postId,
		userId,
		username,
	});

}

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
}


// export async function likePost(postId: string, likesArray: string[]) {
// 	const postRef = doc(firestore, "posts", postId);

// 	try {
// 		await updateDoc(postRef, {
// 			likes: likesArray,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// export const getFollwers = async (userId: string) => {
// 	const savesRef = collection(firestore, "follows");
// 	const q = query(savesRef, where("followingId", "==", userId));

// 	const doc = await getDocs(q).then((querySnapshot) => {
// 		const newData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
// 		return newData;
// 	});

// 	return doc;
// };

// export const getFollwing = async (userId: string) => {
// 	const savesRef = collection(firestore, "follows");
// 	const q = query(savesRef, where("followerId", "==", userId));

// 	const doc = await getDocs(q).then((querySnapshot) => {
// 		const newData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
// 		return newData;
// 	});

// 	return doc;
// };
// export const getUserById = async (userId: string) => {
// 	const userRef = collection(firestore, "users");
// 	const q = query(userRef, where("userId", "==", userId));

// 	const doc = await getDocs(q).then((querySnapshot) => {
// 		const newData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
// 		return newData;
// 	});

// 	return doc;
// };
// export const addUserToFirestore = async (user: User | null) => {
// 	await addDoc(collection(firestore, "users"), {
// 		userId: user?.id,
// 		imageUrl: user?.imageUrl,
// 		bio: "I'm a mysterious individual who has yet to fill out my bio. One thing's for certain: I will fill it out one day!",
// 		username: user?.username,
// 		firstName: user?.firstName,
// 		lastName: user?.lastName,
// 		email: user?.emailAddresses,
// 		isVerified: false,
// 		following: [],
// 		followers: [],
// 		createdAt: user?.createdAt,
// 		birthDay: user?.birthday,
// 	});
// };
