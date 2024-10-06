import React, { useState } from "react";
import { useGetReviewsByPoiSlugQuery } from "@/graphql/schema";
import { MessageSquareDashed, Pencil } from "lucide-react";
import LoadingBox from "../common/LoadingBox";
import ErrorBox from "../common/ErrorBox";
import ModalAddReviews from "./ModalAddReviews";
import ReviewCard from "../cards/ReviewCard";

function ReviewsPOI({ poi }: { poi: { id: string; slug: string } }) {
	const [modalAdd, setModalAdd] = useState(false);
	const { loading, data, error } = useGetReviewsByPoiSlugQuery({
		fetchPolicy: "no-cache",
		variables: {
			slug: poi.slug,
		},
	});

	const handleOpenAddReviews = () => {
		setModalAdd(true);
	};

	return (
		<>
			<div className="flex flex-col h-full">
				<div className="flex items-center justify-between">
					<p className="text-lg font-light">Avis</p>
					<p
						className="flex items-center gap-1 cursor-pointer rounded-md bg-white px-[4px] py-1 text-sm font-light self-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						onClick={handleOpenAddReviews}
					>
						<Pencil size={14} />
						Écrire un avis
					</p>
				</div>
				<hr className="my-3" />
				{loading && <LoadingBox />}
				{error && <ErrorBox />}

				{data && data.getReviewsByPOISlug.length > 0 ? (
					<div className="flex flex-col h-full overflow-y-auto">
						{data.getReviewsByPOISlug.map((r, i) => (
							<div key={i} className="p-2">
								<ReviewCard review={r} />
								{i < data.getReviewsByPOISlug.length - 1 && (
									<hr className="mt-3" />
								)}
							</div>
						))}
					</div>
				) : (
					<div className="h-full flex flex-col">
						<p className="font-light italic text-center text-sm">
							Soyez le premier à rédiger un avis !
						</p>
						<MessageSquareDashed
							className="h-full self-center text-gray-100"
							size={100}
						/>
					</div>
				)}
			</div>
			<ModalAddReviews
				openModal={modalAdd}
				closeModal={setModalAdd}
				poiId={poi.id}
			/>
		</>
	);
}

export default ReviewsPOI;
