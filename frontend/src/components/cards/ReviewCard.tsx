import { GetReviewsByPoiSlugQuery, MyAccountQuery } from "@/graphql/schema";
import { getImageUrl } from "@/lib/getImagesUrl";
import Image from "next/image";
import Notes from "../common/Notes";

function ReviewCard({
	review,
	poiName,
}: {
	review: GetReviewsByPoiSlugQuery["getReviewsByPOISlug"][number];
	poiName?: string;
}) {
	return (
		<div className="flex flex-col">
			<div className="flex justify-between">
				<div className="flex gap-2">
					<Image
						src={getImageUrl(review.user.avatar)}
						alt="avatar"
						width={50}
						height={50}
						unoptimized={true}
						className="w-[50px] h-[50px] object-cover object-center rounded-full"
					/>
					<div className="flex flex-col">
						<p>{review.user.firstName}</p>
						<Notes note={review.note} />
					</div>
				</div>

				<p className="italic font-light text-sm">
					{poiName && <span>{poiName} - </span>}
					<span>{review.date.slice(0, 10)}</span>
				</p>
			</div>
			<p className="mt-2">{review.comment}</p>
		</div>
	);
}

export default ReviewCard;
