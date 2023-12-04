import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatBytes(
	bytes: number,
	decimals = 0,
	sizeType: "accurate" | "normal" = "normal"
) {
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
	const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
	if (bytes === 0) return "0 Byte";
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
		sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
	}`;
}

export function formatTimeDifference(createdTimeInSeconds: number): string {
	const nowInSeconds = Math.floor(new Date().getTime() / 1000);
	const differenceInSeconds = nowInSeconds - createdTimeInSeconds;
export function formatTimeDifference(createdTimeInSeconds: number): string {
	const nowInSeconds = Math.floor(new Date().getTime() / 1000);
	const differenceInSeconds = nowInSeconds - createdTimeInSeconds;

	const minute = 60;
	const hour = 60 * minute;
	const day = 24 * hour;
	const week = 7 * day;
	const month = 30 * day;
	const year = 365 * day;

	if (differenceInSeconds < minute) {
	if (differenceInSeconds < minute) {
		return "just now";
	} else if (differenceInSeconds < hour) {
		const minutes = Math.floor(differenceInSeconds / minute);
	} else if (differenceInSeconds < hour) {
		const minutes = Math.floor(differenceInSeconds / minute);
		return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
	} else if (differenceInSeconds < day) {
		const hours = Math.floor(differenceInSeconds / hour);
	} else if (differenceInSeconds < day) {
		const hours = Math.floor(differenceInSeconds / hour);
		return `${hours} hour${hours > 1 ? "s" : ""} ago`;
	} else if (differenceInSeconds < week) {
		const days = Math.floor(differenceInSeconds / day);
	} else if (differenceInSeconds < week) {
		const days = Math.floor(differenceInSeconds / day);
		if (days === 1) {
			return "1 day ago";
		} else {
			return `${days} days ago`;
		}
	} else if (differenceInSeconds < month) {
		const weeks = Math.floor(differenceInSeconds / week);
		const remainingDays = Math.floor((differenceInSeconds % week) / day);
		if (remainingDays === 0) {
			return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
	} else if (differenceInSeconds < month) {
		const weeks = Math.floor(differenceInSeconds / week);
		const remainingDays = Math.floor((differenceInSeconds % week) / day);
		if (remainingDays === 0) {
			return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
		} else {
			const date = new Date(createdTimeInSeconds * 1000);

			return date.toLocaleDateString("en-us", { year: "numeric", month: "long", day: "numeric" });
		}
	} else if (differenceInSeconds < year) {
		const months = Math.floor(differenceInSeconds / month);
		const remainingDays = Math.floor((differenceInSeconds % month) / day);
		if (remainingDays === 0) {
			return `${months} month${months > 1 ? "s" : ""} ago`;
	} else if (differenceInSeconds < year) {
		const months = Math.floor(differenceInSeconds / month);
		const remainingDays = Math.floor((differenceInSeconds % month) / day);
		if (remainingDays === 0) {
			return `${months} month${months > 1 ? "s" : ""} ago`;
		} else {
			const date = new Date(createdTimeInSeconds * 1000);

			return date.toLocaleDateString("en-us", { year: "numeric", month: "long", day: "numeric" });
		}
	} else {
		const date = new Date(createdTimeInSeconds * 1000);

		return date.toLocaleDateString("en-us", { year: "numeric", month: "long", day: "numeric" });
	}
}
