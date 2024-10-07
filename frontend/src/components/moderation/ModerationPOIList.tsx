import {
	GetPoIsByCitySlugDocument,
	GetPoIsByCitySlugQuery,
	PoiBudget,
	useDeletePoiMutation,
} from "@/graphql/schema";
import { getImageUrl } from "@/lib/getImagesUrl";
import Image from "next/image";
import Notes from "../common/Notes";
import { Edit, Euro, Monitor, Trash2, TriangleAlert } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

function ModerationPOIList({
	poi,
	updatePOI,
}: {
	poi: GetPoIsByCitySlugQuery["getPOIsByCitySlug"][number];
	updatePOI: (poi: GetPoIsByCitySlugQuery["getPOIsByCitySlug"][number]) => void;
}) {
	const [showDelete, setShowDelete] = useState(false);

	const [deletePoi] = useDeletePoiMutation({
		refetchQueries: [
			{
				query: GetPoIsByCitySlugDocument,
				variables: { citySlug: poi.city.slug },
			},
		],
	});

	const handleDeletePOI = async () => {
		await deletePoi({
			variables: {
				deletePoiId: poi.id,
			},
		});
	};

	return (
		<div>
			<div
				className={`${
					showDelete ? "hidden" : ""
				} flex gap-2 rounded-lg p-3 hover:bg-gray-100`}
			>
				<div>
					<Image
						src={getImageUrl(poi.photos[0])}
						alt="photo point d'intérêt"
						width={150}
						height={100}
						unoptimized={true}
						className="w-[150px] h-full rounded-xl object-cover object-center"
					/>
				</div>
				<div className="flex flex-col w-full">
					<div className="flex items-center justify-between">
						<p className="text-lg font-light">{poi.name}</p>
						<div className="flex items-center gap-2">
							<Link
								className="cursor-pointer text-gray-400 hover:text-black"
								href={`/discover/${poi.slug}`}
							>
								<Monitor size={20} />
							</Link>
							<p
								className="cursor-pointer text-gray-400 hover:text-black"
								onClick={() => updatePOI(poi)}
							>
								<Edit size={20} />
							</p>
							<p
								className="cursor-pointer text-gray-400 hover:text-red-600"
								onClick={() => setShowDelete(true)}
							>
								<Trash2 size={20} />
							</p>
						</div>
					</div>
					<p>{poi.address}</p>
					<Notes note={poi.averageNote ?? 0} />
					<p className="flex items-center gap-1">
						<Euro size={16} />
						{poi.budget === PoiBudget.High
							? "Haut"
							: poi.budget === PoiBudget.Mid
							? "Moyen"
							: "Bas"}
					</p>
				</div>
			</div>
			<div
				className={`${
					showDelete ? "flex gap-2 rounded-lg p-3 hover:bg-gray-100" : "hidden"
				}`}
			>
				<div className="flex gap-10 justify-center w-full">
					<TriangleAlert
						size={35}
						className="animate-ping self-center text-red-600 mb-2"
					/>
					<div className="flex flex-col gap-3">
						<p>
							Voulez-vous vraiment supprimer le point d&apos;interêt :{" "}
							<b>{poi.name}</b> ?
						</p>
						<div className="flex items-center justify-between">
							<button
								type="button"
								className="flex items-center gap-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
								onClick={() => setShowDelete(false)}
							>
								Annuler
							</button>
							<button
								type="button"
								className="flex items-center gap-2 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ring-red-300 hover:bg-red-900 hover:text-red-400"
								onClick={handleDeletePOI}
							>
								Supprimer : {poi.name}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ModerationPOIList;
