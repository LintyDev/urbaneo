import { GetCitiesDocument, useDeleteCityMutation } from "@/graphql/schema";
import { TriangleAlert, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function ModalDeleteCity({
	city,
	openModal,
	setOpenModal,
	setShowAll,
}: {
	city: { name: string; id: string };
	openModal: boolean;
	setOpenModal: Dispatch<SetStateAction<boolean>>;
	setShowAll: Dispatch<SetStateAction<boolean>>;
}) {
	const [deleteCity] = useDeleteCityMutation({
		refetchQueries: [{ query: GetCitiesDocument }],
	});

	const handleDeleteCity = async () => {
		try {
			await deleteCity({
				fetchPolicy: "no-cache",
				variables: {
					deleteCityId: city.id,
				},
				onError(error, clientOptions) {
					console.log(error);
				},
				onCompleted() {
					setOpenModal(false);
					setShowAll(true);
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	if (!openModal) return null;

	return (
		<div className="bg-modal">
			<div className="modal flex flex-col gap-3 justify-center">
				<TriangleAlert
					size={35}
					className="animate-ping self-center text-red-600 mb-2"
				/>
				<p>
					Voulez-vous vraiment supprimer la ville : <b>{city.name}</b> ?
				</p>
				<div className="flex items-center justify-between">
					<button
						type="button"
						className="flex items-center gap-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						onClick={() => setOpenModal(false)}
					>
						Annuler
					</button>
					<button
						type="button"
						className="flex items-center gap-2 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ring-red-300 hover:bg-red-900 hover:text-red-400"
						onClick={handleDeleteCity}
					>
						Supprimer : {city.name}
					</button>
				</div>
			</div>
		</div>
	);
}

export default ModalDeleteCity;
