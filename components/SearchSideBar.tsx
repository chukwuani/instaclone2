const SearchSideBar = ({ activeLink }: { activeLink: string }) => {
	return (
		<section
			className={
				activeLink === "search" ? "showing-search-sidebar search-sidebar" : "search-sidebar"
			}>
			<article className="search-sidebar-head">
				<h1 className="pt-3 pb-9 pr-[14px] pl-6 my-2 text-[24px] leading-[30px] font-semibold primary-text">
					Search
				</h1>

				<div className="search-container mx-4">
					<span className="mr-3">
						<svg
							aria-label="Search"
							className="_ab6-"
							color="#8e8e8e"
							fill="#8e8e8e"
							height="16"
							role="img"
							viewBox="0 0 24 24"
							width="16">
							<path
								d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"></path>
							<line
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								x1="16.511"
								x2="22"
								y1="16.511"
								y2="22"></line>
						</svg>
					</span>

					<input className="search" type="search" name="search" id="search" placeholder="search" />
				</div>
			</article>

			<div className="search-result-wrapper">
				<div className="search-result-cta">
					<p>Recent</p>
					{/* <a href="#">Clear all</a> */}
				</div>

				<div className="search-result">
					<p>No recent searches.</p>
				</div>
			</div>
		</section>
	);
};

export default SearchSideBar;
