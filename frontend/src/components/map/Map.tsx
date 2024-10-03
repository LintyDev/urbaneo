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

const MapComponent = ({
	className,
}: {
	className?: MapContainerProps["className"];
}) => {
	// https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png
	return (
		<MapContainer
			center={[50.633333, 3.066667]}
			zoom={14}
			style={{ height: "100%", width: "100%" }}
			scrollWheelZoom={false}
			// @ts-ignore
			smoothSensitivity={1.5}
			smoothWheelZoom={true}
			className={className}
		>
			<TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
		</MapContainer>
	);
};

export default MapComponent;
