import {
	FindModeratorByCityIdQuery,
	useFindModeratorByCityIdQuery,
} from "@/graphql/schema";
import { PlusCircle, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import ModerationUsersList from "./ModerationUsersList";
import ModerationAddRole from "./ModerationAddRole";

function ModerationUsers({
	closeModal,
	city,
}: {
	closeModal: Dispatch<SetStateAction<boolean>>;
	city: { slug: string; name: string; id: string };
}) {
	const [currShow, setCurrShow] = useState<"list" | "search">("list");
	const [openAddRole, setOpenRole] = useState<boolean>(false);

	const { data } = useFindModeratorByCityIdQuery({
		variables: {
			cityId: city.id,
		},
		skip: !city.id,
	});

	const handleCloseAddRole = () => {
		setOpenRole(false);
	};

	const handleManageUpdateUser = (
		user: FindModeratorByCityIdQuery["findModeratorByCityId"][number]
	) => {};

	return (
		<div className="bg-modal">
			<div className="modal flex flex-col bg-white w-[800px!important] h-[600px!important] overflow-y-auto">
				<div className="flex items-center justify-between">
					<p className="text-2xl font-light">
						Gérer les modérateurs de <b>{city.name}</b>
					</p>
					<p
						onClick={() => closeModal(false)}
						className="text-gray-600 cursor-pointer hover:text-black"
					>
						<X size={24} />
					</p>
				</div>
				<div className="flex items-center justify-end">
					{/* <input
						className="w-full max-w-52 rounded-md border-0 py-1.5 px-1.5 bg-gray-100 text-gray-900 z-10 placeholder:text-gray-400 sm:text-sm sm:leading-6"
						placeholder="Recherche un modérateur"
					/> */}
					<button
						className="cursor-pointer rounded-md bg-white px-4 py-1 text-sm font-semibold self-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						onClick={() => setOpenRole(!openAddRole)}
					>
						{openAddRole ? (
							<span className="flex items-center gap-1">
								<X size={14} /> Fermer
							</span>
						) : (
							<span className="flex items-center gap-1">
								<PlusCircle size={14} /> Ajouter un modérateur
							</span>
						)}
					</button>
				</div>

				{openAddRole && (
					<ModerationAddRole
						cityId={city.id}
						closeAddRole={handleCloseAddRole}
					/>
				)}

				{currShow === "list" && (
					<div className="mt-3 flex flex-col w-full h-full overflow-y-auto">
						{data && data.findModeratorByCityId.length > 0 ? (
							data?.findModeratorByCityId.map((u) => (
								<ModerationUsersList
									key={u.id}
									cityId={city.id}
									user={u}
									updateUser={handleManageUpdateUser}
								/>
							))
						) : (
							<p>Pas de modérateur pour cette ville.</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default ModerationUsers;
