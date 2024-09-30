import CreateUpdatePOI from "@/components/dashboard/pois/CreatePOI";
import ListPOIs from "@/components/dashboard/pois/ListPOIs";
import ModalDeletePOI from "@/components/dashboard/pois/ModalDeletePOI";
import { Query } from "@/graphql/schema";
import { Plus, Search } from "lucide-react";
import React from "react";
import { useState } from "react";

function POIs() {
	const [showAllPOIs, setShowAllPOIs] = useState<boolean>(true);
	const [modal, setModal] = useState<"add" | "update">("add");
	const [poi, setPoi] = useState<Query["getPOIs"][number]>();
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

	const handleCreatePOI = () => {
		setShowAllPOIs(true);
		setPoi(undefined);
		setModal("add");
		setShowAllPOIs(false);
	};

	const handleUpdatePOI = (poi: Query["getPOIs"][number]) => {
		setShowAllPOIs(true);
		setPoi(poi);
		setModal("update");
		setShowAllPOIs(false);
	};

	const handleDeletePOI = (poi: Query["getPOIs"][number]) => {
		setPoi(poi);
		setShowDeleteModal(true);
	};

	return (
		<>
			<section className="flex flex-col h-full overflow-hidden">
				<div className="flex justify-between items-center mt-3">
					<div className="flex items-center bg-gray-200 py-2 px-4 rounded-lg text-sm">
						<input
							type="text"
							placeholder="Rechercher un point d'intêret"
							className="bg-transparent w-60"
						/>
						<Search size={14} />
					</div>
					<button
						className="flex gap-2 items-center rounded-md bg-black px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-900 hover:bg-gray-950"
						onClick={handleCreatePOI}
					>
						<Plus size={14} /> Ajouter un point d&apos;interêt
					</button>
				</div>

				<div
					className={
						showAllPOIs
							? "pt-3 h-full overflow-auto pb-5"
							: "flex gap-3 pt-3 overflow-hidden pb-5"
					}
				>
					<ListPOIs
						showAll={showAllPOIs}
						modal={modal}
						setPoi={handleUpdatePOI}
						deletePoi={handleDeletePOI}
					/>
					{!showAllPOIs && (
						<CreateUpdatePOI
							closeCreatePOI={setShowAllPOIs}
							modal={modal}
							poiUpdate={poi}
							deletePoi={handleDeletePOI}
						/>
					)}
				</div>
			</section>
			<ModalDeletePOI
				poi={{ id: poi?.id ?? "", name: poi?.name ?? "" }}
				openModal={showDeleteModal}
				setOpenModal={setShowDeleteModal}
				setShowAll={setShowAllPOIs}
			/>
		</>
	);
}

export default POIs;
