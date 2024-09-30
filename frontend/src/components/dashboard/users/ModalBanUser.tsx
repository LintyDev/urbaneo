import { GetUsersDocument, useUpdateUserMutation } from "@/graphql/schema";
import { TriangleAlert } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

function ModalBanUser({
	user,
	openModal,
	setOpenModal,
	changeUserIsValid,
}: {
	user: { id: string; email: string; isValid: boolean };
	openModal: boolean;
	setOpenModal: Dispatch<SetStateAction<boolean>>;
	changeUserIsValid: () => void;
}) {
	const [updateUser] = useUpdateUserMutation({
		refetchQueries: [{ query: GetUsersDocument }],
	});
	const handleBanUser = () => {
		updateUser({
			variables: {
				data: {
					id: user.id,
					email: user.email,
					isValid: !user.isValid,
				},
			},
			onCompleted(data, clientOptions) {
				changeUserIsValid();
				setOpenModal(false);
			},
		});
	};

	if (!openModal) return null;
	return (
		<div className="bg-modal">
			<div className="modal flex flex-col gap-3 justify-center">
				<TriangleAlert
					size={35}
					className={`animate-ping self-center ${
						user.isValid ? "text-orange-600" : "text-green-600"
					} mb-2`}
				/>
				<p>
					Voulez-vous vraiment bannir l&apos;utilisateur : <b>{user.email}</b> ?
				</p>
				<div className="flex items-center justify-between">
					<button
						type="button"
						className="flex items-center gap-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						onClick={() => setOpenModal(false)}
					>
						Annuler
					</button>
					<button
						type="button"
						className={`flex items-center gap-2 rounded-md ${
							user.isValid ? "bg-orange-600 " : "bg-green-600 "
						} px-2.5 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ${
							user.isValid
								? "ring-orange-300 hover:bg-orange-900 hover:text-orange-400"
								: "ring-green-300 hover:bg-green-900 hover:text-green-400"
						}`}
						onClick={handleBanUser}
					>
						{user.isValid ? "Bannir" : "Débannir"} : {user.email}
					</button>
				</div>
			</div>
		</div>
	);
}

export default ModalBanUser;
