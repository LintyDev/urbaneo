import React, { useState } from "react";
import { useGetReviewsByPoiSlugQuery } from "@/graphql/schema";
import { Plus } from "lucide-react";
import LoadingBox from "../common/LoadingBox";
import ErrorBox from "../common/ErrorBox";
import ModalAddReviews from "./ModalAddReviews";
import Image from "next/image";
import { getImageUrl } from "@/lib/getImagesUrl";
import ReviewCard from "../common/ReviewCard";

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
			<div className="flex flex-col rounded-xl mb-6 shadow-lg p-5 outline outline-1 outline-gray-200 bg-white">
				<div className="flex items-center justify-between">
					<p className="text-lg font-light">Avis</p>
					<p
						className="flex items-center gap-1 cursor-pointer rounded-md bg-white px-[4px] py-1 text-sm font-light self-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						onClick={handleOpenAddReviews}
					>
						<Plus size={14} />
						Ajouter un avis
					</p>
				</div>
				<hr className="my-3" />
				{loading && <LoadingBox />}
				{error && <ErrorBox />}

				{data && data.getReviewsByPOISlug.length > 0 ? (
					<div className="flex flex-col gap-3">
						{data.getReviewsByPOISlug.map((r, i) => (
							<div
								key={i}
								className="bg-gray-50/70 outline outline-1 outline-gray-200 rounded-lg p-2"
							>
								<ReviewCard review={r} />
							</div>
						))}
					</div>
				) : (
					<p>Pas d&apos;avis</p>
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
