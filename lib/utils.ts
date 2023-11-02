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

export function formatTimeDifference(postTimestamp: number) {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
  const timeDifference = currentTimestamp - postTimestamp;

  if (timeDifference < 60) {
    return "just now";
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDifference < 86400) {
    const hours = Math.floor(timeDifference / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (timeDifference < 604800) {
    const days = Math.floor(timeDifference / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (timeDifference < 2419200) {
    const weeks = Math.floor(timeDifference / 604800);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else {
    const months = Math.floor(timeDifference / 2419200);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  }
}
