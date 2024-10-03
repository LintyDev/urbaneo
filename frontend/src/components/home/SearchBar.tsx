import {
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
import { useState } from "react";
import DynamicIcon, { IconProps } from "../common/DynamicIcon";
import { useRouter } from "next/router";

function SearchBar() {
	const router = useRouter();
	const [cities, setCities] = useState<SearchCitiesQuery["searchCities"]>([]);
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
							data.getCategories.slice(0, 7).map((c) => (
								<p
									key={c.id}
									className="flex items-center gap-2 rounded-3xl py-1 px-2 border-[1px] text-xs border-black cursor-pointer bg-black hover:bg-[rgba(0,0,0,0.8)] hover:border-white"
								>
									<DynamicIcon name={c.icon as IconProps["name"]} size={12} />
									{c.name}
								</p>
							))}
					</div>
				</div>
				<div className="md:flex md:gap-3 md:items-center">
					<Field className="w-full relative">
						<Label className="text-sm/6 font-medium text-white">
							Choissisez une ville
						</Label>
						<Input
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
										onClick={() => router.push(`/explorer/${c.slug}`)}
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
					<button className="relative inline-block group">
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
