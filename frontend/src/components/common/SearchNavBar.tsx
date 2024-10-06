import { SearchCitiesQuery, useSearchCitiesLazyQuery } from "@/graphql/schema";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

function SearchNavBar() {
	const router = useRouter();
	const [cities, setCities] = useState<SearchCitiesQuery["searchCities"]>([]);
	const inputSearch = useRef<HTMLInputElement | null>(null);
	const [searchCities] = useSearchCitiesLazyQuery({
		fetchPolicy: "no-cache",
		onCompleted(data) {
			setCities(data.searchCities);
		},
		onError(error) {
			console.log(error.message);
		},
	});

	const handleResetSearch = (slug: string) => {
		router.push(`/explorer/${slug}`);
		setCities([]);
		inputSearch.current!.value = "";
	};
	return (
		<div className="hidden relative md:block md:w-[400px]">
			<input
				ref={inputSearch}
				className="w-full rounded-md border-0 py-1.5 px-1.5 bg-gray-100 text-gray-900 z-10 placeholder:text-gray-400 sm:text-sm sm:leading-6"
				placeholder="Recherche une ville"
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
				<div className="absolute flex flex-col w-full bg-gray-100 shadow-lg rounded-b-lg py-3 max-h-[500px] overflow-y-auto z-[10000]">
					{cities.map((c) => (
						<p
							key={c.id}
							className="px-3 cursor-pointer hover:bg-white p-5"
							onClick={() => handleResetSearch(c.slug)}
						>
							{c.name}
						</p>
					))}
				</div>
			)}
		</div>
	);
}

export default SearchNavBar;
