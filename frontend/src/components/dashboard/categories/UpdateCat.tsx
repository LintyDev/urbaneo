import DynamicIcon, { IconProps } from "@/components/common/DynamicIcon";
import {
	Category,
	GetCategoriesDocument,
	useUpdateCategoryMutation,
} from "@/graphql/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Save, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

function UpdateCat({
	closeUpdateCat,
	category,
	openDeleteModal,
}: {
	closeUpdateCat: () => void;
	category: Category | undefined;
	openDeleteModal: () => void;
}) {
	const [EditCategory] = useUpdateCategoryMutation({
		refetchQueries: [{ query: GetCategoriesDocument }],
	});
	const [currIcon, setCurrIcon] = useState<IconProps["name"]>("castle");

	const schema = object({
		name: string().required(),
		icon: string().required(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = handleSubmit(async (data) => {
		if (!category) {
			return;
		}
		try {
			await EditCategory({
				fetchPolicy: "no-cache",
				variables: {
					data: {
						id: category.id,
						name: data.name,
						icon: data.icon,
					},
				},
				onError(error, clientOptions) {
					console.log(error);
				},
			});
		} catch (error) {
			console.log("error from catch", error);
		}
	});

	useEffect(() => {
		reset({
			name: category?.name,
			icon: category?.icon,
		});
		setCurrIcon(category?.icon as IconProps["name"]);
	}, [category, reset]);

	return (
		<div className="w-full">
			<div className="bg-white rounded-2xl shadow-md p-5">
				<div className="flex items-center justify-between">
					<p className="font-thin text-xs mb-0">Editer une catégories</p>
					<X
						className="cursor-pointer text-gray-500 hover:text-black"
						onClick={closeUpdateCat}
					/>
				</div>
				<form className="flex flex-col gap-3" onSubmit={onSubmit}>
					<div>
						<label
							htmlFor="name"
							className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
						>
							<span>Nom de la catégorie</span>
							{errors.name && (
								<span className="text-sm text-red-600 italic">
									{errors.name.message}
								</span>
							)}
						</label>
						<div className="mt-2">
							<input
								id="name"
								type="text"
								className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="Monuments"
								{...register("name")}
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="icon"
							className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
						>
							<span className="flex items-center gap-2">
								Icon{" "}
								<DynamicIcon size={20} name={currIcon as IconProps["name"]} />
							</span>
							{errors.icon && (
								<span className="text-sm text-red-600 italic">
									{errors.icon.message}
								</span>
							)}
						</label>
						<div className="mt-2">
							<input
								id="icon"
								type="text"
								className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="Castle"
								{...register("icon")}
								onChange={(e) => {
									setCurrIcon(e.target.value as IconProps["name"]);
								}}
							/>
						</div>
					</div>
					<div className="flex items-center justify-between">
						<button
							type="button"
							className="flex items-center gap-2 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ring-red-300 hover:bg-red-900 hover:text-red-400"
							onClick={openDeleteModal}
						>
							<Trash2 size={15} /> Supprimer : {category?.name}
						</button>
						<button
							type="submit"
							className="flex items-center gap-2 rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-900 hover:text-blue-400"
						>
							<Save size={15} /> Enregistrer la modification
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default UpdateCat;
