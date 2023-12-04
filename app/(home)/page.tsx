// import Stories from "@/components/Stories";
import Suggested from "@/components/Suggested";
import Feed from "@/components/post/Feed";

import { currentUser } from "@clerk/nextjs";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebaseConfig";

export default async function Home() {
	const user = await currentUser();

	const docRef = doc(firestore, "users", `${user?.id}`);
	const docSnap = await getDoc(docRef);

	if (!docSnap.exists()) {
		await setDoc(doc(firestore, "users", `${user?.id}`), {
			userId: user?.id,
			username: user?.username,
			name: `${user?.firstName ?? user?.username} ${user?.lastName ?? ""}`,
			imageUrl: user?.imageUrl,
			bio: "I'm a mysterious individual who has yet to fill out my bio. One thing's for certain: I will fill it out one day!",
			isVerified: false,
			following: [],
			followers: [],
			createdAt: user?.createdAt,
		});
	}

	return (
		<>
			<main className="main-content pt-[76px] md:pt-[22px]">
				<section className="flex flex-col items-center max-w-[470px] w-full mt-4">
					{/* <Stories
						options={{
							slidesToScroll: "auto",
							skipSnaps: true,
							dragFree: true,
						}}
					/> */}

					<Feed />
				</section>

				<Suggested />
			</main>
		</>
	);
}
