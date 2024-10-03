import {
	PoiBudget,
	SearchCitiesQuery,
	useGetCategoriesQuery,
	useSearchCitiesLazyQuery,
} from "@/graphql/schema";
import { Field, Input, Label, Select } from "@headlessui/react";
import clsx from "clsx";
import {
	Castle,
	ChevronDownIcon,
	Dices,
	Hand,
	Hotel,
	Search,
	Users,
	UtensilsCrossed,
} from "lucide-react";
import { SyntheticEvent, useRef, useState } from "react";
import DynamicIcon, { IconProps } from "../common/DynamicIcon";
import { useRouter } from "next/router";

function SearchBar() {
	const router = useRouter();
	const inputSearch = useRef<HTMLInputElement>(null);
	const [cities, setCities] = useState<SearchCitiesQuery["searchCities"]>([]);
	const [filters, setFilters] = useState<{
		categoriesIds: string[];
		budget: PoiBudget | null;
		slug: string | null;
	}>({ categoriesIds: [], budget: null, slug: null });
	const [searchCities] = useSearchCitiesLazyQuery({
		fetchPolicy: "no-cache",
		onCompleted(data) {
			setCities(data.searchCities);
		},
		onError(error) {
			console.log(error.message);
		},
	});
	const { loading, data, error } = useGetCategoriesQuery();

	const handleSetSlug = (slug: string, name: string) => {
		const newFilter = {
			...filters,
			slug,
		};
		setFilters(newFilter);
		inputSearch.current!.value = name;
		setCities([]);
	};

	const handleSelectBudget = (e: SyntheticEvent<HTMLSelectElement, Event>) => {
		const newFilters = {
			...filters,
			budget:
				e.currentTarget.value === "all"
					? null
					: (e.currentTarget.value as PoiBudget),
		};
		setFilters(newFilters);
	};

	const handleSelectCategories = ({ id }: { id: string }) => {
		const indexOfCat = filters.categoriesIds.indexOf(id);

		if (indexOfCat === -1) {
			const newCat = [...filters.categoriesIds, id];
			const newFilter = {
				...filters,
				categoriesIds: newCat,
			};
			setFilters(newFilter);
		} else {
			const newCat = [...filters.categoriesIds];
			newCat.splice(indexOfCat, 1);
			const newFilter = {
				...filters,
				categoriesIds: newCat,
			};
			setFilters(newFilter);
		}
	};

	const handleSearch = () => {
		if (!filters.slug) {
			inputSearch.current?.focus();
			return;
		}

		const filtersQuery = {
			budget: filters.budget,
			categoriesId: filters.categoriesIds,
		};
		let link = `/explorer/${filters.slug}`;
		if (filters.budget || filters.categoriesIds.length) {
			link = link + "?&f=" + btoa(JSON.stringify(filtersQuery));
		}
		router.push(link);
	};

	return (
		<div className="h-full flex flex-col justify-center items-center mx-3 md:mx-0">
			<h1 className="text-6xl">Découvrez Lille</h1>
			<p className="text-3xl mb-3 italic font-thin">
				Faites l&apos;expérience Urbaneo !
			</p>
			<div className="bg-[rgba(0,0,0,0.58)] p-5 rounded-2xl w-full md:w-fit">
				<div className="hidden md:flex">
					<Field className="w-full mr-2">
						<Label className="text-sm/6 font-medium text-white">Filtres:</Label>
					</Field>
					<div className="flex gap-2 whitespace-nowrap">
						{data &&
							data.getCategories.length > 0 &&
							data.getCategories.slice(0, 7).map((c) => {
								const selected = filters.categoriesIds.includes(c.id);
								return (
									<p
										key={c.id}
										className={`flex items-center gap-2 rounded-3xl py-1 px-2 border-[1px] text-xs cursor-pointer bg-black hover:bg-[rgba(0,0,0,0.8)]  ${
											selected
												? "border-white"
												: "border-black hover:border-white"
										}`}
										onClick={() => handleSelectCategories({ id: c.id })}
									>
										<DynamicIcon name={c.icon as IconProps["name"]} size={12} />
										{c.name}
									</p>
								);
							})}
					</div>
				</div>
				<div className="md:flex md:gap-3 md:items-center">
					<Field className="w-full relative">
						<Label className="text-sm/6 font-medium text-white">
							Choissisez une ville
						</Label>
						<Input
							ref={inputSearch}
							className={clsx(
								`mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white`,
								"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
							)}
							placeholder="ex: Paris"
							onChange={(e) => {
								if (e.target.value === "") {
									setCities([]);
								} else {
									searchCities({
										variables: { text: e.target.value },
									});
								}
							}}
						/>
						{cities && cities.length > 0 && (
							<div className="absolute w-full bg-white/5 rounded-b-lg py-3 max-h-[500px] overflow-y-auto">
								{cities.map((c) => (
									<p
										key={c.id}
										className="px-3 cursor-pointer hover:bg-[rgba(0,0,0,0.88)] p-5"
										onClick={() => handleSetSlug(c.slug, c.name)}
									>
										{c.name}
									</p>
								))}
							</div>
						)}
					</Field>
					<Field className="w-full">
						<Label className="text-sm/6 font-medium text-white">
							Ajouter un budget
						</Label>
						<div className="relative">
							<Select
								className={clsx(
									"mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
									"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
									"*:text-black"
								)}
								onChange={handleSelectBudget}
							>
								<option value="all">Tous les budgets</option>
								<option value="low">Bas</option>
								<option value="mid">Moyen</option>
								<option value="high">Haut</option>
							</Select>
							<ChevronDownIcon
								className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
								aria-hidden="true"
							/>
						</div>
					</Field>
				</div>

				<div className="flex justify-end mt-3">
					<button
						className="relative inline-block group"
						onClick={handleSearch}
					>
						<span className="relative z-10 block p-2 overflow-hidden font-medium leading-tight text-black transition-colors duration-300 ease-out border-2 border-black rounded-lg group-hover:text-white">
							<span className="absolute inset-0 w-full h-full p-2 rounded-lg bg-white"></span>
							<span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-black group-hover:-rotate-180 ease"></span>
							<span className="relative text-sm flex items-center gap-1">
								<Search size={14} strokeWidth={3} />
								Rechercher
							</span>
						</span>
						<span
							className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-[2px] transition-all duration-200 ease-linear bg-[rgba(0,0,0,0.5)] rounded-lg group-hover:mb-0 group-hover:mr-0"
							data-rounded="rounded-lg"
						></span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default SearchBar;
