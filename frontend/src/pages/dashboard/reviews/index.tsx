import ListReviews from "@/components/dashboard/reviews/ListReviews";
import ModalDeleteReview from "@/components/dashboard/reviews/ModalDeleteReview";
import ShowReview from "@/components/dashboard/reviews/ShowReview";
import { GetAllReviewsQuery } from "@/graphql/schema";
import { Search } from "lucide-react";
import React, { useState } from "react";

function ReviewsDashboard() {
	const [showAllReviews, setShowAllReviews] = useState<boolean>(true);
	const [modalDeleteReview, setModalDeleteReview] = useState<boolean>(false);
	const [review, setReview] =
		useState<GetAllReviewsQuery["getAllReviews"][number]>();

	const handleSetReview = (
		review: GetAllReviewsQuery["getAllReviews"][number]
	) => {
		setReview(review);
		setShowAllReviews(false);
	};

	const handleDeleteReview = (
		review: GetAllReviewsQuery["getAllReviews"][number]
	) => {
		setReview(review);
		setModalDeleteReview(true);
	};

	return (
		<>
			<section className="flex flex-col h-full overflow-hidden">
				<div className="flex justify-between items-center mt-3">
					<div className="flex items-center bg-gray-200 py-2 px-4 rounded-lg text-sm">
						<input
							type="text"
							placeholder="Rechercher une review par point d'intérêt"
							className="bg-transparent w-60"
						/>
						<Search size={14} />
					</div>
				</div>

				<div
					className={
						showAllReviews
							? "pt-3 h-full overflow-auto pb-5"
							: "flex gap-3 pt-3 h-full overflow-hidden pb-5"
					}
				>
					<ListReviews
						showAll={showAllReviews}
						setReview={handleSetReview}
						deleteReview={handleDeleteReview}
					/>
					{!showAllReviews && (
						<ShowReview closeShowReview={setShowAllReviews} review={review} />
					)}
				</div>
			</section>
			<ModalDeleteReview
				idReview={review?.id ?? ""}
				openModal={modalDeleteReview}
				setOpenModal={setModalDeleteReview}
			/>
		</>
	);
}

export default ReviewsDashboard;
