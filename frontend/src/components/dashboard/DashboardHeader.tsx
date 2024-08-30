import { useAuth } from "@/contexts/AuthContext";
import { getImageUrl } from "@/lib/getImagesUrl";
import Image from "next/image";
import { usePathname } from "next/navigation";

function DashboardHeader() {
	const pathname = usePathname();
	const { user } = useAuth();

	return (
		<div className="bg-white rounded-2xl p-3 flex items-center justify-between shadow-sm">
			<p className="text-2xl">Dashboard</p>
			<div className="flex gap-2">
				<Image
					src={getImageUrl(user?.avatar)}
					alt="User avatar"
					width={48}
					height={48}
					unoptimized={true}
					className="rounded-xl object-cover"
				/>
				<div>
					<p>
						{user?.lastName} {user?.firstName}
					</p>
					<p className="font-thin italic text-sm">{user?.email}</p>
				</div>
			</div>
		</div>
	);
}

export default DashboardHeader;
