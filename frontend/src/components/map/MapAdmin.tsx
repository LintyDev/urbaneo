import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet";
import "@/lib/SmoothWheelZoom";
import { LatLngExpression } from "leaflet";
import { useEffect } from "react";

function SetViewOnClick({ coords }: { coords: LatLngExpression }) {
	const map = useMap();
	useEffect(() => {
		map.setView(coords);
		map.invalidateSize();
	}, [coords, map]);

	return null;
}

function MapAdmin({ p }: { p: { x: number; y: number } }) {
	return (
		<MapContainer
			id="map_admin"
			center={[0, 0]}
			zoom={13}
			style={{ height: "100%", width: "100%", borderRadius: "0.375rem" }}
			scrollWheelZoom={false}
			smoothSensitivity={1.5}
			smoothWheelZoom={true}
		>
			<TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
			<SetViewOnClick coords={[p.y, p.x]} />
		</MapContainer>
	);
}

export default MapAdmin;
