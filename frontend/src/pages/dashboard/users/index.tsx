import ListUsers from "@/components/dashboard/users/ListUsers";
import ModalBanUser from "@/components/dashboard/users/ModalBanUser";
import ModalDeleteUser from "@/components/dashboard/users/ModalDeleteUser";
import UpdateUser from "@/components/dashboard/users/UpdateUser";
import { GetUsersQuery } from "@/graphql/schema";
import { Search } from "lucide-react";
import React, { useState } from "react";

function Users() {
	const [showAllUsers, setShowAllUsers] = useState<boolean>(true);
	const [user, setUser] = useState<GetUsersQuery["getUsers"][number]>();
	const [showModalDelete, setShowModalDelete] = useState(false);
	const [showModalBan, setShowModalBan] = useState(false);

	const handleEditUser = (user: GetUsersQuery["getUsers"][number]) => {
		setUser(user);
		setShowAllUsers(false);
	};

	const handleModalDelete = (user: GetUsersQuery["getUsers"][number]) => {
		setUser(user);
		setShowModalDelete(true);
	};

	const handleModalBan = (user: GetUsersQuery["getUsers"][number]) => {
		setUser(user);
		setShowModalBan(true);
	};

	const changeUserIsValid = () => {
		setUser((prev) => {
			if (prev) {
				return {
					...prev,
					isValid: !prev.isValid,
				};
			}
		});
	};

	return (
		<>
			<section className="flex flex-col h-full overflow-hidden">
				<div className="flex justify-between items-center mt-3">
					<div className="flex items-center bg-gray-200 py-2 px-4 rounded-lg text-sm">
						<input
							type="text"
							placeholder="Rechercher un utilisateur"
							className="bg-transparent w-60"
						/>
						<Search size={14} />
					</div>
				</div>

				<div
					className={
						showAllUsers
							? "pt-3 h-full overflow-auto pb-5"
							: "flex gap-3 pt-3 h-full overflow-hidden pb-5"
					}
				>
					<ListUsers
						showAll={showAllUsers}
						setUser={handleEditUser}
						openDeleteModal={handleModalDelete}
					/>
					{!showAllUsers && (
						<UpdateUser
							user={user}
							closeUpdateUser={setShowAllUsers}
							openDeleteModal={handleModalDelete}
							openBanModal={handleModalBan}
						/>
					)}
				</div>
			</section>
			<ModalDeleteUser
				user={{ id: user?.id ?? "", email: user?.email ?? "" }}
				openModal={showModalDelete}
				setOpenModal={setShowModalDelete}
			/>
			<ModalBanUser
				user={{
					id: user?.id ?? "",
					email: user?.email ?? "",
					isValid: user?.isValid ?? true,
				}}
				openModal={showModalBan}
				setOpenModal={setShowModalBan}
				changeUserIsValid={changeUserIsValid}
			/>
		</>
	);
}

export default Users;
