import ErrorBox from "@/components/common/ErrorBox";
import LoadingBox from "@/components/common/LoadingBox";
import ExplorerFilter from "@/components/explorer/ExplorerFilter";
import ExplorerMap from "@/components/explorer/ExplorerMap";
import {
	InputSearchCity,
	PoiBudget,
	useGetCityFromSearchQuery,
} from "@/graphql/schema";
import { useRouter } from "next/router";

function Explorer() {
	const router = useRouter();
	const filters: InputSearchCity = {
		slug: (router.query.slug as string) || "none",
	};
	if (router.query.f && typeof router.query.f === "string") {
		const query = JSON.parse(Buffer.from(router.query.f, "base64").toString());
		filters.budget =
			typeof query.budget === "string"
				? (query.budget.toUpperCase() as PoiBudget)
				: null;
		filters.categoriesId = query.categoriesId;
	}
	const { loading, data, error, refetch } = useGetCityFromSearchQuery({
		variables: {
			data: filters,
		},
	});

	if (error) return <ErrorBox />;
	if (loading) return <LoadingBox />;
	if (!data && !loading && !error) {
		router.push("/");
		return null;
	}
	return (
		<section className="grid grid-cols-[auto_1fr] mx-5">
			<ExplorerFilter
				city={data!.getCityFromSearch}
				filters={filters}
				refetch={refetch}
			/>
			<ExplorerMap city={data!.getCityFromSearch} />
		</section>
	);
}

export default Explorer;
