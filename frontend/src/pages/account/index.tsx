import EditGeneral from "@/components/account/EditGeneral";
import EditSecurity from "@/components/account/EditSecurity";
import ViewReviews from "@/components/account/ViewReviews";
import ViewRoles from "@/components/account/ViewRoles";
import ErrorBox from "@/components/common/ErrorBox";
import LoadingBox from "@/components/common/LoadingBox";
import { useMyAccountQuery } from "@/graphql/schema";
import { useEffect } from "react";

function Account() {
	const { loading, data, error } = useMyAccountQuery({
		fetchPolicy: "no-cache",
	});

	useEffect(() => {
		document.body.style.backgroundColor = "#f6f6f6";
		return () => {
			document.body.style.backgroundColor = "white";
		};
	}, []);

	if (loading) return <LoadingBox />;
	if (error) return <ErrorBox />;
	return (
		<div className="w-full md:max-w-5xl justify-self-center">
			<div className="flex flex-col mx-5">
				<h1 className="font-helvetica font-medium text-3xl text-start mb-2">
					Éditer mon profil
				</h1>
				<div className="w-full bg-white flex flex-col rounded-md shadow-md p-5">
					<EditGeneral user={data?.me} />
					<EditSecurity user={data?.me} />
					<ViewRoles user={data?.me} />
					<ViewReviews user={data?.me} />
				</div>
			</div>
		</div>
	);
}

export default Account;
