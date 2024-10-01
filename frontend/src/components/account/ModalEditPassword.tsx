import { RectangleEllipsis, TriangleAlert } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

function ModalEditPassword({
	openModal,
	closeModal,
}: {
	openModal: boolean;
	closeModal: Dispatch<SetStateAction<boolean>>;
}) {
	if (!openModal) return null;
	return (
		<div className="bg-modal">
			<div className="modal flex flex-col gap-3 justify-center">
				<RectangleEllipsis size={50} className="self-center" />
				<input
					id="password"
					type="password"
					className={` w-60 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm z-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6`}
					placeholder="Entrez votre mot de passe"
					// {...register("email")}
				/>
				<div className="flex items-center justify-between">
					<button
						type="button"
						className="flex items-center gap-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						onClick={() => closeModal(false)}
					>
						Annuler
					</button>
					<button
						type="button"
						className="flex items-center gap-2 rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ring-blue-300 hover:bg-blue-900 hover:text-blue-400"
						// onClick={handleDeleteCity}
					>
						Suivant
					</button>
				</div>
			</div>
		</div>
	);
}

export default ModalEditPassword;
