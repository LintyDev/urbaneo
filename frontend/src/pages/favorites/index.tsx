import POICard from "@/components/cards/POICard";
import ErrorBox from "@/components/common/ErrorBox";
import LoadingBox from "@/components/common/LoadingBox";
import { useGetPoIsBySlugQuery } from "@/graphql/schema";
import { useEffect, useState } from "react";

function Favorites() {
	const [favorites, setFavorites] = useState<string[]>([]);
	const { loading, data, error } = useGetPoIsBySlugQuery({
		variables: { slug: favorites },
	});

	useEffect(() => {
		setFavorites(JSON.parse(localStorage.getItem("favorite") ?? "[]"));
	}, []);

	if (loading) return <LoadingBox />;
	if (error) return <ErrorBox />;
	return (
		<section className="flex flex-col w-full px-5 md:max-w-5xl md:mx-auto">
			<p className="font-medium text-3xl text-start mb-2">Mes favories</p>
			<div className="grid grid-cols-1 gap-3 md:grid-cols-3 w-full p-5 justify-items-center">
				{data &&
					data.getPOIsBySlug &&
					data.getPOIsBySlug.map((poi) => (
						<POICard
							key={poi.slug}
							poi={poi}
							cityName={poi.city.name}
							goTo={`/discover/${poi.slug}`}
						/>
					))}
			</div>
		</section>
	);
}

export default Favorites;
