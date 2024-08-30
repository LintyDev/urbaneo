import { Heart } from "lucide-react";
import Link from "next/link";
import UserMenu from "./UserMenu";

function NavBar() {
	return (
		<nav>
			{/* Desktop Navbar */}
			<div className="flex justify-between p-5">
				<Link href={"/"}>Urbaneo.tech</Link>
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
