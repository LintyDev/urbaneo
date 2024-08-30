import { X } from "lucide-react";

function ErrorBox() {
	return (
		<div className="flex flex-col items-center">
			<X size={40} />
			<p>Une erreur est survenue lors de la récupérations des données.</p>
			<p>Veuillez recharger la page ou contacter @Linty.</p>
		</div>
	);
}

export default ErrorBox;
