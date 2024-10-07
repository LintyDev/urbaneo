import {
	FindModeratorByCityIdDocument,
	FindUserForCityRoleQuery,
	Label,
	useAddRoleMutation,
	useFindUserForCityRoleLazyQuery,
} from "@/graphql/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { PlusCircle } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

function ModerationAddRole({
	cityId,
	closeAddRole,
}: {
	cityId: string;
	closeAddRole: () => void;
}) {
	const [searchUsers] = useFindUserForCityRoleLazyQuery();
	const [addRole] = useAddRoleMutation({
		refetchQueries: [
			{ query: FindModeratorByCityIdDocument, variables: { cityId } },
		],
	});
	const [users, setUsers] = useState<
		FindUserForCityRoleQuery["findUserForCityRole"]
	>([]);
	const inputSearch = useRef<HTMLInputElement | null>(null);

	const handleSearchUsers = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (!value || value === "") {
			setUsers([]);
			return;
		}

		searchUsers({
			variables: {
				email: value,
				cityId,
			},
			onCompleted(data) {
				setUsers(data.findUserForCityRole);
			},
		});
	};

	const schema = object({
		emailId: string().required("Veuillez remplir l'email"),
	});

	const {
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = handleSubmit(async (data) => {
		addRole({
			variables: {
				data: {
					label: Label.CityModerator,
					userId: data.emailId,
					cityId,
				},
			},
			onCompleted(data, clientOptions) {
				closeAddRole();
				reset();
			},
		});
	});

	return (
		<div className="bg-gray-100 rounded-lg p-5 mt-2">
			<form className="flex gap-3 items-end" onSubmit={onSubmit}>
				<div className="w-full relative">
					<label
						htmlFor="search"
						className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
					>
						<span>Rechercher un utilisateur</span>
						{errors.emailId && (
							<span className="text-red-600">{errors.emailId.message}</span>
						)}
					</label>
					<input
						id="search"
						ref={inputSearch}
						autoComplete="off"
						type="text"
						className="w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
						placeholder={"urbaneo@gmail.com"}
						onChange={handleSearchUsers}
					/>
					{users && users.length > 0 && (
						<div className="absolute w-full bg-white rounded-b-lg shadow-md py-2">
							{users.map((u) => (
								<div
									key={u.id}
									className="p-2 cursor-pointer hover:bg-gray-200"
									onClick={() => {
										setValue("emailId", u.id, { shouldValidate: true });
										setUsers([]);
										inputSearch.current!.value = u.email;
									}}
								>
									{u.email}
								</div>
							))}
						</div>
					)}
				</div>
				<button
					type="submit"
					className="flex items-center gap-2 rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-900 hover:text-blue-400"
				>
					<PlusCircle size={15} /> Ajouter
				</button>
			</form>
		</div>
	);
}

export default ModerationAddRole;
