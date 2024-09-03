import CreateCat from "@/components/dashboard/categories/CreateCat";
import ListCategories from "@/components/dashboard/categories/ListCategories";
import ModalDeleteCat from "@/components/dashboard/categories/ModalDeleteCat";
import UpdateCat from "@/components/dashboard/categories/UpdateCat";
import { Category } from "@/graphql/schema";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

function Categories() {
	const [showAllCat, setShowAllCat] = useState<boolean>(true);
	const [showAllCatUpdate, setShowAllCatUpdate] = useState<boolean>(false);
	const [showAllCatCreate, setShowAllCatCreate] = useState<boolean>(false);
	const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
	const [category, setCategory] = useState<Category>();

	const handleShowCreateCat = () => {
		setShowAllCatUpdate(false);
		setShowAllCatCreate(true);
		setShowAllCat(false);
	};

	const handleHideCreateCat = () => {
		setShowAllCatCreate(false);
		setShowAllCat(true);
	};

	const handleShowUpdateCat = () => {
		setShowAllCatCreate(false);
		setShowAllCatUpdate(true);
		setShowAllCat(false);
	};

	const handleHideUpdateCat = () => {
		setShowAllCatUpdate(false);
		setShowAllCat(true);
	};

	const handleOpenDeleteModal = () => {
		setShowModalDelete(true);
	};

	const handleCloseDeleteModal = (closeAll: boolean) => {
		if (closeAll) {
			setShowAllCat(true);
		}
		setShowModalDelete(false);
	};

	return (
		<>
			<section className="flex flex-col h-full overflow-hidden">
				<div className="flex justify-between items-center mt-3 overflow-hidden">
					<div className="flex items-center bg-gray-200 py-2 px-4 rounded-lg text-sm">
						<input
							type="text"
							placeholder="Rechercher une catégorie"
							className="bg-transparent w-60"
						/>
						<Search size={14} />
					</div>
					<button
						className="flex gap-2 items-center rounded-md bg-black px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-900 hover:bg-gray-950"
						onClick={handleShowCreateCat}
					>
						<Plus size={14} /> Ajouter une catégorie
					</button>
				</div>

				<div
					className={
						showAllCat
							? "pt-3 h-full overflow-auto pb-5"
							: "flex h-full gap-3 pt-3 overflow-hidden pb-5"
					}
				>
					<ListCategories
						showAll={showAllCat}
						showUpdateCat={handleShowUpdateCat}
						clickItem={showAllCatUpdate}
						setCategory={setCategory}
						openDeleteModal={handleOpenDeleteModal}
					/>
					{showAllCatCreate && !showAllCat && (
						<CreateCat closeCreateCat={handleHideCreateCat} />
					)}
					{showAllCatUpdate && !showAllCat && (
						<UpdateCat
							closeUpdateCat={handleHideUpdateCat}
							category={category}
							openDeleteModal={handleOpenDeleteModal}
						/>
					)}
				</div>
			</section>
			<ModalDeleteCat
				category={{ id: category?.id, name: category?.name ?? "" }}
				openModal={showModalDelete}
				closeModal={handleCloseDeleteModal}
			/>
		</>
	);
}

export default Categories;
