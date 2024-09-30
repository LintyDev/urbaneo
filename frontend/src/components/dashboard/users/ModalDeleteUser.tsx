import { GetUsersDocument, useDeleteUserMutation } from "@/graphql/schema";
import { TriangleAlert } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

function ModalDeleteUser({
	user,
	openModal,
	setOpenModal,
}: {
	user: { id: string; email: string };
	openModal: boolean;
	setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
	const [deleteUser] = useDeleteUserMutation({
		refetchQueries: [{ query: GetUsersDocument }],
	});

	const handleDeleteUser = () => {
		deleteUser({
			variables: {
				deleteUserId: user.id,
			},
			onCompleted(data, clientOptions) {
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
					className="animate-ping self-center text-red-600 mb-2"
				/>
				<p>
					Voulez-vous vraiment supprimer l&apos;utilisateur :{" "}
					<b>{user.email}</b> ?
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
						className="flex items-center gap-2 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ring-red-300 hover:bg-red-900 hover:text-red-400"
						onClick={handleDeleteUser}
					>
						Supprimer : {user.email}
					</button>
				</div>
			</div>
		</div>
	);
}

export default ModalDeleteUser;
