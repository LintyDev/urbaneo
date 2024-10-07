import { FilePenLine } from "lucide-react";
import { useState } from "react";
import UpdateCity from "../dashboard/cities/UpdateCity";
import { GetCityFromSearchQuery, GetCityQuery } from "@/graphql/schema";

function ExplorerEdit({
	city,
}: {
	city: GetCityFromSearchQuery["getCityFromSearch"];
}) {
	const [openEditModal, setOpenEditModal] = useState(true);

	const handleDeleteCity = (city: GetCityQuery["getCity"]) => {};

	return (
		<>
			<p
				className="ml-auto flex items-center gap-1 cursor-pointer rounded-md bg-white px-[4px] py-1 text-sm font-semibold self-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
				onClick={() => setOpenEditModal(false)}
			>
				<FilePenLine size={16} /> Editer la ville
			</p>
			{!openEditModal && (
				<div className="bg-modal">
					<div className="modal bg-[transparent!important] w-[800px!important] h-[600px!important] overflow-y-auto text-base">
						<UpdateCity
							city={city as GetCityQuery["getCity"]}
							closeUpdateCity={setOpenEditModal}
							deleteCity={handleDeleteCity}
						/>
					</div>
				</div>
			)}
		</>
	);
}

export default ExplorerEdit;
