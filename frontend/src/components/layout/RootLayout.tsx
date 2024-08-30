import { PropsWithChildren } from "react";
import Footer from "../common/Footer";
import NavBar from "../common/NavBar";

function RootLayout({ children }: PropsWithChildren) {
	return (
		<main className="w-svw h-svh grid grid-rows-[auto_1fr_auto] font-helvetica">
			<NavBar />
			{children}
			<Footer />
		</main>
	);
}

export default RootLayout;
