import { useGetLastUsersQuery } from "@/graphql/schema";
import LoadingBox from "../common/LoadingBox";
import ErrorBox from "../common/ErrorBox";
import Image from "next/image";
import { getImageUrl } from "@/lib/getImagesUrl";

function LastUsers() {
	const { loading, data, error } = useGetLastUsersQuery({
		fetchPolicy: "no-cache",
		variables: {
			limit: 5,
		},
	});
	return (
		<div className="flex flex-col w-[70%] bg-white p-5 rounded-2xl shadow-md overflow-hidden max-h-[210px]">
			<p className="font-thin text-xs pl-2 pb-3">
				Derniers utilisateurs inscrits
			</p>
			{loading && <LoadingBox />}
			{error && <ErrorBox />}

			<div className="flex gap-2 h-full w-full overflow-x-auto max-h-[210px]">
				{data?.getUsers.map((u) => (
					<div
						key={u.id}
						className="flex flex-col items-center py-4 px-2 rounded-lg justify-between w-52 cursor-pointer hover:bg-slate-50"
					>
						<Image
							src={getImageUrl(u.avatar)}
							alt="avatar user"
							height={100}
							width={100}
							className="object-cover rounded-xl"
							unoptimized={true}
							priority={true}
						/>
						<p>
							{u.lastName} {u.firstName}
						</p>
						<p className="text-sm">{u.email}</p>
						<p>{u.location}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default LastUsers;
