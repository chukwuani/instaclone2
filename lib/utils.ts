import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: "accurate" | "normal" = "normal"
) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"]
  if (bytes === 0) return "0 Byte"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`
}

export function formatTimeDifference(postCreatedAtInSeconds: number): string {
  const nowInSeconds = Math.floor(Date.now() / 1000);
  const timeDifferenceInSeconds = nowInSeconds - postCreatedAtInSeconds;

  // Define time intervals in seconds
  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (timeDifferenceInSeconds < minute) {
    return 'just now';
  } else if (timeDifferenceInSeconds < hour) {
    const minutes = Math.floor(timeDifferenceInSeconds / minute);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (timeDifferenceInSeconds < day) {
    const hours = Math.floor(timeDifferenceInSeconds / hour);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (timeDifferenceInSeconds < week) {
    const days = Math.floor(timeDifferenceInSeconds / day);
    if (days === 1) {
      return 'yesterday';
    } else {
      return `${days} days ago`;
    }
  } else if (timeDifferenceInSeconds < month) {
    const weeks = Math.floor(timeDifferenceInSeconds / week);
    if (weeks === 1) {
      return '1 week ago';
    } else {
      const date = new Date(postCreatedAtInSeconds * 1000);
      return `${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    }
  } else if (timeDifferenceInSeconds < year) {
    const months = Math.floor(timeDifferenceInSeconds / month);
    if (months === 1) {
      return '1 month ago';
    } else {
      const date = new Date(postCreatedAtInSeconds * 1000);
      return `${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    }
  } else {
    const date = new Date(postCreatedAtInSeconds * 1000);
    return `${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
  }
}


