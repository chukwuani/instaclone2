import { icons } from "@/constants";
import Image from "next/image";

const NewPost = () => {
	return (
		<>
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
		</>
	);
};

export default NewPost;
