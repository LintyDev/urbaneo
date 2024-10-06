import { Heart, MapPinned } from "lucide-react";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { usePathname } from "next/navigation";
import SearchNavBar from "./SearchNavBar";

const displaySearchIn = ["/explorer", "/discover"];

function NavBar() {
	const pathname = usePathname();
	return (
		<nav>
			{/* Desktop Navbar */}
			<div className="flex justify-between items-center py-5 px-16">
				<Link href={"/"} className="flex items-center gap-2">
					<MapPinned /> Urbaneo.tech
				</Link>
				{pathname &&
					displaySearchIn.some((url) => pathname.startsWith(url)) && (
						<SearchNavBar />
					)}
				<div className="flex gap-4">
					<Link href={"/favorites"}>
						<Heart className="cursor-pointer hover:text-red-500" />
					</Link>
					<UserMenu />
				</div>
			</div>

			{/* Mobile Navbar */}
			{/* <div className="flex justify-between px-5 py-2 sm:hidden">
				<Link href={"/"}>Urbaneo.tech</Link>
				<div className="flex gap-4">
					<Link href={"/favorites"}>
						<Heart />
					</Link>
					<User />
				</div>
			</div> */}
		</nav>
	);
}

export default NavBar;
