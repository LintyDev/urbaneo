import { GetCityFromSearchQuery, Label, UserRole } from "@/graphql/schema";
import dynamic from "next/dynamic";
import POICard from "../cards/POICard";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ExplorerEdit from "./ExplorerEdit";
import ExplorerAddPOI from "./ExplorerAddPOI";

const Map = dynamic(() => import("@/components/map/Map"), {
	ssr: false,
});

function ExplorerMap({
	city,
}: {
	city: GetCityFromSearchQuery["getCityFromSearch"];
}) {
	const { user } = useAuth();
	const [triggerMap, setTriggerMap] = useState<{
		LatLng: [number, number];
		id: string;
	}>({ LatLng: [0, 0], id: "" });

	return (
		<div className="grid grid-rows-[auto_1fr_auto] ml-5">
			<div className="text-2xl font-medium flex items-center justify-between">
				<p>{city.pois.length} Résultat(s)</p>
				<div className="flex items-center gap-2 text-sm">
					{(user?.cityRole.some((r) => r.city.id === r.city.id) ||
						user?.role === UserRole.Admin) && (
						<ExplorerAddPOI cityId={city.id} cityName={city.name} />
					)}
					{/* {(user?.cityRole.some(
						(r) => r.label === Label.CityAdmin && r.city.id === r.city.id
					) ||
						user?.role === UserRole.Admin) && <ExplorerEdit city={city} />} */}
				</div>
			</div>
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
