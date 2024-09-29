import {
	BadgeCheck,
	Building2,
	LayoutDashboard,
	List,
	MapPinned,
	Monitor,
	Star,
	Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function DashboardMenu() {
	const pathname = usePathname();
	return (
		<aside className="py-5 pl-5 w-60 h-full flex-shrink-0">
			<div className="bg-white rounded-2xl h-full flex flex-col flex-shrink-0 shadow-md px-2 pt-5 pb-2">
				<div className="mb-6 flex items-center gap-2 pl-2">
					<Image
						src={"/assets/img/app-admin.png"}
						alt="Logo in admin"
						height={45}
						width={45}
					/>
					<p>Urbaneo.tech</p>
				</div>

				<div className="flex flex-col justify-between h-full">
					<div className="flex flex-col gap-2 font-light">
						<p className="font-thin text-xs pl-2">Web</p>
						<Link
							href={"/dashboard"}
							className={`flex items-center gap-4 rounded-lg py-2 px-4 ${
								pathname === "/dashboard" ? "bg-[#ebf2ff] shadow-sm" : ""
							} hover:bg-[#ebf2ff] hover:shadow-sm`}
						>
							<LayoutDashboard size={19} /> Dashboard
						</Link>
						<Link
							href={"/dashboard/cities"}
							className={`flex items-center gap-4 rounded-lg py-2 px-4 ${
								pathname === "/dashboard/cities" ? "bg-[#ebf2ff] shadow-sm" : ""
							} hover:bg-[#ebf2ff] hover:shadow-sm`}
						>
							<Building2 size={19} /> Villes
						</Link>
						<Link
							href={"/dashboard/categories"}
							className={`flex items-center gap-4 rounded-lg py-2 px-4 ${
								pathname === "/dashboard/categories"
									? "bg-[#ebf2ff] shadow-sm"
									: ""
							} hover:bg-[#ebf2ff] hover:shadow-sm`}
						>
							<List size={19} /> Catégories
						</Link>
						<Link
							href={"/dashboard/pois"}
							className={`flex items-center gap-4 rounded-lg py-2 px-4 ${
								pathname === "/dashboard/pois" ? "bg-[#ebf2ff] shadow-sm" : ""
							} hover:bg-[#ebf2ff] hover:shadow-sm`}
						>
							<MapPinned size={19} /> Points d&apos;intêrets
						</Link>
					</div>

					<div className="flex flex-col gap-2 font-light">
						<p className="font-thin text-xs pl-2">Gestions</p>
						<Link
							href={"#"}
							className={`flex items-center gap-4 rounded-lg py-2 px-4 hover:bg-[#ebf2ff] hover:shadow-sm`}
						>
							<Users size={19} /> Utilisateurs
						</Link>
						<Link
							href={"#"}
							className={`flex items-center gap-4 rounded-lg py-2 px-4 hover:bg-[#ebf2ff] hover:shadow-sm`}
						>
							<Star size={19} /> Notes
						</Link>
						<Link
							href={"#"}
							className={`flex items-center gap-4 rounded-lg py-2 px-4 hover:bg-[#ebf2ff] hover:shadow-sm`}
						>
							<BadgeCheck size={19} /> Premiums
						</Link>
					</div>

					<Link
						href={"/"}
						className="flex items-center gap-4 rounded-lg py-2 px-4 text-nowrap hover:bg-[#f0f1f6] hover:shadow-sm"
					>
						<Monitor size={19} /> Retour sur Urbaneo
					</Link>
				</div>
			</div>
		</aside>
	);
}

export default DashboardMenu;
