import ErrorBox from "@/components/common/ErrorBox";
import LoadingBox from "@/components/common/LoadingBox";
import ExplorerFilter from "@/components/explorer/ExplorerFilter";
import ExplorerMap from "@/components/explorer/ExplorerMap";
import {
	GetCityFromSearchQuery,
	InputSearchCity,
	PoiBudget,
	useGetCityFromSearchQuery,
} from "@/graphql/schema";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Explorer() {
	const router = useRouter();
	const [city, setCity] =
		useState<GetCityFromSearchQuery["getCityFromSearch"]>();
	const filters: InputSearchCity = {
		slug: (router.query.slug as string) || "none",
	};
	if (router.query.f && typeof router.query.f === "string") {
		const query = JSON.parse(Buffer.from(router.query.f, "base64").toString());
		console.log("query", query);
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

	useEffect(() => {
		if (data?.getCityFromSearch) {
			setCity(data.getCityFromSearch);
		}
	}, [data]);

	if (error) return <ErrorBox />;
	if (loading) return <LoadingBox />;
	if (!data && !loading && !error) {
		router.push("/");
		return null;
	}
	return (
		<section className="grid grid-cols-[auto_1fr] mx-16">
			<ExplorerFilter
				city={data!.getCityFromSearch}
				filters={filters}
				refetch={refetch}
			/>
			{city && <ExplorerMap city={city} />}
		</section>
	);
}

export default Explorer;
