"use client";
import Link from "next/link";
import React from "react";

const Error = () => {
	return (
		<main className="main-content">
			<h1>Sorry, this page isn&apos;t available.</h1>
			<p>
				The link you followed may be broken, or the page may have been removed.{" "}
				<Link href={window.origin}>Go back to Instagram.</Link>
			</p>
		</main>
	);
};

export default Error;
