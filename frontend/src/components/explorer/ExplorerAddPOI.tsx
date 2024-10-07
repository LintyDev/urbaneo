import { CirclePlus } from "lucide-react";
import { useState } from "react";
import CreateUpdatePOI from "../dashboard/pois/CreatePOI";
import { Query } from "@/graphql/schema";

function ExplorerAddPOI({
	cityId,
	cityName,
}: {
	cityId: string;
	cityName: string;
}) {
	const [openEditModal, setOpenEditModal] = useState(true);

	return (
		<>
			<p
				className="ml-auto flex items-center gap-1 cursor-pointer rounded-md bg-white px-[4px] py-1 text-sm font-semibold self-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
				onClick={() => setOpenEditModal(false)}
			>
				<CirclePlus size={16} /> Ajouter un point d&apos;intérêt
			</p>
			{!openEditModal && (
				<div className="bg-modal z-[10000!important]">
					<div className="modal bg-[transparent!important] w-[800px!important] h-full max-h-[700px!important] overflow-y-auto">
						<CreateUpdatePOI
							modal="add"
							closeCreatePOI={setOpenEditModal}
							disableCity={true}
							setCity={{ cityId, cityName }}
						/>
					</div>
				</div>
			)}
		</>
	);
}

export default ExplorerAddPOI;
