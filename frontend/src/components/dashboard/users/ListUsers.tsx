import ErrorBox from "@/components/common/ErrorBox";
import LoadingBox from "@/components/common/LoadingBox";
import { GetUsersQuery, useGetUsersQuery } from "@/graphql/schema";
import { getImageUrl } from "@/lib/getImagesUrl";
import { Trash2 } from "lucide-react";
import Image from "next/image";

function ListUsers({
	showAll,
	setUser,
	openDeleteModal,
}: {
	showAll: boolean;
	setUser: (user: GetUsersQuery["getUsers"][number]) => void;
	openDeleteModal: (user: GetUsersQuery["getUsers"][number]) => void;
}) {
	const { loading, data, error } = useGetUsersQuery();

	if (loading) return <LoadingBox />;
	if (error) return <ErrorBox />;
	return (
		<div className="h-full grid grid-rows-[auto_1fr_auto] bg-gray-200/50 rounded-2xl text-gray-500 shadow-md">
			<div
				className={`${
					showAll
						? "grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_0.2fr]"
						: "grid grid-cols-[1fr_1fr_0.5fr] w-[500px] max-w-[500px]"
				} text-xs rounded-t-2xl font-semibold text-gray-700 uppercase bg-gray-200 py-3 px-5 whitespace-nowrap`}
			>
				<p>#</p>
				<p>Email</p>
				<p className={`${showAll ? "" : "hidden"}`}>Nom</p>
				<p className={`${showAll ? "" : "hidden"}`}>Location</p>
				<p>Role</p>
				<p className={`${showAll ? "" : "hidden"}`}>Valide</p>
				<p className={`${showAll ? "" : "hidden"}`}>Action</p>
			</div>

			<div className="overflow-y-auto max-h-full">
				{data?.getUsers.map((u) => (
					<div
						key={u.id}
						className={`${
							showAll
								? "grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_0.2fr]"
								: "grid grid-cols-[1fr_1fr_0.5fr]"
						} items-center py-[11px] px-5 overflow-hidden odd:bg-white even:bg-gray-50 cursor-pointer hover:odd:bg-blue-50/80 hover:even:bg-blue-50/80
            `}
						onClick={() => setUser(u)}
					>
						<p className="text-gray-700 font-medium">
							<Image
								src={getImageUrl(u.avatar)}
								alt={"photo1"}
								width={70}
								height={70}
								unoptimized={true}
								className="rounded-lg"
								priority={false}
							/>
						</p>
						<p className="text-gray-700 font-medium">{u.email}</p>
						<p className={`${showAll ? "" : "hidden"}`}>
							{u.firstName + " " + u.lastName}
						</p>
						<p className={`${showAll ? "" : "hidden"}`}>{u.location}</p>
						<p>{u.role}</p>
						<p className={`${showAll ? "" : "hidden"}`}>
							{u.isValid ? "Oui" : "Non"}
						</p>
						<Trash2
							className={`cursor-pointer hover:text-red-600 justify-self-center ${
								showAll ? "" : "hidden"
							}`}
							onClick={(e) => {
								e.stopPropagation();
								openDeleteModal(u);
							}}
						/>
					</div>
				))}
			</div>
			<p className="text-right py-2 px-5 bg-gray-200 rounded-b-2xl shadow-top">
				1 - {data?.getUsers.length} sur {data?.getUsers.length}
			</p>
		</div>
	);
}

export default ListUsers;
