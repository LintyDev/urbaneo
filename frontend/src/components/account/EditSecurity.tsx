import { Pencil } from "lucide-react";
import React from "react";
import { useState } from "react";
import ModalEditPassword from "./ModalEditPassword";
import { MyAccountQuery } from "@/graphql/schema";
import ModalDeleteAccount from "./ModalDeleteAccount";

function EditSecurity({ user }: { user: MyAccountQuery["me"] }) {
	const [openModalPass, setOpenModalPass] = useState(false);
	const [openModalAccount, setOpenModalAccount] = useState(false);
	return (
		<>
			<div className="border border-gray-200 rounded-xl p-4 mb-6">
				<div className="flex justify-between items-center">
					<p className="font-light">Sécurité</p>
				</div>
				<div>
					<div className="flex flex-col">
						<p className="font-thin">Mot de passe</p>
						<button
							className="w-fit items-center gap-2 rounded-md bg-black px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-900 hover:bg-gray-900 hover:text-gray-400"
							onClick={() => setOpenModalPass(true)}
						>
							Modifier mon mot de passe
						</button>
					</div>
					<div className="flex flex-col mt-2">
						<p className="font-thin">Mon compte</p>
						<button
							className="w-fit items-center gap-2 rounded-md bg-red-700 px-2.5 py-1.5 text-sm font-semibold text-red-100 shadow-sm ring-1 ring-inset ring-red-900 hover:bg-red-900 hover:text-red-400"
							onClick={() => setOpenModalAccount(true)}
						>
							Supprimer mon compte
						</button>
					</div>
				</div>
			</div>
			<ModalEditPassword
				openModal={openModalPass}
				closeModal={setOpenModalPass}
				emailUser={user?.email ?? ""}
			/>
			<ModalDeleteAccount
				openModal={openModalAccount}
				closeModal={setOpenModalAccount}
				user={{ id: user?.id ?? "", name: user?.email ?? "" }}
			/>
		</>
	);
}

export default EditSecurity;
