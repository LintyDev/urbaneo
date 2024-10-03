import { GetCityFromSearchQuery, PoiBudget } from "@/graphql/schema";
import { getImageUrl } from "@/lib/getImagesUrl";
import { DollarSign, Heart, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import DynamicIcon, { IconProps } from "../common/DynamicIcon";

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
			/>
			<div className="flex gap-3 overflow-x-auto mt-6">
				{city.pois.map((poi) => (
					<div key={poi.id} className="flex flex-col cursor-pointer">
						<div className="w-[250px] h-[150px] relative">
							<Image
								src={getImageUrl(poi.photos[0])}
								alt={`${poi.name} representative`}
								width={250}
								height={150}
								className="w-[250px] h-[150px] object-cover object-center rounded-lg"
								unoptimized={true}
							/>
							<p className="absolute top-1 right-1 p-2 bg-white rounded-full hover:bg-white/80 hover:text-red-700">
								<Heart size={20} />
							</p>
						</div>

						<p className="font-medium">{poi.name}</p>
						<div className="flex items-center justify-between">
							<p className="flex gap-1 font-light">
								<MapPin strokeWidth={0.5} />
								<span>{city.name}</span>
							</p>
							<p className="flex items-center gap-1">
								{poi.categories.map((c, i) => (
									<DynamicIcon
										name={c.icon as IconProps["name"]}
										size={17}
										key={i}
									/>
								))}
							</p>
							<p className="flex items-center">
								<DollarSign strokeWidth={1} size={17} />
								{(poi.budget === PoiBudget.Mid ||
									poi.budget === PoiBudget.High) && (
									<DollarSign strokeWidth={1} size={17} />
								)}
								{poi.budget === PoiBudget.High && (
									<DollarSign strokeWidth={1} size={17} />
								)}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ExplorerMap;
