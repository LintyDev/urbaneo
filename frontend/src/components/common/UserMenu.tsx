import {
	CircleHelp,
	LogOut,
	MonitorCog,
	Settings,
	User,
	UserPen,
} from "lucide-react";
import {
	Popover,
	PopoverButton,
	PopoverGroup,
	PopoverPanel,
} from "@headlessui/react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { getImageUrl } from "@/lib/getImagesUrl";
import { useEffect, useState } from "react";

const linkAdmin = [
	{
		name: "Editer mon profil",
		href: "/account",
		icon: UserPen,
		color: "hover:bg-[#0000001a]",
	},
	{
		name: "À propos",
		href: "/about",
		icon: CircleHelp,
		color: "hover:bg-[#0000001a]",
	},
	{
		name: "Administration",
		href: "/dashboard",
		icon: Settings,
		color: "hover:bg-[#3b82f61a]",
	},
	{
		name: "Modération",
		href: "/moderation",
		icon: MonitorCog,
		color: "hover:bg-[#f973161a]",
	},
];

const linkUser = [
	{
		name: "Editer mon profil",
		href: "/account",
		icon: UserPen,
		color: "hover:bg-[#0000001a]",
	},
	{
		name: "À propos",
		href: "/about",
		icon: CircleHelp,
		color: "hover:bg-[#0000001a]",
	},
];

function UserMenu() {
	const { user, logout } = useAuth();
	const router = useRouter();
	const pathname = usePathname();
	const colorBgMenu = pathname === "/" ? "bg-[rgba(0,0,0,0.58)]" : "bg-white";
	const colorHr = pathname === "/" ? "bg-white/10" : "bg-black/10";
	const [link, setLink] = useState(linkUser);
	const goToLogin = () => {
		router.push("/auth/login");
	};

	const handleLogout = async () => {
		await logout();
	};

	useEffect(() => {
		if (user && user.role === "ADMIN") {
			setLink(linkAdmin);
		}
	}, [user]);

	if (!user) {
		return <User className="cursor-pointer" onClick={goToLogin} />;
	}

	return (
		<PopoverGroup className="flex gap-x-12">
			<Popover className="relative">
				<PopoverButton className="flex cursor-pointer">
					<User className="cursor-pointer" />
				</PopoverButton>
				<PopoverPanel
					className={`absolute right-0 top-full z-[1000] mt-3 w-64 max-w-md overflow-hidden rounded-xl ${colorBgMenu} text-sm menu-shadow`}
				>
					<div className="flex p-4 gap-4 items-center">
						<Image
							src={getImageUrl(user.avatar)}
							unoptimized={true}
							alt="Avatar"
							width={48}
							height={48}
							className="rounded-full object-cover w-[48px] h-[48px]"
						/>
						<div className="flex flex-col gap-[2px]">
							<p className="text-lg">
								{user.firstName} {user.lastName}
							</p>
							<p>{user.email}</p>
						</div>
					</div>
					<hr className={`mx-2 h-px ${colorHr} border-0`} />

					<div className="py-4 px-2">
						{link.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={`flex items-center gap-2 text-base py-2 px-3 rounded-md ${item.color} `}
							>
								<item.icon size={18} />
								<p>{item.name}</p>
							</Link>
						))}
					</div>

					<hr className={`mx-2 h-px ${colorHr} border-0`} />
					<div className="flex justify-between p-4">
						<div className="flex flex-col">
							<p className="text-base">Free Plan</p>
							<p className="text-xs italic font-light">
								Vue(s) restante(s) : 5
							</p>
						</div>
						<Link
							href={"/premium"}
							className="cursor-pointer rounded-md bg-white px-[4px] py-1 text-sm font-semibold self-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						>
							Upgrade
						</Link>
					</div>

					<hr className={`mx-2 h-px ${colorHr} border-0`} />
					<div className="p-2">
						<p
							className="flex items-center gap-2 text-base py-2 px-3 rounded-md cursor-pointer hover:bg-red-900/80 hover:text-red-400"
							onClick={handleLogout}
						>
							<LogOut /> Déconnexion
						</p>
					</div>
				</PopoverPanel>
			</Popover>
		</PopoverGroup>
	);
}

export default UserMenu;
