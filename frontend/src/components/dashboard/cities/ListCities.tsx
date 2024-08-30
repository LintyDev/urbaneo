import ErrorBox from "@/components/common/ErrorBox";
import LoadingBox from "@/components/common/LoadingBox";
import { GetCityQuery, useGetCitiesQuery } from "@/graphql/schema";
import { Trash2 } from "lucide-react";

function ListCities({
	showAll,
	modal,
	setCity,
	deleteCity,
}: {
	showAll: boolean;
	modal: "add" | "update";
	setCity: (city: GetCityQuery["getCity"]) => void;
	deleteCity: (city: GetCityQuery["getCity"]) => void;
}) {
	const { loading, data: cities, error } = useGetCitiesQuery();

	const handleUpdateCity = (city: GetCityQuery["getCity"]) => {
		if (showAll || modal === "update") {
			setCity(city);
		}
	};

	const handleDeleteCity = async (city: GetCityQuery["getCity"]) => {
		deleteCity(city);
	};

	if (loading) return <LoadingBox />;
	if (error) return <ErrorBox />;
	return (
		<div className="h-full grid grid-rows-[auto_1fr_auto] bg-gray-200/50 rounded-2xl text-gray-500 shadow-md">
			<div
				className={`${
					showAll
						? "grid grid-cols-[1fr_1fr_1fr_1fr_0.2fr]"
						: "grid grid-cols-[1fr_1fr] w-[500px] max-w-[500px]"
				} text-xs rounded-t-2xl font-semibold text-gray-700 uppercase bg-gray-200 py-3 px-5 whitespace-nowrap`}
			>
				<p>Nom</p>
				<p className={`${showAll ? "" : "hidden"}`}>Slug</p>
				<p className={`${showAll ? "" : "hidden"}`}>Zip code</p>
				<p>Coordonnées</p>
				<p className={`${showAll ? "" : "hidden"}`}>Action</p>
			</div>
			<div className="overflow-y-auto max-h-full">
				{cities?.getCities.map((c) => (
					<div
						key={c.id}
						className={`${
							showAll
								? "grid grid-cols-[1fr_1fr_1fr_1fr_0.2fr]"
								: "grid grid-cols-[1fr_1fr]"
						} items-center py-[11px] px-5 overflow-hidden odd:bg-white even:bg-gray-50
             ${
								showAll || modal === "update"
									? "cursor-pointer hover:odd:bg-blue-50/80 hover:even:bg-blue-50/80"
									: ""
							}`}
						onClick={() => handleUpdateCity(c)}
					>
						<p className="text-gray-700 font-medium">{c.name}</p>
						<p className={`${showAll ? "" : "hidden"}`}>{c.slug}</p>
						<p className={`${showAll ? "" : "hidden"}`}>{c.zip_code}</p>
						<p>{c.coordinates.y + ", " + c.coordinates.x}</p>
						<Trash2
							className={`cursor-pointer hover:text-red-600 justify-self-center ${
								showAll ? "" : "hidden"
							}`}
							onClick={(e) => {
								e.stopPropagation();
								handleDeleteCity(c);
							}}
						/>
					</div>
				))}
			</div>
			<p className="text-right py-2 px-5 bg-gray-200 rounded-b-2xl shadow-top">
				1 - {cities?.getCities.length} sur {cities?.getCities.length}
			</p>
		</div>
	);
}

export default ListCities;
