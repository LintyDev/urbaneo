import {
	GetPoIsByCitySlugQuery,
	Query,
	SearchPoIsQuery,
	useGetPoIsByCitySlugQuery,
	useSearchPoIsLazyQuery,
} from "@/graphql/schema";
import { PlusCircle, X } from "lucide-react";
import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import LoadingBox from "../common/LoadingBox";
import ErrorBox from "../common/ErrorBox";
import ModerationPOIList from "./ModerationPOIList";
import CreateUpdatePOI from "../dashboard/pois/CreatePOI";

function ModerationPOI({
	closeModal,
	city,
}: {
	closeModal: Dispatch<SetStateAction<boolean>>;
	city: { slug: string; name: string; id: string };
}) {
	const { loading, data, error } = useGetPoIsByCitySlugQuery({
		variables: {
			citySlug: city.slug,
		},
		skip: city.slug === "",
	});
	const [searchPOIs] = useSearchPoIsLazyQuery();

	const [currShow, setCurrShow] = useState<
		"list" | "add" | "update" | "search"
	>("list");
	const [currPOI, setCurrPOI] =
		useState<GetPoIsByCitySlugQuery["getPOIsByCitySlug"][number]>();
	const [createUpdate, setCreateUpdate] = useState(true);
	const [resultsPOIS, setResultsPOIS] = useState<SearchPoIsQuery["searchPOIs"]>(
		[]
	);

	const handleAddPOI = () => {
		setCurrShow("add");
		setCreateUpdate(false);
	};

	const handleUpdatePOI = (
		poi: GetPoIsByCitySlugQuery["getPOIsByCitySlug"][number]
	) => {
		setCurrPOI(poi);
		setCurrShow("update");
		setCreateUpdate(false);
	};

	const handlePerfomSearch = async (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		if (!value || value === "") {
			setCurrShow("list");
			return;
		}

		searchPOIs({
			variables: {
				data: {
					text: value,
					cityId: city.id,
				},
			},
			onCompleted(data) {
				setResultsPOIS(data.searchPOIs);
				setCurrShow("search");
			},
		});
	};

	useEffect(() => {
		if (createUpdate) {
			setCurrShow("list");
		}
	}, [createUpdate]);

	if (loading) return <LoadingBox />;
	if (error) return <ErrorBox />;
	return (
		<div className="bg-modal">
			<div className="modal flex flex-col bg-white w-[800px!important] h-[600px!important] overflow-y-auto">
				<div className="flex items-center justify-between">
					<p className="text-2xl font-light">
						Gérer les points d&apos;intérêts de <b>{city.name}</b>
					</p>
					<p
						onClick={() => closeModal(false)}
						className="text-gray-600 cursor-pointer hover:text-black"
					>
						<X size={24} />
					</p>
				</div>
				<div className="flex items-center justify-between">
					<input
						className="w-full max-w-52 rounded-md border-0 py-1.5 px-1.5 bg-gray-100 text-gray-900 z-10 placeholder:text-gray-400 sm:text-sm sm:leading-6"
						placeholder="Recherche un point d'intérêt"
						onChange={handlePerfomSearch}
					/>
					<button
						className="flex items-center gap-1 cursor-pointer rounded-md bg-white px-4 py-1 text-sm font-semibold self-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						onClick={handleAddPOI}
					>
						<PlusCircle size={14} /> Ajouter un point d&apos;intérêt
					</button>
				</div>
				{currShow === "list" && (
					<div className="mt-3 flex flex-col w-full h-full overflow-y-auto">
						{data?.getPOIsByCitySlug.map((poi) => (
							<ModerationPOIList
								key={poi.id}
								poi={poi}
								updatePOI={handleUpdatePOI}
							/>
						))}
					</div>
				)}
				{(currShow === "add" || currShow === "update") && !createUpdate && (
					<CreateUpdatePOI
						modal={currShow}
						closeCreatePOI={setCreateUpdate}
						disableCity={true}
						setCity={{ cityId: city.id, cityName: city.name }}
						inModal={true}
						poiUpdate={currPOI as Query["getPOIsBySlug"][number]}
					/>
				)}
				{currShow === "search" &&
					resultsPOIS.length > 0 &&
					resultsPOIS.map((poi) => (
						<ModerationPOIList
							key={poi.id}
							poi={poi}
							updatePOI={handleUpdatePOI}
						/>
					))}
			</div>
		</div>
	);
}

export default ModerationPOI;
