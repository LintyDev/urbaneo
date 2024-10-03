import {
	GetCityFromSearchQuery,
	PoiBudget,
	useGetCategoriesQuery,
} from "@/graphql/schema";
import LoadingBox from "../common/LoadingBox";
import ErrorBox from "../common/ErrorBox";
import DynamicIcon, { IconProps } from "../common/DynamicIcon";

function ExplorerFilter({
	city,
}: {
	city: GetCityFromSearchQuery["getCityFromSearch"];
}) {
	const { data, loading, error } = useGetCategoriesQuery();
	return (
		<div className="grid grid-rows-[auto_auto_1fr_auto] w-[300px]">
			<div className="flex gap-3 justify-between items-center mb-5">
				<p className="text-2xl font-medium">Filtres</p>
				<p className="text-blue-400 cursor-pointer hover:underline">
					Réinitialiser
				</p>
			</div>
			<div className="mb-5">
				<label
					htmlFor="budget"
					className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
				>
					<span>Budget</span>
				</label>
				<select
					id="budget"
					className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
				>
					<option value={"none"}>Tous les budgets</option>
					<option value={PoiBudget.High}>$$$</option>
					<option value={PoiBudget.Mid}>$$</option>
					<option value={PoiBudget.Low}>$</option>
				</select>
			</div>
			<div>
				<p className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900">
					Catégories
				</p>
				<div className="flex flex-wrap gap-2">
					{loading && <LoadingBox />}
					{error && <ErrorBox />}
					{data?.getCategories.map((c) => (
						<p
							key={c.id}
							className="flex gap-1 items-center p-2 shadow-md rounded-xl cursor-pointer hover:outline hover:outline-1"
						>
							<DynamicIcon name={c.icon as IconProps["name"]} size={14} />
							<span className="text-sm">
								{c.name.charAt(0).toUpperCase() + c.name.slice(1)}
							</span>
						</p>
					))}
				</div>
			</div>
			<div className="w-full">
				<button className="relative inline-block group w-full">
					<span className="w-full relative z-10 block p-2 overflow-hidden font-medium leading-tight text-black transition-colors duration-300 ease-out border-2 border-black rounded-lg group-hover:text-white">
						<span className="absolute inset-0 w-full h-full p-2 rounded-lg bg-white"></span>
						<span className="absolute left-0 w-[500px] h-[500px] -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-black group-hover:-rotate-180 ease"></span>
						<span className="relative text-sm flex items-center gap-1 justify-center">
							Appliquer
						</span>
					</span>
					<span
						className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-[2px] transition-all duration-200 ease-linear bg-[rgba(0,0,0,0.5)] rounded-lg group-hover:mb-0 group-hover:mr-0"
						data-rounded="rounded-lg"
					></span>
				</button>
			</div>
		</div>
	);
}

export default ExplorerFilter;
