import { FilePenLine } from "lucide-react";
import CreateUpdatePOI from "../dashboard/pois/CreatePOI";
import { useState } from "react";
import { Query, useGetPoIsBySlugDiscoverEditQuery } from "@/graphql/schema";

function DiscoverEdit({ slug }: { slug: string }) {
	const [openEditModal, setOpenEditModal] = useState(true);
	const { loading, data, error } = useGetPoIsBySlugDiscoverEditQuery({
		variables: {
			slug: slug,
		},
		skip: !slug,
	});

	const handleDeletePoi = (poi: Query["getPOIs"][number]) => {};
	return (
		<>
			<p
				className="ml-auto flex items-center gap-1 font-medium hover:underline cursor-pointer"
				onClick={() => setOpenEditModal(false)}
			>
				<FilePenLine size={16} /> Editer
			</p>
			{!openEditModal && data && (
				<div className="bg-modal">
					<div className="modal bg-[transparent!important] w-[800px!important] h-[600px!important] overflow-y-auto">
						<CreateUpdatePOI
							modal={"update"}
							closeCreatePOI={setOpenEditModal}
							poiUpdate={
								data.getPOIsBySlug[0] as Query["getPOIsBySlug"][number]
							}
							deletePoi={handleDeletePoi}
							disableCity={true}
						/>
					</div>
				</div>
			)}
		</>
	);
}

export default DiscoverEdit;
