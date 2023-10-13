import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { icons } from "@/constants";
import { formatBytes } from "@/lib/utils";
import Cropper, { type ReactCropperElement } from "react-cropper";
import Image from "next/image";
import React from "react";

import { useDropzone, type FileRejection, type FileWithPath } from "react-dropzone";
import toast from "react-hot-toast";
import { CropIcon, FilePlus2, TimerResetIcon, X } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

import "cropperjs/dist/cropper.css";

export type FileWithPreview = FileWithPath & {
	preview: string;
};

export default function CreatePost() {
	const [open, setOpen] = React.useState(false);
	const [files, setFiles] = React.useState<FileWithPreview[] | null>(null);

	const onDrop = React.useCallback(
		(acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
			acceptedFiles.forEach((file) => {
				const fileWithPreview = Object.assign(file, {
					preview: URL.createObjectURL(file),
				});
				setFiles((prev) => [...(prev ?? []), fileWithPreview]);
			});

			if (rejectedFiles.length > 0) {
				rejectedFiles.forEach(({ errors }) => {
					if (errors[0]?.code === "file-too-large") {
						toast.error(`File is too large. Max size is ${formatBytes(1024 * 1024 * 2)}`);
						return;
					}
					errors[0]?.message && toast.error(errors[0].message);
				});
			}
		},

		[setFiles]
	);

	React.useEffect(() => {
		setFiles(null);
	}, [open]);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: { "image/*": [] },
	});

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
						<div className="flex flex-col gap-5 p-6 w-full h-full">
							<ScrollArea className="h-[300px] w-full">
								<textarea
									className="w-full pt-2 border border-separator-divider px-4 bg-banner h-[168px] resize-none mb-1"
									placeholder="Write a caption..."
								/>

								<section className="flex flex-col mb-5">
									<h3 className="text-sm">Accessibility</h3>

									<p className="text-xs text-secondary-text">
										Alt text describes your photos for people with visual impairments. Good
										descriptions are concise, but present what&apos;s in your photos accurately
										enough to understand their context.
									</p>
								</section>

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
								<button className="text-primary-button font-semibold text-sm hover:text-link">
									Post
								</button>

								<button
									{...getRootProps()}
									className="bg-banner p-3 rounded-full">
									<input {...getInputProps()} />
									<FilePlus2 className="h-5 w-5 text-primary-text" />
									<span className="sr-only">Add file</span>
								</button>
							</section>
						</div>
					) : (
						<section
							{...getRootProps()}
							className="p-6 w-full h-full min-h-[348px] flex items-center justify-center flex-col gap-3">
							<input {...getInputProps()} />
							<Image
								className="icons"
								src={icons.media}
								title="Icon to represent media such as images or videos"
								alt="Icon to represent media such as images or videos"
								aria-label="Icon to represent media such as images or videos"
							/>

							<p className="text-sm font-normal leading-[25px] max-w-[250px] text-center">
								Simply drag and drop your photos and videos into this area to upload them.
							</p>
							<button className="px-4 py-[7px] bg-primary-button text-white rounded-[8px] text-sm font-semibold">
								Select from computer
							</button>
						</section>
					)}
				</section>
			</DialogContent>
		</Dialog>
	);
}

interface FileCardProps {
	i: number;
	file: FileWithPreview;
	files: FileWithPreview[] | null;
	setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>;
}

