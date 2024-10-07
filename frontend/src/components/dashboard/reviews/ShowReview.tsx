import { GetAllReviewsQuery } from "@/graphql/schema";
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

function ShowReview({
	closeShowReview,
	review,
}: {
	closeShowReview: Dispatch<SetStateAction<boolean>>;
	review: GetAllReviewsQuery["getAllReviews"][number] | undefined;
}) {
	return (
		<div className="w-full">
			<div className="flex flex-col w-full bg-white rounded-2xl shadow-md p-5">
				<div className="flex items-center justify-between">
					<p className="font-thin text-xs mb-0">
						Voir une review : {review?.id}
					</p>
					<X
						className="cursor-pointer text-gray-500 hover:text-black"
						onClick={() => closeShowReview(true)}
					/>
				</div>
				<div>
					<p>{review?.comment}</p>
				</div>
			</div>
		</div>
	);
}

export default ShowReview;
