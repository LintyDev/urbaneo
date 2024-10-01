import { TriangleAlert } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

function ModalDeleteAccount({
	openModal,
	closeModal,
	user,
}: {
	openModal: boolean;
	closeModal: Dispatch<SetStateAction<boolean>>;
	user: { id: string; name: string };
}) {
	const handleDeleteAccount = () => {};

	if (!openModal) return null;
	return (
		<div className="bg-modal">
			<div className="modal flex flex-col gap-3 justify-center">
				<TriangleAlert
					size={35}
					className="animate-ping self-center text-red-600 mb-2"
				/>
				<p>Voulez-vous vraiment supprimer votre compte ?</p>
				<span className="text-sm text-red-600 font-light text-center">
					Cette action est irréversible !
				</span>
				<div className="flex gap-3 items-center justify-between">
					<button
						type="button"
						className="flex items-center gap-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						onClick={() => closeModal(false)}
					>
						Annuler
					</button>
					<button
						type="button"
						className="flex items-center gap-2 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ring-red-300 hover:bg-red-900 hover:text-red-400"
						onClick={handleDeleteAccount}
					>
						Supprimer définitivement mon compte
					</button>
				</div>
			</div>
		</div>
	);
}

export default ModalDeleteAccount;
