import { useGetNearPoIsQuery } from "@/graphql/schema";
import LoadingBox from "../common/LoadingBox";
import ErrorBox from "../common/ErrorBox";
import POICard from "../cards/POICard";

function DiscoverAlso({ slug }: { slug: string }) {
	const { loading, data, error } = useGetNearPoIsQuery({
		fetchPolicy: "no-cache",
		variables: { slug },
	});

	if (loading) return <LoadingBox />;
	if (error) return <ErrorBox />;
	return (
		<div>
			<p className="font-light text-lg mb-3">Voir aussi..</p>
			{data && data.getNearPOIs.length > 0 && (
				<div className="flex items-center gap-3">
					{data.getNearPOIs.map(
						(poi) =>
							poi.slug !== slug && (
								<POICard
									key={poi.id}
									poi={poi}
									cityName={poi.city.name}
									goTo={`/discover/${poi.slug}`}
								/>
							)
					)}
				</div>
			)}
		</div>
	);
}

export default DiscoverAlso;
