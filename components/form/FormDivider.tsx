const FormDivider = () => {
	return (
		<section className="flex w-full py-0 px-10 mt-[10px] mb-[18px]">
			<div className="bg-separator-divider w-full h-[1px] flex relative top-[0.45em] grow" />
			<p className="mx-[18px] text-secondary-text font-semibold text-[0.8125rem] leading-[1.1538]">
				OR
			</p>
			<div className="bg-separator-divider w-full h-[1px] flex relative top-[0.45em] grow" />
		</section>
	);
};

export default FormDivider;
