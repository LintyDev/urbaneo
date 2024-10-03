import ErrorBox from "@/components/common/ErrorBox";
import LoadingBox from "@/components/common/LoadingBox";
import ExplorerFilter from "@/components/explorer/ExplorerFilter";
import ExplorerMap from "@/components/explorer/ExplorerMap";
import { useGetCityFromSearchQuery } from "@/graphql/schema";
import { useRouter } from "next/router";

function Explorer() {
	const router = useRouter();
	const { loading, data, error } = useGetCityFromSearchQuery({
		variables: {
			data: {
				slug: (router.query.slug as string) || "none",
			},
		},
	});
	console.log(router.query.f);
	console.log(Buffer.from(router.query.f as string, "base64").toString());

	if (error) return <ErrorBox />;
	if (loading) return <LoadingBox />;
	if (!data && !loading && !error) {
		router.push("/");
		return null;
	}
	return (
		<section className="grid grid-cols-[auto_1fr] mx-5">
			<ExplorerFilter city={data!.getCityFromSearch} />
			<ExplorerMap city={data!.getCityFromSearch} />
		</section>
	);
}

export default Explorer;
