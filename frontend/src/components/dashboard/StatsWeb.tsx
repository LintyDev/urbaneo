import { useGetWebStatsQuery } from "@/graphql/schema";
import LoadingBox from "../common/LoadingBox";
import ErrorBox from "../common/ErrorBox";
import { Building2 } from "lucide-react";

function StatsWeb() {
	const { loading, data, error } = useGetWebStatsQuery({
		fetchPolicy: "no-cache",
	});

	if (loading) <LoadingBox />;
	if (error) <ErrorBox />;
	return (
		<div className="flex flex-col gap-3 w-[40%]">
			<div className="bg-[#252525] text-gray-50 p-5 rounded-2xl shadow-xl w-full">
				<p className="font-thin text-xs pl-2 pb-3 text-gray-200">Web Stats</p>
				<div className="flex items-center justify-between">
					<p className="flex items-center gap-1">
						<span className="text-4xl font-medium">
							{data?.getWebStats.find((w) => w.label === "utilisateurs")?.nb}
						</span>
						<span className="flex text-[10px] italic">
							utilisateurs ont rejoint
							<br /> la communauté Urbaneo !
						</span>
					</p>

					<p className="flex items-center gap-1">
						<span className="text-4xl font-medium">
							{" "}
							{data?.getWebStats.find((w) => w.label === "reviews")?.nb}
						</span>
						<span className="flex text-[10px] italic">
							reviews
							<br /> ont étés postés.
						</span>
					</p>
				</div>

				<p className="font-thin text-xs pl-2 pt-3 text-gray-200"></p>

				<div className="flex w-full gap-3 justify-center">
					{data?.getWebStats
						.filter((s) => s.label !== "utilisateurs" && s.label !== "reviews")
						.map((s) => (
							<div
								key={s.label}
								className="flex flex-col items-center bg-gray-200 text-[#252525] shadow-md p-2 rounded-md w-[110px]"
							>
								<Building2 />
								<p className="text-4xl font-medium">{s.nb}</p>
								<p className="text-xs">{s.label}</p>

								{/* {s.label} : {s.nb} */}
							</div>
						))}
				</div>
			</div>
			<div className="bg-white p-5 rounded-2xl w-full h-full text-center content-center">
				<p className="text-xs italic">Ce bloc ne sert à rien.</p>
				<p className="text-4xl font-serif">Vive le css ^^!</p>
			</div>
		</div>
	);
}

export default StatsWeb;
