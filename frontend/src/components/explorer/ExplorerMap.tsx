import { GetCityFromSearchQuery, PoiBudget } from "@/graphql/schema";
import { getImageUrl } from "@/lib/getImagesUrl";
import { DollarSign, Heart, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import DynamicIcon, { IconProps } from "../common/DynamicIcon";
import POICard from "../cards/POICard";

const Map = dynamic(() => import("@/components/map/Map"), {
	ssr: false,
});

function ExplorerMap({
	city,
}: {
	city: GetCityFromSearchQuery["getCityFromSearch"];
}) {
	return (
		<div className="grid grid-rows-[auto_1fr_auto] ml-5">
			<p className="text-2xl font-medium">{city.pois.length} Résultat(s)</p>
			<Map
				className={"rounded-2xl mt-3"}
				x={city.coordinates.x}
				y={city.coordinates.y}
				marker={city.pois}
				cityName={city.name}
			/>
			<div className="flex gap-3 overflow-x-auto mt-6">
				{city.pois.map((poi) => (
					<POICard key={poi.id} poi={poi} cityName={city.name} />
				))}
			</div>
		</div>
	);
}

export default ExplorerMap;
