/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	distDir: "dist",
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "4005",
			},
		],
	},
	transpilePackages: ["lucide-react"],
};

export default nextConfig;
