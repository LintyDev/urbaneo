import DynamicIcon, { IconProps } from "@/components/common/DynamicIcon";
import ErrorBox from "@/components/common/ErrorBox";
import LoadingBox from "@/components/common/LoadingBox";
import { Category, useGetCategoriesQuery } from "@/graphql/schema";
import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

function ListCategories({
	showAll,
	showUpdateCat,
	clickItem,
	setCategory,
	openDeleteModal,
}: {
	showAll: boolean;
	showUpdateCat: () => void;
	clickItem: boolean;
	setCategory: Dispatch<SetStateAction<Category | undefined>>;
	openDeleteModal: () => void;
}) {
	const { loading, data: categories, error } = useGetCategoriesQuery();

	const handleShowUpdateCat = (category: Category) => {
		if (showAll || clickItem) {
			setCategory(category);
			showUpdateCat();
		}
	};

	const handleDeleteCat = (category: Category) => {
		setCategory(category);
		openDeleteModal();
	};

	if (loading) return <LoadingBox />;
	if (error) return <ErrorBox />;
	return (
		<div className="h-full grid grid-rows-[auto_1fr_auto] bg-gray-200/50 rounded-2xl text-gray-500 shadow-md">
			<div
				className={`${
					showAll
						? "grid grid-cols-[1fr_1fr_1fr]"
						: "grid grid-cols-[1fr_1fr] w-[500px] max-w-[500px]"
				} text-xs rounded-t-2xl font-semibold text-gray-700 uppercase bg-gray-200 py-3 px-5 whitespace-nowrap`}
			>
				<p>Nom</p>
				<p>Icon</p>
				<p className={showAll ? "text-center" : "hidden"}>Action</p>
			</div>
			<div className="overflow-y-auto max-h-full">
				{categories?.getCategories.map((c) => (
					<div
						key={c.id}
						className={`${
							showAll
								? "grid grid-cols-[1fr_1fr_1fr]"
								: "grid grid-cols-[1fr_1fr]"
						} items-center py-[11px] px-5 overflow-hidden odd:bg-white even:bg-gray-50
             ${
								showAll || clickItem
									? "cursor-pointer hover:odd:bg-blue-50/80 hover:even:bg-blue-50/80"
									: ""
							}`}
						onClick={() => handleShowUpdateCat(c)}
					>
						<p className="text-gray-700 font-medium">{c.name}</p>
						<p className="flex items-center gap-2">
							<DynamicIcon name={c.icon as IconProps["name"]} /> {c.icon}
						</p>
						<Trash2
							className={`cursor-pointer hover:text-red-600 justify-self-center ${
								showAll ? "" : "hidden"
							}`}
							onClick={(e) => {
								e.stopPropagation();
								handleDeleteCat(c);
							}}
						/>
					</div>
				))}
			</div>
			<p className="text-right py-2 px-5 bg-gray-200 rounded-b-2xl shadow-top">
				1 - {categories?.getCategories.length} sur{" "}
				{categories?.getCategories.length}
			</p>
		</div>
	);
}

export default ListCategories;
