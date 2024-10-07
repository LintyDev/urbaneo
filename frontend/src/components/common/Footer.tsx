import Link from "next/link";

function Footer() {
	return (
		<div className="text-center hover:underline">
			<Link href={"/about"}>© Urbaneo.tech</Link>
		</div>
	);
}

export default Footer;
