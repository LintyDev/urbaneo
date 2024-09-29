/* eslint-disable @next/next/no-img-element */
import DynamicIcon, { IconProps } from "@/components/common/DynamicIcon";
import {
	Query,
	useCreatePoiMutation,
	useSearchCategoriesLazyQuery,
	useSearchCitiesLazyQuery,
} from "@/graphql/schema";
import { formats } from "@/lib/acceptedFormats";
import axiosImg from "@/lib/axiosImg";
import { yupResolver } from "@hookform/resolvers/yup";
import { Save, ScanEye, X } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { array, mixed, number, object, string } from "yup";

function CreatePOI({
	closeCreatePOI,
}: {
	closeCreatePOI: Dispatch<SetStateAction<boolean>>;
}) {
	const [latLong, setLatLong] = useState({ y: 50.633333, x: 3.066667 });
	const [photos, setPhotos] = useState<{ url: string; file: File }[]>([]);
	const [slug, setSlug] = useState("");
	const [resultCities, setResultCities] = useState<Query["searchCities"]>([]);
	const [resultCats, setResultCats] = useState<Query["searchCategories"]>([]);
	const [selectedCats, setSelectedCats] = useState<Query["searchCategories"]>(
		[]
	);
	const inputCity = useRef<HTMLInputElement | null>(null);
	const inputCat = useRef<HTMLInputElement | null>(null);
	const inputFiles = useRef<HTMLInputElement | null>(null);
	const [searchCities, { data }] = useSearchCitiesLazyQuery({
		fetchPolicy: "no-cache",
		onCompleted(data) {
			setResultCities(data.searchCities);
		},
	});
	const [searchCategories] = useSearchCategoriesLazyQuery({
		fetchPolicy: "no-cache",
		onCompleted(data) {
			const r = data.searchCategories.filter((c) => {
				return !selectedCats.some((cat) => cat.id === c.id);
			});
			setResultCats(r);
		},
	});
	const [createPOI] = useCreatePoiMutation({
		onError(error, clientOptions) {
			console.log(error);
		},
		onCompleted(data, clientOptions) {
			closeCreatePOI(true);
			reset();
		},
	});

	const schema = object({
		name: string().required(),
		adress: string().required(),
		cityId: string().required(),
		categories: array().required(),
		description: string().required(),
		longitude: number().required(),
		latitude: number().required(),
		photos: mixed<FileList>()
			.test("missingPicture", "Au moins une photo est obligatoire", (value) => {
				if (!value || !value?.item(0)) {
					return false;
				}
				return true;
			})
			.test(
				"fileFormat",
				"Format pris en charge: jpg, jpeg, webp et png",
				(value) => {
					if (!value?.item(0)) return false;
					return Array.from(value).every((file) => formats.includes(file.type));
				}
			)
			.test("fileSize", "Taille maximum : 5mb", (value) => {
				if (!value) return false;
				return Array.from(value).every((file) => file.size < 5 * 1024 * 1024);
			}),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const changePhotos = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length) {
			const files = e.target.files;
			if (files) {
				const newPhotos = Array.from(files).map((file) => ({
					url: URL.createObjectURL(file),
					file,
				}));
				setPhotos((prev) => [...prev, ...newPhotos]);
				const newFileList = new DataTransfer();
				[...photos, ...newPhotos].forEach((p) => newFileList.items.add(p.file));
				setValue("photos", newFileList.files);
				inputFiles.current!.value = "";
			}
		}
	};

	const onSubmit = handleSubmit(async (data) => {
		console.log(data);
		let fileNames: string[] = [];

		if (data.photos?.length) {
			const formImgs = new FormData();
			Array.from(data.photos).forEach((f) => formImgs.append("picturePOI", f));
			formImgs.append("namePOI", slug);
			try {
				const res = await axiosImg.post("/imgPOI", formImgs);
				if (res.data.success && res.data.fileNames) {
					fileNames = res.data.fileNames;
					console.log("image saved");
				}
			} catch (error) {
				console.log("error when saving img");
				return;
			}
		}

		createPOI({
			variables: {
				data: {
					name: data.name,
					description: data.description,
					address: data.adress,
					gps_coordinates: {
						type: "Point",
						coordinates: [data.latitude, data.longitude],
					},
					cityId: data.cityId,
					categoryIds: data.categories.map((c) => c.id),
					photos: fileNames,
				},
			},
		});
	});

	return (
		<div className="flex flex-col w-full bg-white rounded-2xl shadow-md p-5 flex-grow overflow-visible">
			<div className="flex items-center justify-between">
				<p className="font-thin text-xs mb-0">
					Ajouter un point d&apos;interêt
				</p>
				<X
					className="cursor-pointer text-gray-500 hover:text-black"
					onClick={() => closeCreatePOI(true)}
				/>
			</div>
			<form
				className="h-full flex flex-col gap-3 overflow-scroll"
				onSubmit={onSubmit}
			>
				<div className="md:flex w-full gap-5">
					<div className="w-full">
						<label
							htmlFor="name"
							className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
						>
							<span>Nom du point d&apos;interêt</span>
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
								placeholder="La boite à Pizza"
								{...register("name")}
								onChange={(e) =>
									setSlug(
										e.target.value
											.toLowerCase()
											.normalize("NFD")
											.replace(/[\u0300-\u036f]/g, "")
											.replace(/ /g, "-")
									)
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
								placeholder={slug}
							/>
						</div>
					</div>
				</div>

				<div className="mt-2 relative">
					<label
						htmlFor="categories"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Catégories
					</label>
					{errors.categories && (
						<span className="text-sm text-red-600 italic">
							{errors.categories.message}
						</span>
					)}
					<div className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
						{selectedCats && selectedCats.length > 0 && (
							<div className="flex gap-1 mb-1">
								{selectedCats.map((c, i) => (
									<p
										key={i}
										className="flex items-center gap-1 bg-black text-white py-1 px-2 rounded-lg"
									>
										<DynamicIcon size={12} name={c.icon as IconProps["name"]} />
										<span className="text-xs">{c.name}</span>
										<X
											size={17}
											className="text-red-500 cursor-pointer hover:text-red-800"
											onClick={() => {
												setSelectedCats((prev) => [
													...prev.filter((cat) => cat.id !== c.id),
												]);
												setValue("categories", [
													...selectedCats.filter((cat) => cat.id !== c.id),
												]);
											}}
										/>
									</p>
								))}
							</div>
						)}

						<input
							ref={inputCat}
							id="categories"
							type="text"
							className="block w-full"
							placeholder="Restaurant"
							autoComplete="off"
							onChange={(e) => {
								if (e.target.value === "") {
									setResultCats([]);
									return;
								}
								searchCategories({
									variables: { text: e.target.value.toString() },
								});
							}}
						/>
					</div>
					{resultCats && resultCats.length > 0 && (
						<div className="absolute flex flex-col gap-3 w-full bg-white rounded-b-md shadow-sm max-h-40 py-2 overflow-y-auto border border-gray-50">
							{resultCats.map((c, i) => (
								<p
									key={i}
									className="text-xs p-2 cursor-pointer hover:bg-blue-50"
									onClick={() => {
										setSelectedCats((prev) => [...prev, c]);
										setValue("categories", [...selectedCats, c]);
										inputCat.current!.value = "";
										setResultCats([]);
									}}
								>
									{c.name}
								</p>
							))}
						</div>
					)}
				</div>

				<div className="py-5">
					<input
						ref={inputFiles}
						type="file"
						id="input-file-upload"
						className="hidden"
						accept="image/*"
						multiple={true}
						onChange={changePhotos}
					/>
					<div className="grid grid-cols-3 gap-3 justify-between h-40">
						{Array(3)
							.fill(null)
							.map((_, i) => (
								<label
									key={i}
									htmlFor={!photos[i] ? "input-file-upload" : ""}
									className="h-40 w-full overflow-hidden"
								>
									{photos[i] ? (
										<div className="h-full w-full relative">
											<img
												src={photos[i].url}
												alt="photo1"
												className="h-full w-full object-cover rounded-2xl"
											/>
											<div
												className="absolute top-1 right-1 bg-white/60 rounded-full p-1 cursor-pointer hover:text-red-600 hover:bg-white/80"
												onClick={(e) => {
													e.preventDefault();
													setPhotos((prev) => [
														...prev.filter((p) => p.url !== photos[i].url),
													]);
													const newFileList = new DataTransfer();
													[
														...photos.filter((p) => p.url !== photos[i].url),
													].forEach((p) => newFileList.items.add(p.file));
													setValue("photos", newFileList.files);
												}}
											>
												<X />
											</div>
										</div>
									) : (
										<div className="border-dashed border-2 border-gray-500 cursor-pointer flex h-40 rounded-2xl">
											<p className="content-center text-center">
												Glissez une image ou cliquez pour en choisir une
											</p>
										</div>
									)}
								</label>
							))}
					</div>

					{errors.photos && (
						<span className="text-sm text-red-600 italic">
							{errors.photos.message}
						</span>
					)}
				</div>

				<div className="md:flex w-full gap-5">
					<div className="w-full">
						<label
							htmlFor="adress"
							className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
						>
							<span>Adresse</span>
							{errors.adress && (
								<span className="text-sm text-red-600 italic">
									{errors.adress.message}
								</span>
							)}
						</label>
						<div className="mt-2">
							<input
								id="adress"
								type="text"
								className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="124 rue du Printemps"
								{...register("adress")}
							/>
						</div>
					</div>

					<div className="w-full">
						<label
							htmlFor="city"
							className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
						>
							<span>Ville</span>
							{errors.cityId && (
								<span className="text-sm text-red-600 italic">
									{errors.cityId.message}
								</span>
							)}
						</label>
						<div className="mt-2 relative">
							<input
								ref={inputCity}
								id="cityChoose"
								type="text"
								className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="Lille"
								onChange={(e) => {
									if (e.target.value === "") {
										setResultCities([]);
										return;
									}
									searchCities({
										variables: { text: e.target.value.charAt(0).toUpperCase() },
									});
								}}
							/>
							{resultCities && resultCities.length > 0 && (
								<div className="flex flex-col gap-3 absolute max-h-40 bg-white z-10 rounded-b-md w-full shadow-md py-2 overflow-y-auto border border-gray-50">
									{resultCities.map((c, i) => (
										<p
											key={i}
											className="p-3 hover:bg-blue-50 cursor-pointer"
											onClick={() => {
												setValue("cityId", c.id);
												inputCity.current!.value = c.name;
												setResultCities([]);
											}}
										>
											{c.name}
										</p>
									))}
								</div>
							)}
						</div>
					</div>
				</div>

				<div>
					<label
						htmlFor="description"
						className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
					>
						<span>Description</span>
						{errors.description && (
							<span className="text-sm text-red-600 italic">
								{errors.description.message}
							</span>
						)}
					</label>
					<div className="mt-2 relative">
						<textarea
							id="description"
							className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm z-10 ring-1 ring-inset ring-gray-300 resize-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							rows={5}
							{...register("description")}
						/>
					</div>
				</div>

				<div className="md:flex w-full gap-5">
					<div className="w-full">
						<label
							htmlFor="latitude"
							className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
						>
							<span>Latitude</span>
							{errors.latitude && (
								<span className="text-sm text-red-600 italic">
									{errors.latitude.message}
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
								// onChange={(e) =>
								// 	setLatLong((prev) => ({ ...prev, y: +e.target.value }))
								// }
							/>
						</div>
					</div>

					<div className="w-full">
						<label
							htmlFor="longitude"
							className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
						>
							<span>Longitude</span>
							{errors.longitude && (
								<span className="text-sm text-red-600 italic">
									{errors.longitude.message}
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
								// onChange={(e) =>
								// 	setLatLong((prev) => ({ ...prev, x: +e.target.value }))
								// }
							/>
						</div>
					</div>
				</div>

				<div className="flex justify-between">
					<button
						type="button"
						className="flex items-center gap-2 rounded-md bg-black px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-900 hover:bg-gray-900 hover:text-gray-400"
					>
						<ScanEye size={15} /> Prévisualisation
					</button>
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

export default CreatePOI;