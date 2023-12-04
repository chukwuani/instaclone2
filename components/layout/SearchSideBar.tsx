"use client";

import { useState, useTransition } from "react";
import SearchLoading from "../SearchLoading";
import { getSearch } from "@/firebase/firebaseService";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";

interface ResultType {
	name: string;
	username: string;
	imageUrl: string;
}

const SearchSideBar = ({ activeLink }: { activeLink: string }) => {
	const [search, setSearch] = useState("");
	const [result, setResult] = useState<DocumentData>([]);
	const [isPending, startTransition] = useTransition();

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (search.length == 0) return;

		startTransition(async () => {
			try {
				const result = await getSearch(search);
				setResult(result);
			} catch (err: any) {
				console.log(err);
			}
		});
	};

	return (
		<section
			className={
				activeLink === "search" ? "showing-search-sidebar search-sidebar" : "search-sidebar"
			}>
			<article className="flex flex-col pb-6 border-b border-separator-divider">
				<h3 className="pt-3 pb-9 pr-[14px] pl-6 my-2 text-[24px] leading-[30px] font-semibold text-primary-text">
					Search
				</h3>

				<form
					onSubmit={handleSearch}
					className="search-container mx-4">
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

					<input
						autoComplete="off"
						autoCorrect="off"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="search"
						type="search"
						name="search"
						id="search"
						placeholder="search"
					/>
				</form>
			</article>

			<div className="flex flex-col grow overflow-y-auto">
				<div className="flex flex-col items-center w-full text-center grow">
					{!isPending ? (
						result?.map((item: ResultType) => (
							<Link
								className="flex justify-start w-full px-6 py-2 hover:bg-hover-overlay"
								href={item.username}
								key={item.username}>
								<Image
									src={item.imageUrl}
									alt={`${item.username} profile photo`}
									width={44}
									height={44}
									quality={100}
									className="rounded-full mr-3 h-fit"
								/>

								<section className="flex flex-col justify-start items-start">
									<h4 className="text-sm text-primary-text font-semibold">{item.username}</h4>
									<p className="text-sm text-secondary-text font-normal">{item.name}</p>
								</section>
							</Link>
						))
					) : (
						<SearchLoading />
					)}

					{result?.length == 0 && !isPending && (
						<p className="text-sm font-semibold text-secondary-text text-center my-auto w-full">
							No search results found.
						</p>
					)}
				</div>
			</div>
		</section>
	);
};

export default SearchSideBar;
