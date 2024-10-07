import { PropsWithChildren, use, useEffect } from "react";
import Footer from "../common/Footer";
import NavBar from "../common/NavBar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { UserRole } from "@/graphql/schema";

function ModerationLayout({ children }: PropsWithChildren) {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !user) {
			router.push("/");
			return;
		}

		if (user && user.cityRole.length === 0) {
			user.role !== UserRole.Admin && router.push("/");
		}
	}, [loading, user, router]);

	if (loading) return null;
	return (
		<main className="w-svw h-svh grid grid-rows-[auto_1fr_auto] font-helvetica">
			<NavBar />
			{children}
			<Footer />
		</main>
	);
}

export default ModerationLayout;
