import CreateUpdatePOI from "@/components/dashboard/pois/CreatePOI";
import ModerationPOI from "@/components/moderation/ModerationPOI";
import { useAuth } from "@/contexts/AuthContext";
import { Label } from "@/graphql/schema";
import { MapPin, Monitor, PlusCircle, UserCog } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function Moderation() {
	const { user } = useAuth();
	const [modalPOI, setModalPOI] = useState(false);
	const [currCity, setCurrCity] = useState<{
		slug: string;
		name: string;
		id: string;
	}>({
		slug: "",
		name: "",
		id: "",
	});

	const handleOpenManagePOI = (currCity: {
		slug: string;
		name: string;
		id: string;
	}) => {
		setCurrCity(currCity);
		setModalPOI(true);
	};

	return (
		<>
			<section className="px-16 w-full h-full">
				<div className="w-full bg-white shadow-lg p-5 rounded-2xl">
					<p className="text-2xl font-light mb-5">Modération</p>
					<div className="flex flex-wrap gap-3">
						{user?.cityRole.length ? (
							user?.cityRole.map((c) => (
								<div
									key={c.id}
									className="bg-gray-100 p-5 rounded-xl hover:outline hover:outline-1 hover:outline-gray-300"
								>
									<p className="text-lg font-light">{c.city.name}</p>
									<p className="mb-5">
										{c.label === Label.CityAdmin
											? "Administrateur"
											: "Modérateur"}
									</p>
									<div className="flex flex-col gap-3">
										<button
											className="flex items-center gap-1 cursor-pointer rounded-md bg-white px-4 py-1 text-sm font-semibold self-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
											onClick={() => {
												handleOpenManagePOI({
													slug: c.city.slug,
													name: c.city.name,
													id: c.city.id,
												});
											}}
										>
											<MapPin size={14} /> Gérer les points d&apos;intérêts
										</button>
										{c.label === Label.CityAdmin && (
											<button className="flex items-center gap-1 cursor-pointer rounded-md bg-black px-4 py-1 text-sm font-semibold self-center text-white shadow-sm ring-1 ring-inset ring-gray-900 hover:bg-gray-950">
												<UserCog size={14} /> Gérer les modérateurs
											</button>
										)}
										<Link
											href={`/explorer/${c.city.slug}`}
											className="flex items-center gap-1 cursor-pointer rounded-md bg-white px-4 py-1 text-sm font-semibold self-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
										>
											<Monitor size={14} /> Voir la ville
										</Link>
									</div>
								</div>
							))
						) : (
							<p>Administration générale directement..</p>
						)}
					</div>
				</div>
			</section>
			{modalPOI && <ModerationPOI closeModal={setModalPOI} city={currCity} />}
		</>
	);
}

export default Moderation;
