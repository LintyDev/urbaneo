import { Label, MeQuery, MeQueryResult } from "@/graphql/schema";
import { Monitor, PlusCircle, UserCog } from "lucide-react";
import Link from "next/link";

function ModerationCard({
	role,
}: {
	role: {
		__typename?: "Role";
		id: any;
		label: Label;
		city: {
			__typename?: "City";
			id: any;
			slug: string;
			name: string;
		};
	};
}) {
	return (
		<div
			key={role.id}
			className="bg-gray-100 p-5 rounded-xl hover:outline hover:outline-1 hover:outline-gray-300"
		>
			<p className="text-lg font-light">{role.city.name}</p>
			<p className="mb-5">
				{role.label === Label.CityAdmin ? "Administrateur" : "Modérateur"}
			</p>
			<div className="flex flex-col gap-3">
				<button className="flex items-center gap-1 cursor-pointer rounded-md bg-white px-4 py-1 text-sm font-semibold self-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
					<PlusCircle size={14} /> Ajouter un point d&apos;intérêt
				</button>
				{role.label === Label.CityAdmin && (
					<button className="flex items-center gap-1 cursor-pointer rounded-md bg-black px-4 py-1 text-sm font-semibold self-center text-white shadow-sm ring-1 ring-inset ring-gray-900 hover:bg-gray-950">
						<UserCog size={14} /> Gérer les utilisateurs
					</button>
				)}
				<Link
					href={`/explorer/${role.city.slug}`}
					className="flex items-center gap-1 cursor-pointer rounded-md bg-white px-4 py-1 text-sm font-semibold self-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
				>
					<Monitor size={14} /> Voir la ville
				</Link>
			</div>
		</div>
	);
}

export default ModerationCard;
