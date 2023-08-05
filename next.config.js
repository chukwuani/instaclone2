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
				hostname: "robohash.org",
				port: "",
			},
		],
	},
};

module.exports = nextConfig;
