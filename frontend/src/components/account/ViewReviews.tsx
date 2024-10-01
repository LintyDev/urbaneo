import { MyAccountQuery } from "@/graphql/schema";

function ViewReviews({ user }: { user: MyAccountQuery["me"] }) {
	return (
		<div className="border border-gray-200 rounded-xl p-4 mb-6">
			<div className="flex justify-between items-center mb-2">
				<p className="font-light">Notes & Commentaires</p>
			</div>
			<div>
				<div className="flex flex-col mt-2">
					{user?.reviews && user.reviews.length > 0 ? (
						user.reviews.map((r) => <p key={r.id}>{r.note}</p>)
					) : (
						<p className="font-thin">Pas de notes / commentaires.</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default ViewReviews;
