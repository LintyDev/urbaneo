import { Label, MyAccountQuery, UserRole } from "@/graphql/schema";

function ViewRoles({ user }: { user: MyAccountQuery["mePlus"] }) {
	let status = "";
	switch (user?.role) {
		case UserRole.Admin:
			status = "Administrateur";
			break;
		case UserRole.User:
			status = "Membre Premium";
			break;
		case UserRole.UserPremium:
			status = "Membre";
			break;
	}

	return (
		<div className="border border-gray-200 rounded-xl p-4 mb-6 w-full">
			<div className="flex justify-between items-center mb-2">
				<p className="font-light">Status & Rôles</p>
			</div>
			<div>
				<div className="flex flex-col mt-2">
					<p className="font-thin">Status</p>
					<p>{status}</p>
				</div>
				{user?.cityRole && user.cityRole.length > 0 && (
					<div className="flex flex-col mt-2">
						<p className="font-thin">Rôles</p>
						<div className="flex gap-1">
							{user.cityRole.map((c, i) => (
								<p
									key={i}
									className={`${
										c.label === Label.CityAdmin
											? "bg-red-500 border-red-700"
											: "bg-orange-500 border-orange-700"
									} px-2 py-1 rounded-xl border text-sm`}
								>
									<span>{c.city.name}</span>
									<span>
										{c.label === Label.CityAdmin ? " (admin)" : " (modo)"}
									</span>
								</p>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default ViewRoles;
