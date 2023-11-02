/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "img.clerk.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "firebasestorage.googleapis.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "robohash.org",
				port: "",
			},
			{
				protocol: "https",
				hostname: "source.unsplash.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
			},
		],
	},
};

module.exports = nextConfig;
