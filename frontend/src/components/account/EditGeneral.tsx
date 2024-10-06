import { useAuth } from "@/contexts/AuthContext";
import {
	MeDocument,
	MyAccountDocument,
	MyAccountQuery,
	useEditUserMutation,
} from "@/graphql/schema";
import { formats } from "@/lib/acceptedFormats";
import axiosImg from "@/lib/axiosImg";
import { getImageUrl } from "@/lib/getImagesUrl";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Pencil, Save, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { mixed, object, string } from "yup";

function EditGeneral({ user }: { user: MyAccountQuery["mePlus"] }) {
	const [editMode, setEditMode] = useState(false);
	const [editUser] = useEditUserMutation({
		refetchQueries: [{ query: MyAccountDocument }, { query: MeDocument }],
	});
	const [errorEdit, setErrorEdit] = useState("");
	const [tempUser, setTempUser] = useState<Partial<MyAccountQuery["mePlus"]>>();
	const { setUser } = useAuth();

	const schema = object({
		firstname: string().required(),
		lastname: string().required(),
		email: string().email().required(),
		location: string().required(),
		avatar: mixed<File>()
			.test(
				"fileFormat",
				"Format pris en charge: jpg, jpeg, webp et png",
				(value) => {
					if (!value) return true;
					return formats.includes(value.type);
				}
			)
			.test("fileSize", "Taille maximum : 5mb", (value) => {
				if (!value) return true;
				return value.size < 5 * 1024 * 1024;
			}),
	});

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = handleSubmit(async (data) => {
		let filename = user?.avatar ?? "";
		if (data.avatar) {
			try {
				const deleteProfilImg = await axios.post(
					"/deleteImg",
					{ pictureName: user?.avatar },
					{
						baseURL: process.env.NEXT_PUBLIC_IMAGES_URL,
						withCredentials: true,
					}
				);
				if (
					deleteProfilImg.data.success &&
					deleteProfilImg.data.success === true
				) {
					try {
						const formImg = new FormData();
						formImg.append("picture", data.avatar);
						const res = await axiosImg.post("/img", formImg);
						if (res.data.success) {
							filename = res.data.filename;
						}
					} catch (error) {
						console.log("Unable to add picture");
					}
				}
			} catch (error) {
				console.log("Unable to delete Profile picture");
			}
		}

		editUser({
			variables: {
				data: {
					id: user?.id,
					email: data.email,
					firstName: data.firstname,
					lastName: data.lastname,
					location: data.location,
					avatar: filename,
				},
			},
			onCompleted: async (data, clientOptions) => {
				setTempUser(data.editUser);
				setEditMode(false);
				setUser((prev) => {
					if (prev) {
						return {
							...prev,
							email: data.editUser.email,
							firstName: data.editUser.firstName,
							lastName: data.editUser.lastName,
							location: data.editUser.location,
							avatar: data.editUser.avatar,
						};
					}
				});
			},
			onError(error, clientOptions) {
				setErrorEdit(error.message);
			},
		});
	});

	const changeProfil = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0];
			const imgUrl = URL.createObjectURL(file);
			setTempUser((prev) => {
				if (prev) {
					return {
						...prev,
						avatar: imgUrl,
					};
				}
			});
			if (file) {
				setValue("avatar", file, { shouldValidate: true });
			}
		}
	};

	useEffect(() => {
		if (user) {
			reset({
				lastname: user.lastName,
				firstname: user.firstName,
				email: user.email,
				location: user.location,
			});
			setTempUser(user);
		}
	}, [reset, user]);

	return (
		<div className="border border-gray-200 rounded-xl p-4 mb-6">
			<form className="w-full h-full" onSubmit={onSubmit}>
				<div className={`flex justify-between ${editMode ? "mb-1" : ""}`}>
					<p className="font-light">Informations générales</p>
					{errorEdit !== "" && <p className="text-red-600">{errorEdit}</p>}
					<p
						className={`flex gap-1  items-center cursor-pointer border  ${
							editMode
								? "text-red-400 border-red-300 rounded-full p-1 hover:text-red-600 hover:border-red-600"
								: "text-gray-400 border-gray-300 rounded-2xl px-2 py-1 hover:text-black hover:border-black"
						}`}
						onClick={() => setEditMode(!editMode)}
					>
						<span className={editMode ? "hidden" : "text-sm"}>Editer</span>
						{editMode ? <X size={14} /> : <Pencil size={14} />}
					</p>
				</div>
				<div>
					<div className="flex flex-col items-center">
						<p className="font-thin">Photo de profil</p>
						<div className="flex flex-col gap-2 items-center">
							<Image
								src={
									tempUser?.avatar?.startsWith("blob")
										? tempUser?.avatar
										: getImageUrl(tempUser?.avatar)
								}
								alt="Avatar user"
								width={100}
								height={100}
								className="object-cover object-center border rounded-full w-[100px] h-[100px]"
								unoptimized={true}
							/>
							<label htmlFor="avatar" className={editMode ? "my-2" : "hidden"}>
								<p className="flex cursor-pointer items-center gap-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
									Choisir une photo
								</p>
							</label>
							<input
								id="avatar"
								type="file"
								multiple={false}
								className="hidden"
								accept="image/*"
								onChange={changeProfil}
							/>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-x-2 mt-2">
						<p className="font-thin">Nom</p>
						<p className="font-thin">Prénom</p>
						<input
							id="lastname"
							type="text"
							className={`w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm z-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6`}
							{...register("lastname")}
							disabled={!editMode}
						/>
						<input
							id="firstname"
							type="text"
							className={`w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm z-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6`}
							{...register("firstname")}
							disabled={!editMode}
						/>
					</div>
					<div className="grid grid-cols-2 gap-x-2 mt-2">
						<p className="font-thin">Email</p>
						<p className="font-thin">Location</p>
						<input
							id="email"
							type="email"
							className={`w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm z-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6`}
							{...register("email")}
							disabled={!editMode}
						/>
						<input
							id="location"
							type="text"
							className={`w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm z-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6`}
							{...register("location")}
							disabled={!editMode}
						/>
					</div>
				</div>
				{editMode && (
					<div className="flex mt-4">
						<button
							type="submit"
							className="ml-auto flex items-center gap-2 rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-blue-900 hover:bg-blue-900 hover:text-blue-400"
						>
							<Save size={14} />
							Enregistrer les modifications
						</button>
					</div>
				)}
			</form>
		</div>
	);
}

export default EditGeneral;
