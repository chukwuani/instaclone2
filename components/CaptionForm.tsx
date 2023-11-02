interface CaptionFormProps {
	caption: string;
	setCaption: React.Dispatch<React.SetStateAction<string>>;
}

const CaptionForm = ({ caption, setCaption }: CaptionFormProps) => {
	return (
		<>
			<section className="border border-separator-divider bg-secondary-background rounded-[3px] flex flex-col w-auto text-sm leading-normal relative mb-2">
				<textarea
					maxLength={2200}
					value={caption}
					onChange={(e) => setCaption(e.target.value)}
					className="w-full !text-sm form-input resize-none h-[150px] placeholder:!text-sm"
					placeholder="Write a caption..."
				/>
			</section>

			<section className="flex flex-col mb-5">
				<h3 className="text-sm">Accessibility</h3>

				<p className="text-xs text-secondary-text">
					Alt text describes your photos for people with visual impairments. Good descriptions are
					concise, but present what&apos;s in your photos accurately enough to understand their
					context.
				</p>
			</section>
		</>
	);
};

export default CaptionForm;
