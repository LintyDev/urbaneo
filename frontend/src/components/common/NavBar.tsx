import { Heart, MapPinned } from "lucide-react";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { usePathname } from "next/navigation";

function NavBar() {
	const pathname = usePathname();
	return (
		<nav>
			{/* Desktop Navbar */}
			<div className="flex justify-between items-center p-5">
				<Link href={"/"} className="flex items-center gap-2">
					<MapPinned /> Urbaneo.tech
				</Link>
				{pathname && pathname.startsWith("/explorer") && (
					<div className="hidden md:block md:w-[400px]">
						<input
							className="w-full rounded-md border-0 py-1.5 px-1.5 bg-gray-200 text-gray-900 z-10 placeholder:text-gray-400 sm:text-sm sm:leading-6"
							placeholder="Recherche une ville"
						/>
					</div>
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
