import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	MapContainerProps,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet";
import "@/lib/SmoothWheelZoom";
import { Heart, icons, LeafIcon, X } from "lucide-react";
import { GetCityFromSearchQuery, Poi } from "@/graphql/schema";
import { Icon, IconOptions, Map } from "leaflet";
import { getImageUrl } from "@/lib/getImagesUrl";
import { useState } from "react";
import Image from "next/image";
import POICard from "../cards/POICard";

// Title Layer
// https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png

const MapComponent = ({
	cityName,
	className,
	x,
	y,
	marker,
}: {
	cityName?: string;
	className?: MapContainerProps["className"];
	x?: number;
	y?: number;
	marker?: GetCityFromSearchQuery["getCityFromSearch"]["pois"];
}) => {
	const [map, setMap] = useState<Map | null>(null);

	const handleClosePopUp = () => {
		if (!map) return;
		map.closePopup();
	};

	return (
		<MapContainer
			center={x && y ? [y, x] : [50.633333, 3.066667]}
			zoom={14}
			style={{ height: "100%", width: "100%" }}
			scrollWheelZoom={false}
			// @ts-ignore
			smoothSensitivity={1.5}
			smoothWheelZoom={true}
			className={className}
			ref={setMap}
		>
			<TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
			{marker &&
				marker.length > 0 &&
				marker.map((poi) => {
					const icon = new Icon({
						iconUrl: getImageUrl(poi.photos[0]),
						className: "map-marker shadow-md",
						iconAnchor: [35, 35],
					});
					return (
						<Marker
							key={poi.id}
							position={[poi.coordinates.x, poi.coordinates.y]}
							icon={icon}
						>
							<Popup closeButton={false} className="">
								<POICard
									key={poi.id}
									poi={poi}
									cityName={cityName ?? ""}
									map={map as Map}
								/>
								{/* <div className="flex flex-col">
									<p>
										<X onClick={handleClosePopUp} />
									</p>
								</div> */}
							</Popup>
						</Marker>
					);
				})}
		</MapContainer>
	);
};

export default MapComponent;
