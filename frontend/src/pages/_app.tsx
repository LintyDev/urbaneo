import DashboardLayout from "@/components/layout/DashboardLayout";
import ModerationLayout from "@/components/layout/ModerationLayout";
import RootLayout from "@/components/layout/RootLayout";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const client = new ApolloClient({
	uri: process.env.NEXT_PUBLIC_BACKEND_URL,
	cache: new InMemoryCache({
		addTypename: false,
	}),

	credentials: "include",
});

export default function App({
	Component,
	pageProps,
	router,
}: AppPropsWithLayout) {
	const getLayout =
		Component.getLayout ??
		((page) => {
			if (router.pathname.startsWith("/dashboard")) {
				return <DashboardLayout>{page}</DashboardLayout>;
			}

			if (router.pathname.startsWith("/moderation")) {
				return <ModerationLayout>{page}</ModerationLayout>;
			}

			if (router.pathname.startsWith("/auth")) {
				return page;
			}

			return <RootLayout>{page}</RootLayout>;
		});

	return (
		<ApolloProvider client={client}>
			<AuthProvider>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1, viewport-fit=cover"
				/>
				{getLayout(<Component {...pageProps} />)}
			</AuthProvider>
		</ApolloProvider>
	);
}
