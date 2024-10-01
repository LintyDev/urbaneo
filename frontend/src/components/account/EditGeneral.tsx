import { MyAccountQuery } from "@/graphql/schema";
import { getImageUrl } from "@/lib/getImagesUrl";
import { Pencil, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function EditGeneral({ user }: { user: MyAccountQuery["me"] }) {
	const [editMode, setEditMode] = useState(false);

	return (
		<div className="border border-gray-200 rounded-xl p-4 mb-6">
			<div className={`flex justify-between ${editMode ? "mb-1" : ""}`}>
				<p className="font-light">Informations générales</p>
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
				<div className="flex flex-col">
					<p className="font-thin">Photo de profil</p>
					<Image
						src={getImageUrl(user?.avatar)}
						alt="Avatar user"
						width={100}
						height={100}
						className="object-cover object-center border rounded-full"
						unoptimized={true}
					/>
				</div>
				<div className="grid grid-cols-2 gap-x-2 mt-2">
					<p className="font-thin">Nom</p>
					<p className="font-thin">Prénom</p>
					<p className={`${editMode ? "hidden" : ""}`}>{user?.lastName}</p>
					<input
						id="lastname"
						type="text"
						className={`${
							editMode ? "block" : "hidden"
						} w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm z-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6`}
						value={user?.lastName}
						// {...register("lastname")}
					/>
					<p className={`${editMode ? "hidden" : ""}`}>{user?.firstName}</p>
					<input
						id="firstname"
						type="text"
						className={`${
							editMode ? "block" : "hidden"
						} w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm z-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6`}
						value={user?.firstName}
						// {...register("firstname")}
					/>
				</div>
				<div className="grid grid-cols-2 gap-x-2 mt-2">
					<p className="font-thin">Email</p>
					<p className="font-thin">Location</p>
					<p className={`${editMode ? "hidden" : ""}`}>{user?.email}</p>
					<input
						id="email"
						type="email"
						className={`${
							editMode ? "block" : "hidden"
						} w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm z-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6`}
						value={user?.email}
						// {...register("email")}
					/>
					<p className={`${editMode ? "hidden" : ""}`}>{user?.location}</p>
					<input
						id="location"
						type="text"
						className={`${
							editMode ? "block" : "hidden"
						} w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm z-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6`}
						value={user?.location}
						// {...register("location")}
					/>
				</div>
			</div>
		</div>
	);
}

export default EditGeneral;
