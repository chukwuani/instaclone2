import Image from "next/image";
import React, { useState, useTransition } from "react";

import { useDropzone, type FileWithPath, FileRejection } from "react-dropzone";
import { FilePlus2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { icons } from "@/constants";

import NewPost from "../NewPost";
import CaptionForm from "../CaptionForm";
import FileCard from "../FileCard";

import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/firebaseConfig";

import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import createPost from "@/firebase/actions";

export type FileWithPreview = FileWithPath & {
	preview: string;
};

export default function CreatePost() {
	const { user } = useUser();

	const [open, setOpen] = React.useState(false);
	const [files, setFiles] = React.useState<FileWithPreview[] | null>(null);
	const [caption, setCaption] = useState("");

	const [isPending, startTransition] = useTransition();

	const onDrop = React.useCallback(
		(acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
			acceptedFiles.forEach((file) => {
				const fileWithPreview = Object.assign(file, {
					preview: URL.createObjectURL(file),
					altText: "",
				});

				setFiles((prev) => [...(prev ?? []), fileWithPreview]);
			});

			console.log(acceptedFiles);

			if (rejectedFiles.length > 0) {
				rejectedFiles[0].errors[0].message &&
					toast.error(`${rejectedFiles[0].errors[0].message}. Max files is 10.`);
			}
		},

		[setFiles]
	);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		maxFiles: 10,
		accept: {
			"image/jpeg": [],
			"image/png": [],
		},
	});

	const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const altTexts = files?.map((file: any) => file.altText);
		const filePaths: string[] = [];

		const storageRef = ref(storage, "posts");

		const toastId = toast.loading("Creating post");
		try {
			if (files == null) return;
			const uploadPromises = files.map(async (file) => {
				const filename = `${user?.id}/${file.name}`;
				filePaths.push(filename);

				const fileRef = ref(storageRef, filename);
				const snapshot = await uploadBytes(fileRef, file);
				return getDownloadURL(snapshot.ref);
			});

			const downloadURLs = await Promise.all(uploadPromises);

			startTransition(async () => {
				await createPost(
					caption,
					downloadURLs,
					altTexts,
					JSON.parse(JSON.stringify(user)),
					filePaths
				);
			});

			setOpen(false);

			toast.dismiss(toastId);
			toast.success("Created Post");
		} catch (error) {
			if (files == null) return;

			toast.dismiss(toastId);
			console.error("Error uploading files: ", error);
			toast.error("Error creating post");

			// Delete files from storage
			files.map(async (file) => {
				const filename = `${user?.id}/${file.name}`;
				const fileRef = ref(storageRef, filename);
				await deleteObject(fileRef);
			});

			// // Delete posts from firestore
			// await deleteDoc(doc(firestore, "posts", post.id));
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
