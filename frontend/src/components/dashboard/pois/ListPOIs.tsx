import ErrorBox from "@/components/common/ErrorBox";
import LoadingBox from "@/components/common/LoadingBox";
import { Query, useGetPoIsQuery } from "@/graphql/schema";
import { getImageUrl } from "@/lib/getImagesUrl";
import { Trash2 } from "lucide-react";
import Image from "next/image";

function ListPOIs({
	showAll,
	modal,
	setPoi,
	deletePoi,
}: {
	showAll: boolean;
	modal: string;
	setPoi: (poi: Query["getPOIs"][number]) => void;
	deletePoi: (poi: Query["getPOIs"][number]) => void;
}) {
	const { data, loading, error } = useGetPoIsQuery();

	const handleEditPOI = (poi: Query["getPOIs"][number]) => {
		if (showAll || modal === "update") {
			setPoi(poi);
		}
	};

	if (loading) return <LoadingBox />;
	if (error) return <ErrorBox />;
	return (
		<div className="h-full grid grid-rows-[auto_1fr_auto] bg-gray-200/50 rounded-2xl text-gray-500 shadow-md">
			<div
				className={`${
					showAll
						? "grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr_0.2fr]"
						: "grid grid-cols-[1fr_1fr] w-[500px] max-w-[500px]"
				} text-xs rounded-t-2xl font-semibold text-gray-700 uppercase bg-gray-200 py-3 px-5 whitespace-nowrap`}
			>
				<p>#</p>
				<p>Nom</p>
				<p className={`${showAll ? "" : "hidden"}`}>Slug</p>
				<p className={`${showAll ? "" : "hidden"}`}>Adresse</p>
				<p className={`${showAll ? "" : "hidden"}`}>Coordonnées</p>
				<p className={`${showAll ? "" : "hidden"}`}>Action</p>
			</div>
			<div className="overflow-y-auto max-h-full">
				{data?.getPOIs.map((poi) => (
					<div
						key={poi.id}
						className={`${
							showAll
								? "grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr_0.2fr]"
								: "grid grid-cols-[1fr_1fr]"
						} items-center py-[11px] px-5 overflow-hidden odd:bg-white even:bg-gray-50
             ${
								showAll || modal === "update"
									? "cursor-pointer hover:odd:bg-blue-50/80 hover:even:bg-blue-50/80"
									: ""
							}`}
						onClick={() => handleEditPOI(poi as Query["getPOIs"][number])}
					>
						<p className="text-gray-700 font-medium">
							<Image
								src={getImageUrl(poi.photos[0])}
								alt={"photo1" + getImageUrl(poi.photos[0])}
								width={70}
								height={70}
								unoptimized={true}
								className="rounded-lg"
								priority={false}
							/>
						</p>
						<p className="text-gray-700 font-medium">{poi.name}</p>
						<p className={`${showAll ? "" : "hidden"}`}>{poi.slug}</p>
						<p className={`${showAll ? "" : "hidden"}`}>
							{poi.address + " - " + poi.city.name}
						</p>
						<p className={`${showAll ? "" : "hidden"}`}>
							{poi.coordinates.y + ", " + poi.coordinates.x}
						</p>
						<Trash2
							className={`cursor-pointer hover:text-red-600 justify-self-center ${
								showAll ? "" : "hidden"
							}`}
							onClick={(e) => {
								e.stopPropagation();
								deletePoi(poi as Query["getPOIs"][number]);
							}}
						/>
					</div>
				))}
			</div>
			<p className="text-right py-2 px-5 bg-gray-200 rounded-b-2xl shadow-top">
				1 - {data?.getPOIs.length} sur {data?.getPOIs.length}
			</p>
		</div>
	);
}

export default ListPOIs;
