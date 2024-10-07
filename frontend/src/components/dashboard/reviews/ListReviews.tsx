import ErrorBox from "@/components/common/ErrorBox";
import LoadingBox from "@/components/common/LoadingBox";
import Notes from "@/components/common/Notes";
import { GetAllReviewsQuery, useGetAllReviewsQuery } from "@/graphql/schema";
import { Trash2 } from "lucide-react";

function ListReviews({
	showAll,
	setReview,
	deleteReview,
}: {
	showAll: boolean;
	setReview: (review: GetAllReviewsQuery["getAllReviews"][number]) => void;
	deleteReview: (review: GetAllReviewsQuery["getAllReviews"][number]) => void;
}) {
	const { loading, data, error } = useGetAllReviewsQuery();

	const handleDeleteReview = (
		review: GetAllReviewsQuery["getAllReviews"][number]
	) => {
		deleteReview(review);
	};

	if (loading) return <LoadingBox />;
	if (error) return <ErrorBox />;
	return (
		<div className="h-full grid grid-rows-[auto_1fr_auto] bg-gray-200/50 rounded-2xl text-gray-500 shadow-md">
			<div
				className={`${
					showAll
						? "grid grid-cols-[1fr_1fr_1fr_1fr_0.2fr]"
						: "grid grid-cols-[1fr_1fr_0.5fr] w-[500px] max-w-[500px]"
				} text-xs rounded-t-2xl font-semibold text-gray-700 uppercase bg-gray-200 py-3 px-5 whitespace-nowrap`}
			>
				<p>Email</p>
				<p className={`${showAll ? "" : "hidden"}`}>Date</p>
				<p>Point d&apos;intérêt</p>
				<p>Note</p>
				<p className={`${showAll ? "" : "hidden"}`}>Action</p>
			</div>
			<div className="overflow-y-auto max-h-full">
				{data?.getAllReviews.map((r) => (
					<div
						key={r.id}
						className={`${
							showAll
								? "grid grid-cols-[1fr_1fr_1fr_1fr_0.2fr]"
								: "grid grid-cols-[1fr_1fr_0.5fr]"
						} items-center py-[11px] px-5 overflow-hidden odd:bg-white even:bg-gray-50
             cursor-pointer hover:odd:bg-blue-50/80 hover:even:bg-blue-50/80`}
						onClick={() => setReview(r)}
					>
						<p className="text-gray-700 font-medium">{r.user.email}</p>
						<p className={`${showAll ? "" : "hidden"}`}>{r.date}</p>
						<p>{r.POI.name}</p>
						<Notes note={r.note} />
						<Trash2
							className={`cursor-pointer hover:text-red-600 justify-self-center ${
								showAll ? "" : "hidden"
							}`}
							onClick={(e) => {
								e.stopPropagation();
								handleDeleteReview(r);
							}}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default ListReviews;
