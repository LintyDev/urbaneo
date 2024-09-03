import CreateCity from "@/components/dashboard/cities/CreateCity";
import ListCities from "@/components/dashboard/cities/ListCities";
import ModalDeleteCity from "@/components/dashboard/cities/ModalDeleteCity";
import UpdateCity from "@/components/dashboard/cities/UpdateCity";
import { GetCityQuery } from "@/graphql/schema";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

function Cities() {
	const [showAllCities, setShowAllCities] = useState<boolean>(true);
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [modal, setModal] = useState<"add" | "update">("add");
	const [city, setCity] = useState<GetCityQuery["getCity"]>({
		__typename: "City",
		name: "",
		id: "",
		slug: "",
		zip_code: 0,
		coordinates: {
			x: 0,
			y: 0,
		},
	});

	const handleCreateCity = () => {
		setModal("add");
		setShowAllCities(false);
	};

	const handleUpdateCity = (city: GetCityQuery["getCity"]) => {
		setCity(city);
		setModal("update");
		setShowAllCities(false);
	};

	const handleDeleteCity = (city: GetCityQuery["getCity"]) => {
		setCity(city);
		setShowDeleteModal(true);
	};

	return (
		<>
			<section className="flex flex-col h-full overflow-hidden">
				<div className="flex justify-between items-center mt-3">
					<div className="flex items-center bg-gray-200 py-2 px-4 rounded-lg text-sm">
						<input
							type="text"
							placeholder="Rechercher une ville"
							className="bg-transparent w-60"
						/>
						<Search size={14} />
					</div>
					<button
						className="flex gap-2 items-center rounded-md bg-black px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-900 hover:bg-gray-950"
						onClick={handleCreateCity}
					>
						<Plus size={14} /> Ajouter une ville
					</button>
				</div>

				<div
					className={
						showAllCities
							? "pt-3 h-full overflow-auto pb-5"
							: "flex gap-3 pt-3 h-full overflow-hidden pb-5"
					}
				>
					<ListCities
						showAll={showAllCities}
						modal={modal}
						setCity={handleUpdateCity}
						deleteCity={handleDeleteCity}
					/>
					{!showAllCities && modal === "add" ? (
						<CreateCity closeCreateCity={setShowAllCities} />
					) : (
						!showAllCities &&
						modal === "update" && (
							<UpdateCity
								closeUpdateCity={setShowAllCities}
								city={city}
								deleteCity={handleDeleteCity}
							/>
						)
					)}
				</div>
			</section>
			<ModalDeleteCity
				city={{ name: city.name, id: city.id }}
				openModal={showDeleteModal}
				setOpenModal={setShowDeleteModal}
				setShowAll={setShowAllCities}
			/>
		</>
	);
}

export default Cities;
