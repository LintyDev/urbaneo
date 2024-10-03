import {
	GetCityFromSearchQuery,
	GetPoIsBySlugQuery,
	PoiBudget,
} from "@/graphql/schema";
import { getImageUrl } from "@/lib/getImagesUrl";
import { DollarSign, Heart, MapPin } from "lucide-react";
import Image from "next/image";
import DynamicIcon, { IconProps } from "../common/DynamicIcon";
import { useState } from "react";

interface POICard {
	poi:
		| GetCityFromSearchQuery["getCityFromSearch"]["pois"][number]
		| GetPoIsBySlugQuery["getPOIsBySlug"][number];
}

function POICard({
	poi,
	cityName,
}: {
	poi:
		| GetCityFromSearchQuery["getCityFromSearch"]["pois"][number]
		| GetPoIsBySlugQuery["getPOIsBySlug"][number];
	cityName: string;
}) {
	const [favorites, setFavorites] = useState<string[]>(
		JSON.parse(localStorage.getItem("favorite") ?? "[]")
	);

	const handleAddFavorite = (
		poi:
			| GetCityFromSearchQuery["getCityFromSearch"]["pois"][number]
			| GetPoIsBySlugQuery["getPOIsBySlug"][number]
	) => {
		const localFav = localStorage.getItem("favorite") ?? "[]";

		const favorite: string[] = JSON.parse(localFav);
		const indexOfPoi = favorite.indexOf(poi.slug);

		if (indexOfPoi === -1) {
			favorite.push(poi.slug);
		} else {
			favorite.splice(indexOfPoi, 1);
		}

		const newFavorite = JSON.stringify(favorite);
		localStorage.setItem("favorite", newFavorite);
		setFavorites(favorite);
		//add toaster
	};

	return (
		<div key={poi.slug} className="flex flex-col cursor-pointer">
			<div className="w-[250px] h-[150px] relative">
				<Image
					src={getImageUrl(poi.photos[0])}
					alt={`${poi.name} representative`}
					width={250}
					height={150}
					className="w-[250px] h-[150px] object-cover object-center rounded-lg"
					unoptimized={true}
				/>
				<p
					className="absolute top-1 right-1 p-2 bg-white rounded-full hover:bg-white/80 hover:text-red-700"
					onClick={() => handleAddFavorite(poi)}
				>
					{favorites.includes(poi.slug) ? (
						<Heart size={20} fill="#b91c1c" color="#b91c1c" />
					) : (
						<Heart size={20} />
					)}
				</p>
			</div>

			<p className="font-medium">{poi.name}</p>
			<div className="flex items-center justify-between">
				<p className="flex gap-1 font-light">
					<MapPin strokeWidth={0.5} />
					<span>{cityName}</span>
				</p>
				<p className="flex items-center gap-1">
					{poi.categories.map((c, i) => (
						<DynamicIcon name={c.icon as IconProps["name"]} size={17} key={i} />
					))}
				</p>
				<p className="flex items-center">
					<DollarSign strokeWidth={1} size={17} />
					{(poi.budget === PoiBudget.Mid || poi.budget === PoiBudget.High) && (
						<DollarSign strokeWidth={1} size={17} />
					)}
					{poi.budget === PoiBudget.High && (
						<DollarSign strokeWidth={1} size={17} />
					)}
				</p>
			</div>
		</div>
	);
}

export default POICard;
