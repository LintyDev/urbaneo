import {
	Exact,
	GetCityFromSearchQuery,
	InputSearchCity,
	PoiBudget,
	useGetCategoriesQuery,
} from "@/graphql/schema";
import LoadingBox from "../common/LoadingBox";
import ErrorBox from "../common/ErrorBox";
import DynamicIcon, { IconProps } from "../common/DynamicIcon";
import { SyntheticEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import { ApolloQueryResult } from "@apollo/client";
import { CheckCheck } from "lucide-react";

function ExplorerFilter({
	city,
	filters,
	refetch,
}: {
	city: GetCityFromSearchQuery["getCityFromSearch"];
	filters: InputSearchCity;
	refetch: (
		variables?:
			| Partial<
					Exact<{
						data: InputSearchCity;
					}>
			  >
			| undefined
	) => Promise<ApolloQueryResult<GetCityFromSearchQuery>>;
}) {
	const [currFilters, setCurrFilter] = useState<{
		categoriesIds: string[];
		budget: PoiBudget | null;
		slug: string | null;
	}>({
		categoriesIds: (filters.categoriesId?.length
			? filters.categoriesId
			: []) as string[],
		budget: filters.budget ?? null,
		slug: filters.slug,
	});
	const router = useRouter();
	const selectInput = useRef<HTMLSelectElement>(null);
	const [filtersState, setFiltersState] = useState<string>(
		filters.budget || filters.categoriesId?.length
			? "Réinitialiser les filtres"
			: "Choississez un filtre"
	);
	const [filtersQuery, setFiltersQuery] = useState<boolean | null>(
		filters.budget || filters.categoriesId?.length ? false : null
	);
	const { data, loading, error } = useGetCategoriesQuery();

	const handleSelectBudget = (e: SyntheticEvent<HTMLSelectElement, Event>) => {
		const newFilters = {
			...currFilters,
			budget:
				e.currentTarget.value === "all"
					? null
					: (e.currentTarget.value as PoiBudget),
		};
		setCurrFilter(newFilters);
		setFiltersState("Appliquer");
		setFiltersQuery(true);
	};

	const handleSelectCategories = ({ id }: { id: string }) => {
		const indexOfCat = currFilters.categoriesIds.indexOf(id);

		if (indexOfCat === -1) {
			const newCat = [...currFilters.categoriesIds, id];
			const newFilter = {
				...currFilters,
				categoriesIds: newCat,
			};
			setCurrFilter(newFilter);
		} else {
			const newCat = [...currFilters.categoriesIds];
			newCat.splice(indexOfCat, 1);
			const newFilter = {
				...currFilters,
				categoriesIds: newCat,
			};
			setCurrFilter(newFilter);
		}
		setFiltersState("Appliquer");
		setFiltersQuery(true);
	};

	const resetFilters = async () => {
		setCurrFilter({ ...currFilters, budget: null, categoriesIds: [] });
		await refetch({
			data: {
				slug: filters.slug,
			},
		});
		router.replace(`/explorer/${filters.slug}`, undefined, {
			shallow: true,
		});
	};

	const handleSearch = async () => {
		console.log(currFilters);
		switch (filtersQuery) {
			case true:
				console.log("perform search");
				const filtersQuerys = {
					budget: currFilters.budget,
					categoriesId: currFilters.categoriesIds,
				};
				let query = `?&f=${btoa(JSON.stringify(filtersQuery))}`;
				if (!filtersQuerys.budget && !filtersQuerys.categoriesId.length) {
					query = "";
				}
				await refetch({
					data: {
						slug: filters.slug,
						budget: currFilters.budget,
						categoriesId: currFilters.categoriesIds,
					},
				});
				router.replace(`/explorer/${filters.slug}${query}`, undefined, {
					shallow: true,
				});
				break;
			case false:
				console.log("perform Réinitialiser");
				await resetFilters();
				break;
			case null:
				console.log("perform focus");
				selectInput.current?.focus();
				break;
		}
	};

	return (
		<div className="grid grid-rows-[auto_auto_1fr_auto] w-[300px]">
			<div className="flex gap-3 justify-between items-center mb-5">
				<p className="text-2xl font-medium flex items-center gap-2">
					Filtres
					{(currFilters.budget || currFilters.categoriesIds.length > 0) && (
						<span>
							<CheckCheck />
						</span>
					)}
				</p>
				{filtersQuery === true && (
					<p
						className="text-blue-400 cursor-pointer hover:underline"
						onClick={async () => {
							await resetFilters();
						}}
					>
						Réinitialiser
					</p>
				)}
			</div>
			<div className="mb-5">
				<label
					htmlFor="budget"
					className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
				>
					<span>Budget</span>
				</label>
				<select
					ref={selectInput}
					id="budget"
					className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
					defaultValue={currFilters.budget ?? "all"}
					onChange={handleSelectBudget}
				>
					<option value={"all"}>Tous les budgets</option>
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
					{data?.getCategories.map((c) => {
						const selected = currFilters.categoriesIds?.includes(c.id);
						return (
							<p
								key={c.id}
								className={`bg-white flex gap-1 items-center p-2 shadow-md rounded-xl cursor-pointer hover:outline hover:outline-1 ${
									selected && "outline outline-1"
								}`}
								onClick={() => handleSelectCategories({ id: c.id })}
							>
								<DynamicIcon name={c.icon as IconProps["name"]} size={14} />
								<span className="text-sm">
									{c.name.charAt(0).toUpperCase() + c.name.slice(1)}
								</span>
							</p>
						);
					})}
				</div>
			</div>
			<div className="w-full">
				<button
					className="relative inline-block group w-full"
					onClick={handleSearch}
				>
					<span className="w-full relative z-10 block p-2 overflow-hidden font-medium leading-tight text-black transition-colors duration-300 ease-out border-2 border-black rounded-lg group-hover:text-white">
						<span className="absolute inset-0 w-full h-full p-2 rounded-lg bg-white"></span>
						<span className="absolute left-0 w-[500px] h-[500px] -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-black group-hover:-rotate-180 ease"></span>
						<span className="relative text-sm flex items-center gap-1 justify-center">
							{filtersState}
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