function FileCard({ i, file, files, setFiles }: FileCardProps) {
	const [isOpen, setIsOpen] = React.useState(false);
	const [cropData, setCropData] = React.useState<string | null>(null);
	const cropperRef = React.useRef<ReactCropperElement>(null);

	const onCrop = React.useCallback(() => {
		if (!files || !cropperRef.current) return;

		const croppedCanvas = cropperRef.current?.cropper.getCroppedCanvas();
		setCropData(croppedCanvas.toDataURL());

		croppedCanvas.toBlob((blob) => {
			if (!blob) {
				console.error("Blob creation failed");
				return;
			}
			const croppedImage = new File([blob], file.name, {
				type: file.type,
				lastModified: Date.now(),
			});

			const croppedFileWithPathAndPreview = Object.assign(croppedImage, {
				preview: URL.createObjectURL(croppedImage),
				path: file.name,
			}) satisfies FileWithPreview;

			const newFiles = files.map((file, j) => (j === i ? croppedFileWithPathAndPreview : file));
			setFiles(newFiles);
		});
	}, [file.name, file.type, files, i, setFiles]);

	React.useEffect(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === "Enter") {
				onCrop();
				setIsOpen(false);
			}
		}
		document.addEventListener("keydown", handleKeydown);
		return () => document.removeEventListener("keydown", handleKeydown);
	}, [onCrop]);

	return (
		<div className="w-full flex flex-col items-center justify-between gap-2.5 mb-5">
			<section className="w-full relative flex items-center justify-between gap-2.5">
				<div className="flex items-center gap-2">
					<Image
						src={file.preview}
						alt={file.name}
						className="h-10 w-10 shrink-0 rounded-[6px]"
						width={40}
						height={40}
						loading="lazy"
					/>
					<div className="flex flex-col">
						<p className="line-clamp-1 text-sm font-medium text-muted-foreground">{file.name}</p>
						<p className="text-xs text-secondary-text">{(file.size / 1024 / 1024).toFixed(2)}MB</p>
					</div>
				</div>

				<div className="flex items-center gap-2">
					{file.type.startsWith("image") && (
						<Dialog
							open={isOpen}
							onOpenChange={setIsOpen}>
							<DialogTrigger asChild>
								<button
									type="button"
									className="h-7 w-7">
									<CropIcon
										className="h-4 w-4 text-primary-text"
										aria-hidden="true"
									/>
									<span className="sr-only">Crop image</span>
								</button>
							</DialogTrigger>

							<DialogContent>
								<div className="mt-8 grid place-items-center space-y-5">
									<Cropper
										ref={cropperRef}
										className="h-[450px] w-[450px] object-cover"
										zoomTo={0.5}
										initialAspectRatio={1 / 1}
										preview=".img-preview"
										src={file.preview}
										viewMode={1}
										minCropBoxHeight={10}
										minCropBoxWidth={10}
										background={false}
										responsive={true}
										autoCropArea={1}
										checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
										guides={true}
									/>
									<div className="flex items-center justify-center space-x-2">
										<button
											aria-label="Crop image"
											type="button"
											className="h-8 px-4 py-[7px] bg-primary-button text-white rounded-[8px] text-sm font-semibold flex items-center"
											onClick={() => {
												onCrop();
												setIsOpen(false);
											}}>
											<CropIcon
												className="mr-2 h-3.5 w-3.5"
												aria-hidden="true"
											/>
											Crop image
										</button>
										<button
											aria-label="Reset crop"
											type="button"
											className="h-8 px-4 py-[7px] bg-primary-button text-white rounded-[8px] text-sm font-semibold flex items-center"
											onClick={() => {
												cropperRef.current?.cropper.reset();
												setCropData(null);
											}}>
											<TimerResetIcon
												className="mr-2 h-3.5 w-3.5"
												aria-hidden="true"
											/>
											Reset crop
										</button>
									</div>
								</div>
							</DialogContent>
						</Dialog>
					)}
					<button
						type="button"
						className="h-7 w-7"
						onClick={() => {
							if (!files) return;
							setFiles(files.filter((_, j) => j !== i));
						}}>
						<X
							className="h-4 w-4 text-primary-text"
							aria-hidden="true"
						/>
						<span className="sr-only">Remove file</span>
					</button>
				</div>
			</section>

			<input
				className="w-full border border-separator-divider bg-banner mb-1 p-2"
				type="text"
				name=""
				id=""
				placeholder="Write alt text..."
			/>
		</div>
	);
}
