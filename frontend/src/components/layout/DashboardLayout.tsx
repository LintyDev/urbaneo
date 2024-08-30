import { PropsWithChildren, useEffect } from "react";
import DashboardMenu from "../dashboard/DashboardMenu";
import DashboardHeader from "../dashboard/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

function DashboardLayout({ children }: PropsWithChildren) {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		document.body.style.backgroundColor = "#f0f1f6";
		document.body.style.color = "#1f1f1f";

		if (!loading && (!user || user.role !== "ADMIN")) {
			router.replace("/");
		}

		return () => {
			document.body.style.backgroundColor = "white";
			document.body.style.color = "black";
		};
	}, [user, router, loading]);

	if (loading || !user || user.role !== "ADMIN") {
		return null;
	}

	return (
		<div className="w-svw h-svh flex min-h-screen">
			<DashboardMenu />
			<main className="flex flex-col pl-3 h-full w-full pt-5 pr-5 overflow-x-hidden">
				<DashboardHeader />
				{children}
			</main>
		</div>
	);
}

export default DashboardLayout;
