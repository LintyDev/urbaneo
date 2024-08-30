import { GetCitiesDocument, useCreateCityMutation } from "@/graphql/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Save, X } from "lucide-react";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { number, object, string } from "yup";

const MapAdmin = dynamic(() => import("@/components/map/MapAdmin"), {
	ssr: false,
});

function CreateCityC({
	closeCreateCity,
}: {
	closeCreateCity: Dispatch<SetStateAction<boolean>>;
}) {
	const [CreateCity] = useCreateCityMutation({
		refetchQueries: [{ query: GetCitiesDocument }],
	});
	const [slug, setSlug] = useState<string[]>(["lille", "59000"]);
	const [latLong, setLatLong] = useState({ y: 50.633333, x: 3.066667 });

	const schema = object({
		name: string().required(),
		zipcode: number().required(),
		longitude: number().required(),
		latitude: number().required(),
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
		try {
			const city = await CreateCity({
				fetchPolicy: "no-cache",
				variables: {
					data: {
						name: data.name,
						zip_code: data.zipcode,
						gps_coordinates: {
							type: "Point",
							coordinates: [data.latitude, data.longitude],
						},
					},
				},
				onError(error, clientOptions) {
					console.log(error);
				},
				onCompleted(data, clientOptions) {
					closeCreateCity(true);
					reset();
				},
			});
		} catch (error) {
			console.log("error from catch", error);
		}
	});

	return (
		<div className="flex flex-col h-full w-full bg-white rounded-2xl shadow-md p-5">
			<div className="flex items-center justify-between">
				<p className="font-thin text-xs mb-0">Ajouter une ville</p>
				<X
					className="cursor-pointer text-gray-500 hover:text-black"
					onClick={() => closeCreateCity(true)}
				/>
			</div>
			<form className="h-full flex flex-col gap-3" onSubmit={onSubmit}>
				<div>
					<label
						htmlFor="name"
						className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
					>
						<span>Nom de la ville</span>
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
							placeholder="Lille"
							{...register("name")}
							onChange={(e) =>
								setSlug((prev) => {
									const newSlug = [...prev];
									newSlug[0] = e.target.value.toLowerCase() ?? "";
									return newSlug;
								})
							}
						/>
					</div>
				</div>

				<div className="md:flex w-full gap-5">
					<div className="w-full">
						<label
							htmlFor="zipcode"
							className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
						>
							<span>Zip code</span>
							{errors.name && (
								<span className="text-sm text-red-600 italic">
									{errors.name.message}
								</span>
							)}
						</label>
						<div className="mt-2">
							<input
								id="zipcode"
								type="text"
								className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="59000"
								{...register("zipcode")}
								onChange={(e) =>
									setSlug((prev) => {
										const newSlug = [...prev];
										newSlug[1] = e.target.value ?? "";
										return newSlug;
									})
								}
							/>
						</div>
					</div>

					<div className="w-full">
						<label
							htmlFor="slug"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Slug
						</label>
						<div className="mt-2">
							<input
								disabled
								id="slug"
								type="text"
								className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder={slug[0] + "-" + slug[1]}
							/>
						</div>
					</div>
				</div>

				<div className="md:flex w-full gap-5">
					<div className="w-full">
						<label
							htmlFor="latitude"
							className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
						>
							<span>Latitude</span>
							{errors.name && (
								<span className="text-sm text-red-600 italic">
									{errors.name.message}
								</span>
							)}
						</label>
						<div className="mt-2">
							<input
								id="latitude"
								type="text"
								className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder={"50.6365654"}
								{...register("latitude")}
								onChange={(e) =>
									setLatLong((prev) => ({ ...prev, y: +e.target.value }))
								}
							/>
						</div>
					</div>

					<div className="w-full">
						<label
							htmlFor="longitude"
							className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
						>
							<span>Longitude</span>
							{errors.name && (
								<span className="text-sm text-red-600 italic">
									{errors.name.message}
								</span>
							)}
						</label>
						<div className="mt-2">
							<input
								id="longitude"
								type="text"
								className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder={"3.0635282"}
								{...register("longitude")}
								onChange={(e) =>
									setLatLong((prev) => ({ ...prev, x: +e.target.value }))
								}
							/>
						</div>
					</div>
				</div>

				<label
					htmlFor="map_admin"
					className="block text-sm font-medium leading-6 text-gray-900"
				>
					Preview
				</label>
				<MapAdmin p={{ y: latLong.y, x: latLong.x }} />
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
	);
}

export default CreateCityC;
