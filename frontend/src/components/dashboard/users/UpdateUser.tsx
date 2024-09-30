import DynamicIcon from "@/components/common/DynamicIcon";
import {
	GetUsersDocument,
	GetUsersQuery,
	Label,
	SearchCitiesLazyQueryHookResult,
	SearchCitiesQuery,
	useAddRoleMutation,
	useDeleteRolesMutation,
	UserRole,
	useSearchCitiesLazyQuery,
	useUpdateUserMutation,
} from "@/graphql/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Save, Trash2, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { array, object, string } from "yup";

function UpdateUser({
	user,
	closeUpdateUser,
	openDeleteModal,
	openBanModal,
}: {
	user?: GetUsersQuery["getUsers"][number];
	closeUpdateUser: Dispatch<SetStateAction<boolean>>;
	openDeleteModal: (user: GetUsersQuery["getUsers"][number]) => void;
	openBanModal: (user: GetUsersQuery["getUsers"][number]) => void;
}) {
	const [resultCities, setResultCities] = useState<
		SearchCitiesQuery["searchCities"]
	>([]);
	const [resultCitiesModo, setResultCitiesModo] = useState<
		SearchCitiesQuery["searchCities"]
	>([]);
	const [selectedCityAdmin, setSelectedCityAdmin] = useState<
		{ id: string; name: string; type: Label }[]
	>([]);
	const [selectedCityModo, setSelectedCityModo] = useState<
		{ id: string; name: string; type: Label }[]
	>([]);
	const inputCities = useRef<HTMLInputElement | null>(null);
	const inputCitiesModo = useRef<HTMLInputElement | null>(null);

	const [searchCities] = useSearchCitiesLazyQuery({
		fetchPolicy: "no-cache",
	});
	const [updateUser] = useUpdateUserMutation({
		refetchQueries: [{ query: GetUsersDocument }],
	});
	const [addRole] = useAddRoleMutation();
	const [deleteRole] = useDeleteRolesMutation();

	const schema = object({
		firstname: string().required(),
		lastname: string().required(),
		email: string().email().required(),
		location: string().required(),
		role: string()
			.test("testEnum", "Wrong Value", (value) => {
				if (
					value === UserRole.Admin ||
					value === UserRole.User ||
					value === UserRole.UserPremium
				) {
					return true;
				}
				return false;
			})
			.required(),
		cityAdminIds: array(),
		cityModoIds: array(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		if (user) {
			reset({
				email: user.email,
				firstname: user.firstName,
				lastname: user.lastName,
				location: user.location,
				role: user.role,
			});
			const cityRole = user.cityRole.map((c) => ({
				id: c.city.id,
				name: c.city.name,
				type: c.label,
			}));
			setSelectedCityAdmin(cityRole.filter((c) => c.type === Label.CityAdmin));
			setSelectedCityModo(
				cityRole.filter((c) => c.type === Label.CityModerator)
			);
		}
	}, [reset, user]);

	const onSubmit = handleSubmit(async (data) => {
		const oldCityAdminRole = user?.cityRole
			.filter((c) => c.label === Label.CityAdmin)
			.map((c) => c.city.id);
		const selectedRoleAdminIds = selectedCityAdmin.map((c) => c.id);
		const cityRoleAdminToDelete =
			oldCityAdminRole &&
			oldCityAdminRole.filter((c) => !selectedRoleAdminIds.includes(c));
		const cityRoleAdminToAdd = selectedCityAdmin.filter(
			(c) =>
				oldCityAdminRole &&
				!oldCityAdminRole.includes(c.id) &&
				cityRoleAdminToDelete &&
				!cityRoleAdminToDelete.includes(c.id)
		);

		const oldCityModoRole = user?.cityRole
			.filter((c) => c.label === Label.CityModerator)
			.map((c) => c.city.id);
		const selectedRoleModoIds = selectedCityModo.map((c) => c.id);
		const cityRoleModoToDelete =
			oldCityModoRole &&
			oldCityModoRole.filter((c) => !selectedRoleModoIds.includes(c));
		const cityRoleModoToAdd = selectedCityModo.filter(
			(c) =>
				oldCityModoRole &&
				!oldCityModoRole.includes(c.id) &&
				cityRoleModoToDelete &&
				!cityRoleModoToDelete.includes(c.id)
		);
		// console.log("admin to delete", cityRoleAdminToDelete);
		// console.log("admin to add", cityRoleAdminToAdd);
		// console.log("modo to delete", cityRoleModoToDelete);
		// console.log("modo to add", cityRoleModoToAdd);

		if (cityRoleAdminToDelete?.length) {
			cityRoleAdminToDelete.forEach((c) => {
				deleteRole({
					variables: {
						data: { userId: user?.id, cityId: c, label: Label.CityAdmin },
					},
				});
			});
		}

		if (cityRoleAdminToAdd.length) {
			cityRoleAdminToAdd.forEach((c) => {
				addRole({
					variables: {
						data: {
							userId: user?.id,
							cityId: c.id,
							label: Label.CityAdmin,
						},
					},
				});
			});
		}

		if (cityRoleModoToDelete?.length) {
			cityRoleModoToDelete.forEach((c) => {
				deleteRole({
					variables: {
						data: {
							userId: user?.id,
							cityId: c,
							label: Label.CityModerator,
						},
					},
				});
			});
		}

		if (cityRoleModoToAdd.length) {
			cityRoleModoToAdd.forEach((c) => {
				addRole({
					variables: {
						data: {
							userId: user?.id,
							cityId: c.id,
							label: Label.CityModerator,
						},
					},
				});
			});
		}

		updateUser({
			variables: {
				data: {
					id: user?.id,
					email: data.email,
					firstName: data.firstname,
					lastName: data.lastname,
					role: data.role as UserRole,
					location: data.location,
					isValid: true,
				},
			},
		});
	});

	const handleDeleteModal = (user: GetUsersQuery["getUsers"][number]) => {
		openDeleteModal(user);
	};

	const handleBanModal = (user: GetUsersQuery["getUsers"][number]) => {
		openBanModal(user);
	};

	return (
		<div className="w-full">
			<div className=" bg-white rounded-2xl shadow-md p-5">
				<div className="flex items-center justify-between">
					<p className="font-thin text-xs mb-0">
						Editer un Utilisateur : {user?.email}
					</p>
					<X
						className="cursor-pointer text-gray-500 hover:text-black"
						onClick={() => closeUpdateUser(true)}
					/>
				</div>

				<form className="flex flex-col gap-3" onSubmit={onSubmit}>
					<div>
						<label
							htmlFor="email"
							className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
						>
							<span>Email</span>
							{errors.email && (
								<span className="text-sm text-red-600 italic">
									{errors.email.message}
								</span>
							)}
						</label>
						<div className="mt-2">
							<input
								id="email"
								type="email"
								className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								{...register("email")}
							/>
						</div>
					</div>

					<div className="md:flex w-full gap-5">
						<div className="w-full">
							<label
								htmlFor="lastname"
								className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
							>
								<span>Nom</span>
								{errors.lastname && (
									<span className="text-sm text-red-600 italic">
										{errors.lastname.message}
									</span>
								)}
							</label>
							<div className="mt-2">
								<input
									id="lastname"
									type="text"
									className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									{...register("lastname")}
								/>
							</div>
						</div>

						<div className="w-full">
							<label
								htmlFor="firstname"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Prénom
							</label>
							{errors.firstname && (
								<span className="text-sm text-red-600 italic">
									{errors.firstname.message}
								</span>
							)}
							<div className="mt-2">
								<input
									id="firstname"
									type="text"
									className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									{...register("firstname")}
								/>
							</div>
						</div>
					</div>

					<div className="md:flex w-full gap-5">
						<div className="w-full">
							<label
								htmlFor="location"
								className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
							>
								<span>Location</span>
								{errors.location && (
									<span className="text-sm text-red-600 italic">
										{errors.location.message}
									</span>
								)}
							</label>
							<div className="mt-2">
								<input
									id="location"
									type="text"
									className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									{...register("location")}
								/>
							</div>
						</div>

						<div className="w-full">
							<label
								htmlFor="firstname"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Role
							</label>
							{errors.role && (
								<span className="text-sm text-red-600 italic">
									{errors.role.message}
								</span>
							)}
							<div className="mt-2">
								<select
									id="role"
									className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									{...register("role")}
								>
									<option value={UserRole.Admin}>Administrateur</option>
									<option value={UserRole.User}>Utilisateur</option>
									<option value={UserRole.UserPremium} disabled>
										Utilisateur Premium
									</option>
								</select>
							</div>
						</div>
					</div>

					<div className="mt-2 relative">
						<label
							htmlFor="cityAdmin"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Administration de Ville
						</label>
						<div className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
							{selectedCityAdmin && selectedCityAdmin.length > 0 && (
								<div className="flex gap-1 mb-1">
									{selectedCityAdmin.map((c, i) => (
										<p
											key={i}
											className="flex items-center gap-1 bg-black text-white py-1 px-2 rounded-lg"
										>
											<span className="text-xs">{c.name}</span>
											<X
												size={17}
												className="text-red-500 cursor-pointer hover:text-red-800"
												onClick={() => {
													setSelectedCityAdmin((prev) => [
														...prev.filter(
															(cityAdmin) => cityAdmin.id !== c.id
														),
													]);
													setValue("cityAdminIds", [
														...selectedCityAdmin.filter(
															(cityAdmin) => cityAdmin.id !== c.id
														),
													]);
												}}
											/>
										</p>
									))}
								</div>
							)}
							<input
								ref={inputCities}
								id="cityAdmin"
								type="text"
								className="block w-full"
								placeholder="Recherche une ville"
								autoComplete="off"
								onChange={(e) => {
									if (e.target.value === "") {
										setResultCities([]);
										return;
									}
									searchCities({
										variables: { text: e.target.value.charAt(0).toUpperCase() },
										onCompleted(data) {
											const filteredCities = data.searchCities.filter((c) => {
												return !selectedCityAdmin.some(
													(cityAdmin) => cityAdmin.id === c.id
												);
											});
											setResultCities(filteredCities);
										},
									});
								}}
							/>
							{resultCities && resultCities.length > 0 && (
								<div className="absolute left-0 flex flex-col gap-3 w-full bg-white rounded-b-md shadow-sm max-h-40 py-2 overflow-y-auto border border-gray-50 z-30">
									{resultCities.map((c, i) => (
										<p
											key={i}
											className="text-xs p-2 cursor-pointer hover:bg-blue-50"
											onClick={() => {
												setSelectedCityAdmin((prev) => [
													...prev,
													{ id: c.id, name: c.name, type: Label.CityAdmin },
												]);
												setValue("cityAdminIds", [
													...selectedCityAdmin,
													{ id: c.id, name: c.name, type: Label.CityAdmin },
												]);
												inputCities.current!.value = "";
												setResultCities([]);
											}}
										>
											{c.name}
										</p>
									))}
								</div>
							)}
						</div>
					</div>
					<div className="mt-2 relative">
						<label
							htmlFor="cityModo"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Modération de Ville
						</label>
						<div className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
							{selectedCityModo && selectedCityModo.length > 0 && (
								<div className="flex gap-1 mb-1">
									{selectedCityModo.map((c, i) => (
										<p
											key={i}
											className="flex items-center gap-1 bg-black text-white py-1 px-2 rounded-lg"
										>
											<span className="text-xs">{c.name}</span>
											<X
												size={17}
												className="text-red-500 cursor-pointer hover:text-red-800"
												onClick={() => {
													setSelectedCityModo((prev) => [
														...prev.filter((cityModo) => cityModo.id !== c.id),
													]);
													setValue("cityModoIds", [
														...selectedCityModo.filter(
															(cityModo) => cityModo.id !== c.id
														),
													]);
												}}
											/>
										</p>
									))}
								</div>
							)}
							<input
								ref={inputCitiesModo}
								id="cityModo"
								type="text"
								className="block w-full"
								placeholder="Recherche une ville"
								autoComplete="off"
								onChange={(e) => {
									if (e.target.value === "") {
										setResultCitiesModo([]);
										return;
									}
									searchCities({
										variables: { text: e.target.value.charAt(0).toUpperCase() },
										onCompleted(data) {
											const filteredCities = data.searchCities.filter((c) => {
												return !selectedCityModo.some(
													(cityModo) => cityModo.id === c.id
												);
											});
											setResultCitiesModo(filteredCities);
										},
									});
								}}
							/>
							{resultCitiesModo && resultCitiesModo.length > 0 && (
								<div className="absolute left-0 flex flex-col gap-3 w-full bg-white rounded-b-md shadow-sm max-h-40 py-2 overflow-y-auto border border-gray-50 z-30">
									{resultCitiesModo.map((c, i) => (
										<p
											key={i}
											className="text-xs p-2 cursor-pointer hover:bg-blue-50"
											onClick={() => {
												setSelectedCityModo((prev) => [
													...prev,
													{ id: c.id, name: c.name, type: Label.CityModerator },
												]);
												setValue("cityModoIds", [
													...selectedCityModo,
													{ id: c.id, name: c.name, type: Label.CityModerator },
												]);
												inputCitiesModo.current!.value = "";
												setResultCitiesModo([]);
											}}
										>
											{c.name}
										</p>
									))}
								</div>
							)}
						</div>
					</div>
					<div className="flex items-center justify-between mt-4">
						<div className="flex gap-3">
							<button
								type="button"
								className="flex items-center gap-2 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ring-red-300 hover:bg-red-900 hover:text-red-400"
								onClick={() => {
									if (user) {
										handleDeleteModal(user);
									}
								}}
							>
								<Trash2 size={15} /> Supprimer : {user?.email}
							</button>
							<button
								type="button"
								className={`flex items-center gap-2 rounded-md  ${
									!user?.isValid ? "bg-green-600" : "bg-orange-600"
								} px-2.5 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ${
									!user?.isValid
										? "ring-green-300 hover:bg-green-900 hover:text-green-400"
										: "ring-orange-300 hover:bg-orange-900 hover:text-orange-400"
								} `}
								onClick={() => {
									if (user) {
										handleBanModal(user);
									}
								}}
							>
								<Trash2 size={15} /> {!user?.isValid ? "Débannir" : "Bannir"} :{" "}
								{user?.email}
							</button>
						</div>
						<button
							type="submit"
							className="flex items-center gap-2 rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-900 hover:text-blue-400"
						>
							<Save size={15} /> Enregistrer la modification
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default UpdateUser;
