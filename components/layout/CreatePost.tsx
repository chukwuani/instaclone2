import Image from "next/image";
import React, { useState } from "react";

import { useDropzone, type FileWithPath } from "react-dropzone";
import { FilePlus2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { icons } from "@/constants";

import NewPost from "../NewPost";
import CaptionForm from "../CaptionForm";
import FileCard from "../FileCard";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "@/lib/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export type FileWithPreview = FileWithPath & {
	preview: string;
};

export default function CreatePost() {
	const { user } = useUser();
	const queryClient = useQueryClient();
	const [open, setOpen] = React.useState(false);
	const [files, setFiles] = React.useState<FileWithPreview[] | null>(null);
	const [caption, setCaption] = useState("");

	const onDrop = React.useCallback(
		(acceptedFiles: FileWithPath[]) => {
			acceptedFiles.forEach((file) => {
				const fileWithPreview = Object.assign(file, {
					preview: URL.createObjectURL(file),
					altText: "",
				});

				setFiles((prev) => [...(prev ?? []), fileWithPreview]);
			});
		},

		[setFiles]
	);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			"image/jpeg": [],
			"image/png": [],
		},
	});

	const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const altTexts = files?.map((file: any) => file.altText);

		const storageRef = ref(storage, "posts");

		const toastId = toast.loading("Loading do not close window");
		try {
			if (files == null) return;
			const uploadPromises = files.map(async (file) => {
				const filename = file.name;
				const fileRef = ref(storageRef, filename);
				const snapshot = await uploadBytes(fileRef, file);
				return getDownloadURL(snapshot.ref);
			});

			const downloadURLs = await Promise.all(uploadPromises);

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
					firstName: user?.firstName,
					lastName: user?.lastName,
					isVerified: false,
				},
			});

			setOpen(false);
			toast.dismiss(toastId);
			toast.success("Got the data");

			// queryClient.invalidateQueries({ queryKey: ["postData"] });
		} catch (error) {
			toast.dismiss(toastId);
			console.error("Error uploading files: ", error);
			toast.error("Error when fetching");
		}
	};

	React.useEffect(() => {
		setFiles(null);
		setCaption("");
	}, [open]);

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button className="nav-links">
					<span className="flex items-center gap-4">
						<Image
							className="icons"
							src={open ? icons.createActive : icons.create}
							alt="Create Post"
							title="Create Post"
						/>
						<p className={`nav-links-text ${open ? "font-bold" : ""}`}>Create</p>
					</span>
				</button>
			</DialogTrigger>

			<DialogContent className="w-[438px] max-[500px]:w-[340px] bg-banner p-0">
				<section className="flex flex-col items-center">
					<span className="border-b border-separator-elevated min-h-[43px] h-full flex items-center justify-center w-full">
						<p className="text-primary-text font-semibold">Create new post</p>
					</span>

					{files?.length ? (
						<form
							onSubmit={handleCreatePost}
							className="flex flex-col gap-5 p-6 w-full h-full">
							<ScrollArea className="h-[300px] w-full">
								<CaptionForm
									caption={caption}
									setCaption={setCaption}
								/>

								{files?.map((file, i) => (
									<FileCard
										key={i}
										i={i}
										files={files}
										setFiles={setFiles}
										file={file}
									/>
								))}
							</ScrollArea>

							<section className="flex items-center justify-between">
								<button
									type="submit"
									className="text-primary-button font-semibold text-sm hover:text-link">
									Post
								</button>

								<button
									type="button"
									{...getRootProps()}
									className="bg-banner p-3 rounded-full">
									<input {...getInputProps()} />
									<FilePlus2 className="h-5 w-5 text-primary-text" />
									<span className="sr-only">Add file</span>
								</button>
							</section>
						</form>
					) : (
						<section
							{...getRootProps()}
							className="p-6 w-full h-full min-h-[348px] flex items-center justify-center flex-col gap-3">
							<input {...getInputProps()} />

							<NewPost />
						</section>
					)}
				</section>
			</DialogContent>
		</Dialog>
	);
}
