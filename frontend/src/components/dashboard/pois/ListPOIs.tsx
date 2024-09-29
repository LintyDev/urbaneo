function ListPOIs({ showAll }: { showAll: boolean }) {
	return (
		<div className="h-full grid grid-rows-[auto_1fr_auto] bg-gray-200/50 rounded-2xl text-gray-500 shadow-md">
			<div
				className={`${
					showAll
						? "grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr_0.2fr]"
						: "grid grid-cols-[1fr_1fr] w-[500px] max-w-[500px]"
				} text-xs rounded-t-2xl font-semibold text-gray-700 uppercase bg-gray-200 py-3 px-5 whitespace-nowrap`}
			>
				<p>#</p>
				<p>Nom</p>
				<p className={`${showAll ? "" : "hidden"}`}>Slug</p>
				<p className={`${showAll ? "" : "hidden"}`}>Adresse</p>
				<p className={`${showAll ? "" : "hidden"}`}>Coordonnées</p>
				<p className={`${showAll ? "" : "hidden"}`}>Action</p>
			</div>
		</div>
	);
}

export default ListPOIs;
