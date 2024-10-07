import {
	FindModeratorByCityIdDocument,
	FindModeratorByCityIdQuery,
	Label,
	useDeleteRolesMutation,
} from "@/graphql/schema";
import { getImageUrl } from "@/lib/getImagesUrl";
import { Edit, Trash2, TriangleAlert } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function ModerationUsersList({
	cityId,
	user,
	updateUser,
}: {
	cityId: string;
	user: FindModeratorByCityIdQuery["findModeratorByCityId"][number];
	updateUser: (
		user: FindModeratorByCityIdQuery["findModeratorByCityId"][number]
	) => void;
}) {
	const [showDelete, setShowDelete] = useState(false);

	const [deleteRole] = useDeleteRolesMutation({
		refetchQueries: [
			{ query: FindModeratorByCityIdDocument, variables: { cityId } },
		],
	});

	const handleDeleteUserRole = () => {
		deleteRole({
			variables: {
				data: {
					cityId: cityId,
					label: Label.CityModerator,
					userId: user.id,
				},
			},
		});
	};

	return (
		<div>
			<div
				className={`${
					showDelete ? "hidden" : ""
				} flex gap-2 justify-between rounded-lg p-3 hover:bg-gray-100 w-full`}
			>
				<div className="flex gap-2">
					<Image
						src={getImageUrl(user.avatar)}
						alt="photo point d'intérêt"
						width={100}
						height={100}
						unoptimized={true}
						className="w-[100px] h-[100px] rounded-full object-cover object-center"
					/>
					<div className="flex flex-col">
						<p className="text-lg font-light">{user.email}</p>

						<p>{user.firstName}</p>
						<p>{user.location}</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<p
						className="cursor-pointer text-gray-400 hover:text-red-600"
						onClick={() => setShowDelete(true)}
					>
						<Trash2 size={20} />
					</p>
				</div>
			</div>
			<div
				className={`${
					showDelete ? "flex gap-2 rounded-lg p-3 hover:bg-gray-100" : "hidden"
				}`}
			>
				<div className="flex gap-10 justify-center w-full">
					<TriangleAlert
						size={35}
						className="animate-ping self-center text-red-600 mb-2"
					/>
					<div className="flex flex-col gap-3">
						<p>
							Voulez-vous vraiment supprimer le rôle modérateur pour :
							<b>{user.email}</b> ?
						</p>
						<div className="flex items-center justify-between">
							<button
								type="button"
								className="flex items-center gap-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
								onClick={() => setShowDelete(false)}
							>
								Annuler
							</button>
							<button
								type="button"
								className="flex items-center gap-2 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ring-red-300 hover:bg-red-900 hover:text-red-400"
								onClick={handleDeleteUserRole}
							>
								Supprimer le role
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ModerationUsersList;
