import { GetCityFromSearchQuery } from "@/graphql/schema";
import dynamic from "next/dynamic";
import POICard from "../cards/POICard";
import { useState } from "react";

const Map = dynamic(() => import("@/components/map/Map"), {
	ssr: false,
});

function ExplorerMap({
	city,
}: {
	city: GetCityFromSearchQuery["getCityFromSearch"];
}) {
	const [triggerMap, setTriggerMap] = useState<{
		LatLng: [number, number];
		id: string;
	}>({ LatLng: [0, 0], id: "" });

	const openMarker = (id: string) => {};
	return (
		<div className="grid grid-rows-[auto_1fr_auto] ml-5">
			<p className="text-2xl font-medium">{city.pois.length} Résultat(s)</p>
			<Map
				className={"rounded-2xl mt-3"}
				x={city.coordinates.x}
				y={city.coordinates.y}
				marker={city.pois}
				cityName={city.name}
				trigger={triggerMap}
			/>
			<div className="flex gap-3 overflow-x-auto mt-6">
				{city.pois.map((poi) => (
					<div
						key={poi.id}
						onClick={() => {
							setTriggerMap({
								LatLng: [poi.coordinates.x, poi.coordinates.y],
								id: poi.slug,
							});
						}}
					>
						<POICard poi={poi} cityName={city.name} />
					</div>
				))}
			</div>
		</div>
	);
}

export default ExplorerMap;
