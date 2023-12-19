import { firestore, storage } from "@/firebase/firebaseConfig";
import { DialogClose } from "@radix-ui/react-dialog";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import toast from "react-hot-toast";
import { usePostContext } from "./PostCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DeletePost = () => {
	const queryClient = useQueryClient();

	const {
		post: { id: postId, filePaths },
	} = usePostContext();

	const handleDeletePost = async () => {
		const storageRef = ref(storage, "posts");

		const toastId = toast.loading("Deleting post");

		await deleteDoc(doc(firestore, "posts", postId));

		filePaths.map(async (file) => {
			const fileRef = ref(storageRef, file);
			await deleteObject(fileRef);
		});

		toast.dismiss(toastId);
		toast.success("Deleted Post Successfully!");
	};

	const mutation = useMutation({
		mutationFn: handleDeletePost,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["feedData"] });
		},
	});

	return (
		<section className="bg-banner w-[400px] max-h-[100vh - 40px] rounded-xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden max-[500px]:w-[260px]">
			<section className="flex flex-col">
				<section className="flex flex-col items-center justify-center p-8 gap-2 text-center">
					<h3 className="text-primary-text text-xl font-medium">Delete post?</h3>
					<p className="text-sm text-secondary-text">Are you sure you want to delete this post?</p>
				</section>

				<button
					className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 font-bold text-destructive border-t"
					onClick={() => mutation.mutate()}>
					Delete
				</button>

				<DialogClose className="bg-transparent border-separator-elevated cursor-pointer text-sm leading-normal m-0 min-h-[48px] py-1 px-2 text-center align-middle inline-grid place-content-center active:bg-black/10 border-t">
					Cancel
				</DialogClose>
			</section>
		</section>
	);
};

export default DeletePost;
