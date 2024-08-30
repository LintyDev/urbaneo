import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("@/components/map/Map"), {
	ssr: false,
});

function Map() {
	return (
		<section>
			<DynamicMap />
		</section>
	);
}

export default Map;
