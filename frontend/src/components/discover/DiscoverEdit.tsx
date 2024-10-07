import { FilePenLine } from "lucide-react";
import CreateUpdatePOI from "../dashboard/pois/CreatePOI";
import { useState } from "react";
import {
	Query,
	useDeletePoiMutation,
	useGetPoIsBySlugDiscoverEditQuery,
} from "@/graphql/schema";
import { useRouter } from "next/router";

function DiscoverEdit({ slug }: { slug: string }) {
	const router = useRouter();
	const [openEditModal, setOpenEditModal] = useState(true);
	const { loading, data, error } = useGetPoIsBySlugDiscoverEditQuery({
		variables: {
			slug: slug,
		},
		skip: !slug,
	});

	const [deletePOI] = useDeletePoiMutation();

	const handleDeletePoi = async (poi: Query["getPOIs"][number]) => {
		await deletePOI({
			variables: {
				deletePoiId: poi.id,
			},
			onCompleted(data, clientOptions) {
				router.push("/moderation");
			},
		});
	};
	return (
		<>
			<p
				className="ml-auto flex items-center gap-1 cursor-pointer rounded-md bg-white px-[4px] py-1 text-sm font-semibold self-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
