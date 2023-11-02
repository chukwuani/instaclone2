import Cropper, { type ReactCropperElement } from "react-cropper";
import { CropIcon, TimerResetIcon, X } from "lucide-react";
import "cropperjs/dist/cropper.css";
import { FileWithPreview } from "./layout/CreatePost";
import React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface FileCardProps {
	i: number;
	file: FileWithPreview;
	files: FileWithPreview[] | null;
	setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>;
}

export default function FileCard({ i, file, files, setFiles }: FileCardProps) {
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

	const handleAltText = (value: string) => {
		if (!files) return;

		const fileWithAltText = Object.assign(file, {
			altText: value,
		});

		const newFiles = files.map((file, j) => (j === i ? fileWithAltText : file));
		setFiles(newFiles);
	};

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
		<div className="w-full flex flex-wrap items-center justify-between gap-2.5 mb-5">
			<section className="w-full relative flex items-center justify-between gap-2.5">
				<div className="flex items-center gap-2">
					<Image
						src={file.preview}
						alt={file.name}
						className="h-10 w-10 shrink-0 rounded-[6px]"
						width={40}
						height={40}
					/>
					<div className="flex flex-col">
						<p className="line-clamp-1 text-sm font-medium text-muted-foreground">{file.name}</p>
						<p className="text-xs text-secondary-text">{(file.size / 1024 / 1024).toFixed(2)}MB</p>
					</div>
				</div>

				<div className="flex items-center gap-2">
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

			<section className="min-h-[40px] border border-separator-divider bg-secondary-background rounded-[3px] flex flex-col w-auto text-sm leading-normal relative">
				<input
					className="form-input !py-2"
					onChange={(e) => handleAltText(e.target.value)}
					required
					type="text"
					placeholder="Write alt text..."
				/>
			</section>
		</div>
	);
}
