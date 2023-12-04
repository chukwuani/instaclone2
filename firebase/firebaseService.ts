import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
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

	const doc = await getDocs(q).then((querySnapshot) => {
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

	const doc = await getDocs(q).then((querySnapshot) => {
		const newData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
		return newData;
	});

	return doc;
};

export const getSearch = async (username: string) => {
	const userRef = collection(firestore, "users");
	const q = query(userRef, orderBy("username"), startAt(username));

	const doc = await getDocs(q).then((querySnapshot) => {
		const newData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
		return newData;
	});

	return doc.filter((item) => item.username.includes(username));
};

export const getUserPost = async (userId: string) => {
	const postsRef = collection(firestore, "posts");
	const q = query(postsRef, where("creatorId", "==", userId));

	const doc = await getDocs(q).then((querySnapshot) => {
		const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		return newData;
	});

	return doc;
};

export const getUserSaves = async (userId: string) => {
	const savesRef = collection(firestore, "posts");
	const q = query(savesRef, where("saves", "array-contains", userId));

	const doc = await getDocs(q).then((querySnapshot) => {
		const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		return newData;
	});

	return doc;
};

export const getSuggestedUsers = async (userId: string, userName: string) => {
	const usersRef = collection(firestore, "users");

	const user = await getUserByUsername(userName);
	const following = user[0]?.following;

	let q = query(usersRef, limit(5));

	if (following.length > 0) {
		q = query(usersRef, where("userId", "not-in", [...following, userId]), limit(5));
	} else {
		q = query(usersRef, where("userId", "!=", userId), limit(5));
	}

	const doc = await getDocs(q).then((querySnapshot) => {
		const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

		return newData;
	});

	return doc;
};

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
