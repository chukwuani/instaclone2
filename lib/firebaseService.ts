import { addDoc, collection } from "firebase/firestore";
import { firestore } from "./firebaseConfig";
import { User } from "@clerk/nextjs/server";


export const addUserToFirestore = async (user: User | null) => {
	const newUser = addDoc(collection(firestore, "users"), {
		userId: user?.id,
		imageUrl: user?.imageUrl,
		bio: "I'm a mysterious individual who has yet to fill out my bio. One thing's for certain: I will fill it out one day!",
		username: user?.username,
		firstName: user?.firstName,
		lastName: user?.lastName,
		email: user?.emailAddresses,
		isVerified: false,
		following: [],
		followers: [],
		createdAt: user?.createdAt,
	});

	return newUser;
};
