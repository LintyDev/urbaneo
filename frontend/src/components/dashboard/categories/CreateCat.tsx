import DynamicIcon, { IconProps } from "@/components/common/DynamicIcon";
import {
	GetCategoriesDocument,
	useCreateCategoryMutation,
} from "@/graphql/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Save, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

function CreateCat({ closeCreateCat }: { closeCreateCat: () => void }) {
	const [currIcon, setCurrIcon] = useState<IconProps["name"]>("castle");

	const [CreateCategory] = useCreateCategoryMutation({
		refetchQueries: [{ query: GetCategoriesDocument }],
	});

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
		console.log(data);
		try {
			const cat = await CreateCategory({
				fetchPolicy: "no-cache",
				variables: {
					data: {
						name: data.name,
						icon: data.icon,
					},
				},
				onError(error, clientOptions) {
					console.log(error);
				},
				onCompleted(data, clientOptions) {
					closeCreateCat;
					reset();
				},
			});
		} catch (error) {
			console.log("error from catch", error);
		}
	});

	return (
		<div className="w-full">
			<div className="bg-white rounded-2xl shadow-md p-5">
				<div className="flex items-center justify-between">
					<p className="font-thin text-xs mb-0">Ajouter une catégories</p>
					<X
						className="cursor-pointer text-gray-500 hover:text-black"
						onClick={closeCreateCat}
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
							className="text-sm font-medium leading-6 text-gray-900"
						>
							<div className="flex items-center gap-2 ">
								<span className="flex items-center gap-2">
									Icon{" "}
									<DynamicIcon size={20} name={currIcon as IconProps["name"]} />
								</span>
								{errors.icon && (
									<span className="text-sm text-red-600 italic">
										{errors.icon.message}
									</span>
								)}
							</div>
							<p className="text-xs italic font-thin">
								Voir la liste des icons disponible:{" "}
								<Link
									target="_blank"
									href={"https://lucide.dev/icons/"}
									className="underline"
								>
									https://lucide.dev/icons/
								</Link>
							</p>
						</label>
						<div className="mt-2">
							<input
								id="icon"
								type="text"
								className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="castle"
								{...register("icon")}
								onChange={(e) => {
									setCurrIcon(e.target.value as IconProps["name"]);
								}}
							/>
						</div>
					</div>
					<div className="flex self-end">
						<button
							type="submit"
							className="flex items-center gap-2 rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-900 hover:text-blue-400"
						>
							<Save size={15} /> Enregistrer
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default CreateCat;
