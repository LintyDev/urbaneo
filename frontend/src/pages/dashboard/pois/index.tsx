import CreatePOI from "@/components/dashboard/pois/CreatePOI";
import ListPOIs from "@/components/dashboard/pois/ListPOIs";
import { Plus, Search } from "lucide-react";
import React from "react";
import { useState } from "react";

function POIs() {
	const [showAllPOIs, setShowAllPOIs] = useState<boolean>(true);
	const [modal, setModal] = useState<"add" | "update">("add");

	const handleCreatePOI = () => {
		setShowAllPOIs(false);
		setModal("add");
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
					<ListPOIs showAll={showAllPOIs} />
					{!showAllPOIs && modal === "add" ? (
						<CreatePOI closeCreatePOI={setShowAllPOIs} />
					) : (
						!showAllPOIs && modal === "update" && <p>je suis le update</p>
					)}
				</div>
			</section>
		</>
	);
}

export default POIs;