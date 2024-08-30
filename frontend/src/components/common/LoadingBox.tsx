import { LoaderCircle } from "lucide-react";

function LoadingBox() {
	return (
		<div className="flex flex-col items-center">
			<LoaderCircle size={40} className="animate-spin" />
			<p>Chargement en cours...</p>
		</div>
	);
}

export default LoadingBox;
