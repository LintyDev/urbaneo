import React from "react";
import { MyAccountQuery } from "@/graphql/schema";
import ReviewCard from "../cards/ReviewCard";
import Link from "next/link";

function ViewReviews({ user }: { user: MyAccountQuery["mePlus"] }) {
	return (
		<div className="border border-gray-200 rounded-xl p-4 mb-6">
			<div className="flex justify-between items-center mb-2">
				<p className="font-light">Notes & Commentaires</p>
			</div>
			<div>
				<div className="flex flex-col mt-2">
					{user?.reviews && user.reviews.length > 0 ? (
						user.reviews.map((r, i) => (
							<>
								<Link
									key={r.id}
									href={`/discover/${r.POI.slug}`}
									className="cursor-pointer rounded-lg p-2 hover:bg-gray-100"
								>
									<ReviewCard review={r} poiName={r.POI.name} />
								</Link>
								{i !== user.reviews.length - 1 && <hr className="my-2" />}
							</>
						))
					) : (
						<p className="font-thin">Pas de notes / commentaires.</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default ViewReviews;
